import { findProductById } from '../../repositories/product.repo.js';
import { getMarkupSetting } from '../../repositories/settings.repo.js';
import { createTransaction, findTransactionByInvoice, refundTransaction, updateTransactionStatus } from '../../repositories/transaction.repo.js';
import { calculateSellPriceBySetting } from '../../services/pricing.service.js';
import { premkuOrder, premkuStatus } from '../../services/premku.service.js';
import { addSaldo, deductSaldo } from '../../services/wallet.service.js';
import { createInvoice } from '../../utils/invoice.js';

function normalizeStatus(payload) {
  return String(payload?.status ?? payload?.data?.status ?? payload?.pay_status ?? payload?.transaction_status ?? '').toLowerCase();
}

function mapPremkuStatus(payload) {
  const status = normalizeStatus(payload);
  if (['pending', 'process', 'processing'].includes(status)) return 'processing';
  if (['success', 'sukses', 'paid'].includes(status)) return 'success';
  if (['failed', 'fail', 'gagal', 'error', 'cancel', 'expired'].includes(status)) return 'failed';
  return 'pending';
}

function extractAccountData(payload) {
  const source = payload?.accounts || payload?.data?.accounts || payload?.status?.accounts || payload?.data?.status?.accounts || [];
  if (Array.isArray(source) && source.length) {
    return source;
  }

  const single = payload?.account_data || payload?.data?.account_data || payload?.data?.akun || payload?.akun || null;
  if (single) return [single];
  return [];
}

export async function getSellPrice(product) {
  const setting = await getMarkupSetting();
  return calculateSellPriceBySetting(product.price_base, setting);
}

export async function refreshOrderStatus(invoice) {
  const transaction = await findTransactionByInvoice(invoice);
  if (!transaction) {
    return null;
  }

  if (['success', 'failed'].includes(transaction.status)) {
    return transaction;
  }

  const externalInvoice = transaction.external_order_response?.invoice || transaction.external_order_response?.data?.invoice || invoice;
  const statusResponse = await premkuStatus(externalInvoice);
  const nextStatus = mapPremkuStatus(statusResponse);
  const accounts = extractAccountData(statusResponse);

  const extra = {
    external_status_response: statusResponse,
    accounts,
    account_data: accounts.length ? accounts : null,
  };

  if (nextStatus === 'failed' && transaction.status !== 'failed') {
    return refundTransaction(invoice, statusResponse, 'premku-status-failed');
  }

  if (nextStatus === 'success') {
    extra.account_data = accounts.length ? accounts : transaction.account_data || null;
  }

  return updateTransactionStatus(invoice, nextStatus, extra);
}

export async function createOrder(user, payload) {
  const product = await findProductById(payload.product_id);

  if (!product) {
    const error = new Error('Produk tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  if (product.status && product.status !== 'active') {
    const error = new Error('Produk tidak aktif');
    error.statusCode = 400;
    throw error;
  }

  if (Number(product.stock || 0) <= 0) {
    const error = new Error('Stok produk habis');
    error.statusCode = 400;
    throw error;
  }

  const qty = Number(payload.qty || 1);
  if (!Number.isInteger(qty) || qty < 1) {
    const error = new Error('Qty tidak valid');
    error.statusCode = 400;
    throw error;
  }

  const pricing = await getSellPrice(product);
  const total = pricing.sellPrice * qty;
  const invoice = createInvoice('ORD');

  await deductSaldo(user, total, invoice);
  let transaction = null;

  try {
    transaction = await createTransaction({
      invoice,
      ref_id: invoice,
      user_id: user.id,
      product_id: product.id,
      product_name: product.name,
      qty,
      price_base: product.price_base,
      price_sell: pricing.sellPrice,
      total_price: total,
      profit: (pricing.sellPrice - product.price_base) * qty,
      status: 'pending',
      account_data: null,
      accounts: [],
      product_image: product.image || null,
      description: product.note || '',
      channel: payload.channel || 'api',
    });

    const external = await premkuOrder({
      product_id: product.premku_id || product.id,
      qty,
      ref_id: invoice,
    });

    const nextStatus = mapPremkuStatus(external);
    if (nextStatus === 'failed') {
      await refundTransaction(invoice, external, 'premku-order-failed');
    } else {
      await updateTransactionStatus(invoice, nextStatus === 'success' ? 'success' : 'processing', {
        external_order_response: external,
        account_data: extractAccountData(external).length ? extractAccountData(external) : null,
        processed_at: nextStatus === 'success' ? new Date().toISOString() : null,
      });
    }
  } catch (error) {
    await addSaldo(user, total, `${invoice}-refund`);
    if (transaction) {
      await updateTransactionStatus(invoice, 'failed', {
        external_order_response: { message: error instanceof Error ? error.message : 'Premku order call failed' },
        refund_at: new Date().toISOString(),
      });
    }
  }

  return (await findTransactionByInvoice(invoice)) || transaction;
}

export function getOrderStatus(invoice) {
  return refreshOrderStatus(invoice);
}
