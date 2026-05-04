import { query, execute } from '../config/db.js';

const markupTiers = [
  { id: 'tier-1', label: 'Di bawah 5.000', min: 0, max: 4999, percent: 18 },
  { id: 'tier-2', label: 'Di bawah 10.000', min: 5000, max: 9999, percent: 14 },
  { id: 'tier-3', label: 'Di bawah 20.000', min: 10000, max: 19999, percent: 12 },
  { id: 'tier-4', label: '20.000 ke atas', min: 20000, max: null, percent: 10 },
];

function parseSettingValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

async function getSettingRow(key) {
  const rows = await query('SELECT * FROM settings WHERE setting_key = ? ORDER BY id DESC LIMIT 1', [key]);
  return rows[0] || null;
}

export function getMarkupTiers() {
  return markupTiers;
}

export async function setMarkupTiers(nextTiers) {
  return nextTiers;
}

export async function getSetting(key, fallback = null) {
  const row = await getSettingRow(key);
  if (!row) return fallback;
  const value = parseSettingValue(row.setting_value);
  return value ?? fallback;
}

export async function setSetting(key, value) {
  const serialized = JSON.stringify(value);
  const current = await getSettingRow(key);
  if (current) {
    await execute('UPDATE settings SET setting_value = CAST(? AS JSON) WHERE id = ?', [serialized, current.id]);
  } else {
    await execute('INSERT INTO settings (setting_key, setting_value) VALUES (?, CAST(? AS JSON))', [key, serialized]);
  }
  return value;
}

export async function getMarkupSetting() {
  const rawMarkup = Number((await getSetting('markup', 0)) || 0);
  const markup = Number.isFinite(rawMarkup) && rawMarkup >= 0 ? rawMarkup : 0;
  const markup_type = String((await getSetting('markup_type', 'percent')) || 'percent');
  return {
    markup,
    markup_type: markup_type === 'fixed' ? 'fixed' : 'percent',
  };
}

export async function getDiscountSetting() {
  const rawDiscount = Number((await getSetting('discount_percent', 10)) || 0);
  const discount_percent = Number.isFinite(rawDiscount) && rawDiscount >= 0 ? Math.min(rawDiscount, 100) : 10;
  return { discount_percent };
}

export async function setDiscountSetting(payload) {
  const value = Number(payload.discount_percent);
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    const error = new Error('Discount tidak valid');
    error.statusCode = 400;
    throw error;
  }

  await setSetting('discount_percent', value);
  return getDiscountSetting();
}

export async function setMarkupSetting(payload) {
  if (payload.markup !== undefined) {
    const value = Number(payload.markup);
    if (!Number.isFinite(value) || value < 0) {
      const error = new Error('Markup tidak valid');
      error.statusCode = 400;
      throw error;
    }
    await setSetting('markup', value);
  }
  if (payload.markup_type !== undefined) {
    if (!['fixed', 'percent'].includes(payload.markup_type)) {
      const error = new Error('Tipe markup tidak valid');
      error.statusCode = 400;
      throw error;
    }
    await setSetting('markup_type', payload.markup_type === 'fixed' ? 'fixed' : 'percent');
  }
  return getMarkupSetting();
}
