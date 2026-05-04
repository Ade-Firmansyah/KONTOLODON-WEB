import { listProducts, replaceProducts } from '../../repositories/product.repo.js';
import { getDiscountSetting, getMarkupSetting } from '../../repositories/settings.repo.js';
import { calculateSellPriceBySetting } from '../../services/pricing.service.js';
import { premku } from '../../services/premku.service.js';

function normalizeExternalProduct(item, index) {
  const basePrice = Number(item.price_base ?? item.price ?? item.harga ?? item.price_sell ?? item.nominal ?? 0);
  const name = String(item.name ?? item.product_name ?? item.nama ?? item.product ?? `Produk ${index + 1}`);
  const externalStatus = String(item.status ?? item.stock_status ?? '').toLowerCase();
  const stock = Number(item.stock ?? item.stok ?? 99);
  const status = ['active', 'available', 'ready', 'tersedia', 'success'].includes(externalStatus)
    ? 'active'
    : ['inactive', 'unavailable', 'empty', 'habis', 'soldout', 'sold_out'].includes(externalStatus) || stock <= 0
      ? 'inactive'
      : 'active';

  return {
    id: Number(item.id ?? item.product_id ?? index + 1),
    premku_id: Number(item.premku_id ?? item.id ?? item.product_id ?? index + 1),
    name,
    code: String(item.code ?? item.kode ?? name.toLowerCase().replace(/\s+/g, '-')),
    note: String(item.note ?? item.description ?? 'Produk dari API Premku.'),
    tag: String(item.tag ?? item.category ?? 'API'),
    image: String(item.image ?? item.img ?? item.thumbnail ?? item.logo ?? ''),
    price_base: basePrice,
    stock,
    status,
  };
}

function extractProducts(payload) {
  const candidates = [payload?.data?.products, payload?.products, payload?.data, payload?.result, payload];
  const list = candidates.find((item) => Array.isArray(item));
  return Array.isArray(list) ? list : [];
}

async function applyMarkup(products) {
  const markupSetting = await getMarkupSetting();
  const discountSetting = await getDiscountSetting();

  return products.map((product) => {
    const pricing = calculateSellPriceBySetting(product.price_base, markupSetting);
    return {
      ...product,
      price_sell: pricing.sellPrice,
      markup: pricing.markup,
      markup_type: pricing.markup_type,
      discount_percent: discountSetting.discount_percent,
    };
  });
}

export async function getProducts(_req, res) {
  let products = await listProducts();
  let source = 'local';

  try {
    const payload = await premku('products');
      const externalProducts = extractProducts(payload);
      if (externalProducts.length) {
        products = externalProducts.map(normalizeExternalProduct);
        await replaceProducts(products);
        source = 'premku';
      }
  } catch {
    source = 'local';
  }

  res.json({
    status: true,
    source,
    data: await applyMarkup(products),
  });
}
