import { createDeposit as saveDeposit, findDepositByInvoice, updateDeposit } from '../../repositories/deposit.repo.js';
import { premkuPay, premkuPayStatus } from '../../services/premku.service.js';
import { createInvoice } from '../../utils/invoice.js';
import { transaction, parseDbJson } from '../../config/db.js';

function toMysqlDate(value = new Date()) {
  return new Date(value).toISOString().slice(0, 19).replace('T', ' ');
}

function normalizeDepositStatus(value, payload = {}) {
  const candidates = [
    value,
    payload?.status,
    payload?.success,
    payload?.pay_status,
    payload?.transaction_status,
    payload?.message,
    payload?.data?.status,
    payload?.data?.success,
    payload?.data?.pay_status,
    payload?.data?.transaction_status,
    payload?.data?.message,
  ]
    .filter((item) => item !== undefined && item !== null)
    .map((item) => String(item).toLowerCase());

  const text = candidates.join(' ');
  if (/\b(success|sukses|paid|settlement|settled|completed|complete|berhasil|lunas)\b/.test(text)) return 'success';
  if (/\b(failed|fail|gagal|error|cancel|canceled|cancelled|rejected)\b/.test(text)) return 'failed';
  if (/\b(expired|expire|timeout|timed out)\b/.test(text)) return 'expired';
  return 'pending';
}

function mapDepositRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    user_id: row.user_id,
    invoice: row.invoice,
    premku_invoice: row.premku_invoice || null,
    amount: Number(row.amount || 0),
    total_bayar: Number(row.total_bayar || 0),
    status: row.status,
    qr_data: row.qr_data || null,
    external_response: parseDbJson(row.external_response, null),
    external_status_response: parseDbJson(row.external_status_response, null),
    processed_at: row.processed_at || null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function createDeposit(user, amount) {
  const invoice = createInvoice('DEP');
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount < 1000) {
    const error = new Error('Minimal deposit Rp1.000');
    error.statusCode = 400;
    throw error;
  }

  let payment = null;
  try {
    payment = await premkuPay({
      amount: numericAmount,
      ref_id: invoice,
    });
  } catch (error) {
    const wrapped = new Error(error instanceof Error ? error.message : 'Premku payment call failed');
    wrapped.statusCode = 502;
    throw wrapped;
  }

  const paymentStatus = String(payment?.status ?? payment?.success ?? payment?.data?.status ?? '').toLowerCase();
  const qrData = payment?.qr_data ?? payment?.qr_image ?? payment?.qr_raw ?? payment?.data?.qr_data ?? payment?.data?.qr_image ?? payment?.data?.qr_raw ?? payment?.data?.qr ?? null;
  if (['false', 'failed', 'error', 'gagal'].includes(paymentStatus) || !qrData) {
    const error = new Error(payment?.message || payment?.error || 'Gagal membuat QR pembayaran');
    error.statusCode = 502;
    throw error;
  }

  const qrValue = typeof qrData === 'string' ? qrData : JSON.stringify(qrData);
  const premkuInvoice =
    payment?.invoice ||
    payment?.ref_id ||
    payment?.data?.invoice ||
    payment?.data?.ref_id ||
    payment?.data?.trx_id ||
    payment?.trx_id ||
    invoice;

  return saveDeposit({
    user_id: user.id,
    invoice,
    premku_invoice: String(premkuInvoice),
    amount: numericAmount,
    total_bayar: Number(payment?.total_bayar ?? payment?.data?.total_bayar ?? numericAmount),
    qr_data: qrValue,
    external_response: payment,
  });
}

export async function applyDepositSuccess(invoice, externalResponse = {}) {
  return transaction(async (connection) => {
    const [rows] = await connection.query(
      `SELECT *
       FROM deposits
       WHERE invoice = ?
          OR premku_invoice = ?
          OR JSON_UNQUOTE(JSON_EXTRACT(external_response, '$.invoice')) = ?
          OR JSON_UNQUOTE(JSON_EXTRACT(external_response, '$.ref_id')) = ?
          OR JSON_UNQUOTE(JSON_EXTRACT(external_response, '$.data.invoice')) = ?
          OR JSON_UNQUOTE(JSON_EXTRACT(external_response, '$.data.ref_id')) = ?
       LIMIT 1
       FOR UPDATE`,
      [invoice, invoice, invoice, invoice, invoice, invoice],
    );
    const deposit = rows[0];
    if (!deposit) {
      const error = new Error('Deposit tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    if (deposit.status === 'success' || deposit.processed_at) {
      return mapDepositRow(deposit);
    }

    const [userRows] = await connection.query('SELECT * FROM users WHERE id = ? FOR UPDATE', [deposit.user_id]);
    const user = userRows[0];
    if (!user) {
      const error = new Error('User tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    const amount = Number(deposit.amount || 0);
    const before = Number(user.saldo || 0);
    const after = before + amount;
    const processedAt = toMysqlDate();

    await connection.query(
      `UPDATE deposits
       SET status = 'success', external_status_response = ?, processed_at = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND processed_at IS NULL AND status <> 'success'`,
      [JSON.stringify(externalResponse ?? parseDbJson(deposit.external_response, null)), processedAt, deposit.id],
    );
    await connection.query('UPDATE users SET saldo = ? WHERE id = ?', [after, deposit.user_id]);
    await connection.query(
      `INSERT INTO saldo_logs
        (user_id, type, amount, balance_before, balance_after, reference, notes)
       VALUES (?, 'credit', ?, ?, ?, ?, ?)`,
      [deposit.user_id, amount, before, after, deposit.invoice, 'deposit-success'],
    );

    const [updatedRows] = await connection.query('SELECT * FROM deposits WHERE id = ? LIMIT 1', [deposit.id]);
    return mapDepositRow(updatedRows[0] || deposit);
  });
}

export async function updateDepositStatus(invoice, status, externalResponse = {}) {
  const normalizedStatus = normalizeDepositStatus(status, externalResponse);
  if (normalizedStatus === 'success') {
    return applyDepositSuccess(invoice, externalResponse);
  }

  return updateDeposit(invoice, {
    status: normalizedStatus,
    external_response: externalResponse,
  });
}

export async function refreshDepositStatus(invoice) {
  const deposit = await findDepositByInvoice(invoice);
  if (!deposit) {
    return null;
  }

  if (['success', 'failed'].includes(deposit.status)) {
    return deposit;
  }

  const candidateInvoices = [
    deposit.premku_invoice,
    deposit.external_response?.invoice,
    deposit.external_response?.data?.invoice,
    deposit.external_response?.ref_id,
    deposit.external_response?.data?.ref_id,
    invoice,
  ].filter(Boolean);

  let statusResponse;
  let lastError = null;
  for (const candidateInvoice of [...new Set(candidateInvoices.map(String))]) {
    try {
      statusResponse = await premkuPayStatus(candidateInvoice);
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!statusResponse) {
    const updated = await updateDeposit(invoice, {
      external_status_response: { message: lastError instanceof Error ? lastError.message : 'Premku pay status failed' },
    });
    return updated || findDepositByInvoice(invoice);
  }

  const nextStatus = normalizeDepositStatus(
    statusResponse?.pay_status ?? statusResponse?.status ?? statusResponse?.data?.status,
    statusResponse,
  );
  if (nextStatus === 'success') {
    return applyDepositSuccess(invoice, statusResponse);
  }

  const updated = await updateDeposit(invoice, {
    status: nextStatus || 'pending',
    external_status_response: statusResponse,
  });
  return updated || findDepositByInvoice(invoice);
}
