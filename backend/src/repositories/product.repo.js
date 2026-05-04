import { execute, query } from '../config/db.js';

function toProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    premku_id: row.premku_id,
    name: row.name,
    code: row.code,
    note: row.note || '',
    tag: row.tag || '',
    image: row.image || '',
    price_base: Number(row.price_base || 0),
    price_sell: Number(row.price_sell || 0),
    stock: Number(row.stock || 0),
    status: row.status,
  };
}

export async function listProducts() {
  const rows = await query('SELECT * FROM products ORDER BY id ASC');
  return rows.map(toProduct);
}

export async function findProductById(id) {
  const rows = await query('SELECT * FROM products WHERE id = ? LIMIT 1', [Number(id)]);
  return toProduct(rows[0] || null);
}

export async function replaceProducts(nextProducts) {
  for (const product of nextProducts) {
    await execute(
      `INSERT INTO products
        (premku_id, name, code, note, tag, image, price_base, price_sell, stock, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         premku_id = VALUES(premku_id),
         name = VALUES(name),
         note = VALUES(note),
         tag = VALUES(tag),
         image = VALUES(image),
         price_base = VALUES(price_base),
         price_sell = VALUES(price_sell),
         stock = VALUES(stock),
         status = VALUES(status)`,
      [
        product.premku_id ?? null,
        product.name,
        product.code,
        product.note || '',
        product.tag || '',
        product.image || '',
        Number(product.price_base || 0),
        Number(product.price_sell || product.price_base || 0),
        Number(product.stock || 0),
        product.status || 'active',
      ],
    );
  }

  return listProducts();
}
