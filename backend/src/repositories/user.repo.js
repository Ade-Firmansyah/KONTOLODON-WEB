import { execute, query } from '../config/db.js';
import { setSaldo } from '../services/wallet.service.js';
import { hashPassword, isHashedPassword } from '../utils/password.js';
import crypto from 'node:crypto';

function normalizeRole(role = 'member') {
  const value = String(role).toLowerCase();
  if (value === 'admin' || value === 'reseller') return value;
  return 'member';
}

function uiStatus(status = 'active') {
  const value = String(status).toLowerCase();
  if (value === 'inactive') return 'Nonaktif';
  if (value === 'suspended') return 'Suspended';
  return 'Aktif';
}

function dbStatus(status = 'active') {
  const value = String(status).toLowerCase();
  if (value === 'nonaktif' || value === 'inactive') return 'inactive';
  if (value === 'suspended') return 'suspended';
  return 'active';
}

function toPublicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    api_key: row.api_key,
    role: row.role,
    fullName: row.fullName || row.username,
    email: row.email || '',
    phone: row.phone || '',
    saldo: Number(row.saldo || 0),
    status: uiStatus(row.status),
    orders: Number(row.orders || 0),
    deposits: Number(row.deposits || 0),
    lastLogin: row.last_login_at ? new Date(row.last_login_at).toISOString().replace('T', ' ').slice(0, 16) : '',
    notes: row.notes || '',
  };
}

function toAuthUser(row) {
  return row
    ? {
        ...row,
        saldo: Number(row.saldo || 0),
      }
    : null;
}

async function seedUserCounters(userId) {
  const [orderRows] = await query('SELECT COUNT(*) AS total FROM transactions WHERE user_id = ?', [userId]);
  const [depositRows] = await query('SELECT COUNT(*) AS total FROM deposits WHERE user_id = ?', [userId]);
  return {
    orders: Number(orderRows?.total || 0),
    deposits: Number(depositRows?.total || 0),
  };
}

export async function findUserByUsername(username) {
  const rows = await query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
  return toAuthUser(rows[0] || null);
}

export async function findUserByApiKey(apiKey) {
  const rows = await query('SELECT * FROM users WHERE api_key = ? LIMIT 1', [apiKey]);
  return toAuthUser(rows[0] || null);
}

export async function listUsers() {
  const rows = await query('SELECT * FROM users ORDER BY id DESC');
  return Promise.all(
    rows.map(async (row) => {
      const counters = await seedUserCounters(row.id);
      return toPublicUser({ ...row, ...counters });
    }),
  );
}

export async function getUserById(id) {
  const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [Number(id)]);
  return toAuthUser(rows[0] || null);
}

export async function updateUserSaldo(userId, nextSaldo) {
  await setSaldo(userId, nextSaldo, `user-repo-${Number(userId)}-saldo-update`);
  return getUserById(userId);
}

function generateApiKey(username) {
  return `api_${String(username).toLowerCase()}_${crypto.randomBytes(18).toString('hex')}`;
}

export async function createUser(payload) {
  const passwordValue = String(payload.password || '');
  const password_hash = isHashedPassword(passwordValue) ? passwordValue : hashPassword(passwordValue);
  const api_key = payload.api_key || generateApiKey(payload.username);
  const result = await execute(
    `INSERT INTO users
      (username, email, phone, password_hash, api_key, saldo, markup_custom, fullName, orders, deposits, notes, role, status, last_login_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.username,
      payload.email || null,
      payload.phone || null,
      password_hash,
      api_key,
      0,
      Number(payload.markup_custom || 0),
      payload.fullName || payload.username,
      Number(payload.orders || 0),
      Number(payload.deposits || 0),
      payload.notes || '',
      normalizeRole(payload.role),
      dbStatus(payload.status),
      payload.lastLogin ? new Date(payload.lastLogin) : null,
    ],
  );

  const created = await getUserById(result.insertId);
  return toPublicUser({ ...(created || {}), api_key });
}

export async function updateUser(id, payload) {
  const currentRows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [Number(id)]);
  const current = currentRows[0];
  if (!current) return null;

  const nextPassword = payload.password !== undefined && payload.password !== ''
    ? isHashedPassword(payload.password)
      ? payload.password
      : hashPassword(payload.password)
    : current.password_hash;

  const nextData = {
    username: payload.username !== undefined ? payload.username : current.username,
    email: payload.email !== undefined ? payload.email || null : current.email,
    phone: payload.phone !== undefined ? payload.phone || null : current.phone,
    password_hash: nextPassword,
    api_key: payload.api_key !== undefined ? payload.api_key : current.api_key,
    role: payload.role !== undefined ? normalizeRole(payload.role) : current.role,
    status: payload.status !== undefined ? dbStatus(payload.status) : current.status,
    fullName: payload.fullName !== undefined ? payload.fullName : current.fullName,
    notes: payload.notes !== undefined ? payload.notes : current.notes,
    last_login_at: payload.lastLogin !== undefined ? new Date(payload.lastLogin) : current.last_login_at,
    markup_custom: payload.markup_custom !== undefined ? Number(payload.markup_custom) : current.markup_custom,
    orders: payload.orders !== undefined ? Number(payload.orders) : current.orders,
    deposits: payload.deposits !== undefined ? Number(payload.deposits) : current.deposits,
  };

  await execute(
    `UPDATE users
     SET username = ?, email = ?, phone = ?, password_hash = ?, api_key = ?, role = ?, status = ?, fullName = ?, notes = ?, last_login_at = ?, markup_custom = ?, orders = ?, deposits = ?
     WHERE id = ?`,
    [
      nextData.username,
      nextData.email,
      nextData.phone,
      nextData.password_hash,
      nextData.api_key,
      nextData.role,
      nextData.status,
      nextData.fullName,
      nextData.notes,
      nextData.last_login_at,
      nextData.markup_custom,
      nextData.orders,
      nextData.deposits,
      Number(id),
    ],
  );

  const updated = await getUserById(id);
  const counters = await seedUserCounters(id);
  return toPublicUser({ ...(updated || current), ...counters });
}

export async function deleteUser(id) {
  const currentRows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [Number(id)]);
  const current = currentRows[0];
  if (!current) return null;

  await execute('DELETE FROM users WHERE id = ?', [Number(id)]);
  return toPublicUser(current);
}
