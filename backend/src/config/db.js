import mysql from 'mysql2/promise';
import env from './env.js';
import { hashPassword } from '../utils/password.js';
import crypto from 'node:crypto';

const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  multipleStatements: false,
  namedPlaceholders: true,
});

let initPromise = null;

async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  } finally {
    await connection.end();
  }
}

function reviveJson(value, fallback = null) {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function parseDbJson(value, fallback = null) {
  return reviveJson(value, fallback);
}

export async function query(sql, params = []) {
  await ensureInitialized();
  const [rows] = await pool.query(sql, params);
  return rows;
}

export async function execute(sql, params = []) {
  await ensureInitialized();
  const [result] = await pool.execute(sql, params);
  return result;
}

export async function transaction(handler) {
  await ensureInitialized();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await handler(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

function ensureTableStatements() {
  return [
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(80) NOT NULL UNIQUE,
      email VARCHAR(120) NULL UNIQUE,
      phone VARCHAR(30) NULL,
      password_hash VARCHAR(255) NOT NULL,
      api_key VARCHAR(120) NOT NULL UNIQUE,
      saldo BIGINT NOT NULL DEFAULT 0,
      markup_custom INT NOT NULL DEFAULT 0,
      fullName VARCHAR(150) NOT NULL DEFAULT '',
      orders INT NOT NULL DEFAULT 0,
      deposits INT NOT NULL DEFAULT 0,
      notes TEXT NULL,
      role ENUM('admin', 'reseller', 'member') NOT NULL DEFAULT 'member',
      status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
      last_login_at TIMESTAMP NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT chk_users_saldo_non_negative CHECK (saldo >= 0)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      premku_id INT NULL,
      name VARCHAR(150) NOT NULL,
      code VARCHAR(80) NOT NULL UNIQUE,
      note TEXT NULL,
      tag VARCHAR(80) NULL,
      image TEXT NULL,
      price_base BIGINT NOT NULL DEFAULT 0,
      price_sell BIGINT NOT NULL DEFAULT 0,
      stock INT NOT NULL DEFAULT 0,
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_products_status (status),
      INDEX idx_products_premku_id (premku_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    `CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      invoice VARCHAR(80) NOT NULL UNIQUE,
      ref_id VARCHAR(100) NULL UNIQUE,
      user_id INT NOT NULL,
      product_id INT NULL,
      product_name VARCHAR(150) NULL,
      qty INT NOT NULL DEFAULT 1,
      price_base BIGINT NOT NULL DEFAULT 0,
      price_sell BIGINT NOT NULL DEFAULT 0,
      total_price BIGINT NOT NULL DEFAULT 0,
      profit BIGINT NOT NULL DEFAULT 0,
      status ENUM('pending', 'processing', 'success', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
      account_data JSON NULL,
      external_order_response JSON NULL,
      external_status_response JSON NULL,
      refund_at DATETIME NULL,
      processed_at DATETIME NULL,
      product_image TEXT NULL,
      description TEXT NULL,
      channel VARCHAR(40) NOT NULL DEFAULT 'website',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id),
      INDEX idx_transactions_user_id (user_id),
      INDEX idx_transactions_product_id (product_id),
      INDEX idx_transactions_status (status),
      INDEX idx_transactions_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    `CREATE TABLE IF NOT EXISTS saldo_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      type ENUM('credit', 'debit', 'refund', 'adjustment') NOT NULL,
      amount BIGINT NOT NULL,
      balance_before BIGINT NOT NULL,
      balance_after BIGINT NOT NULL,
      reference VARCHAR(120) NULL,
      notes TEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      INDEX idx_saldo_logs_user_id (user_id),
      INDEX idx_saldo_logs_reference (reference)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    `CREATE TABLE IF NOT EXISTS deposits (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      invoice VARCHAR(80) NOT NULL UNIQUE,
      amount BIGINT NOT NULL,
      total_bayar BIGINT NOT NULL,
      status ENUM('pending', 'success', 'failed', 'expired') NOT NULL DEFAULT 'pending',
      qr_data TEXT NULL,
      external_response JSON NULL,
      external_status_response JSON NULL,
      processed_at DATETIME NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      INDEX idx_deposits_user_id (user_id),
      INDEX idx_deposits_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    `CREATE TABLE IF NOT EXISTS withdraws (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      amount BIGINT NOT NULL,
      status ENUM('pending', 'approved', 'rejected', 'paid') NOT NULL DEFAULT 'pending',
      bank_account VARCHAR(120) NULL,
      notes TEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      INDEX idx_withdraws_user_id (user_id),
      INDEX idx_withdraws_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    `CREATE TABLE IF NOT EXISTS webhook_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      source VARCHAR(80) NOT NULL DEFAULT 'premku',
      payload JSON NOT NULL,
      status VARCHAR(40) NOT NULL DEFAULT 'received',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_webhook_logs_source (source),
      INDEX idx_webhook_logs_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    `CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      message TEXT NOT NULL,
      target_role ENUM('all', 'admin', 'reseller', 'member') NOT NULL DEFAULT 'all',
      created_by INT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_notifications_target_role (target_role),
      INDEX idx_notifications_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    `CREATE TABLE IF NOT EXISTS settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      setting_key VARCHAR(80) NOT NULL UNIQUE,
      setting_value JSON NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  ];
}

async function ensureSchema(connection) {
  for (const statement of ensureTableStatements()) {
    await connection.query(statement);
  }

  const migrations = [
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS fullName VARCHAR(150) NOT NULL DEFAULT ''`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS orders INT NOT NULL DEFAULT 0`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS deposits INT NOT NULL DEFAULT 0`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS notes TEXT NULL`,
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS note TEXT NULL`,
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS tag VARCHAR(80) NULL`,
    `ALTER TABLE products ADD COLUMN IF NOT EXISTS image TEXT NULL`,
    `ALTER TABLE transactions ADD COLUMN IF NOT EXISTS account_data JSON NULL`,
    `ALTER TABLE transactions ADD COLUMN IF NOT EXISTS external_order_response JSON NULL`,
    `ALTER TABLE transactions ADD COLUMN IF NOT EXISTS external_status_response JSON NULL`,
    `ALTER TABLE transactions ADD COLUMN IF NOT EXISTS refund_at DATETIME NULL`,
    `ALTER TABLE transactions ADD COLUMN IF NOT EXISTS processed_at DATETIME NULL`,
    `ALTER TABLE transactions ADD COLUMN IF NOT EXISTS product_image TEXT NULL`,
    `ALTER TABLE transactions ADD COLUMN IF NOT EXISTS description TEXT NULL`,
    `ALTER TABLE deposits ADD COLUMN IF NOT EXISTS external_response JSON NULL`,
    `ALTER TABLE deposits ADD COLUMN IF NOT EXISTS external_status_response JSON NULL`,
    `ALTER TABLE deposits ADD COLUMN IF NOT EXISTS processed_at DATETIME NULL`,
    `ALTER TABLE notifications ADD COLUMN IF NOT EXISTS target_role ENUM('all', 'admin', 'reseller', 'member') NOT NULL DEFAULT 'all'`,
    `ALTER TABLE notifications ADD COLUMN IF NOT EXISTS created_by INT NULL`,
    `ALTER TABLE settings ADD COLUMN IF NOT EXISTS setting_key VARCHAR(80) NULL`,
    `ALTER TABLE settings ADD COLUMN IF NOT EXISTS setting_value JSON NULL`,
  ];

  for (const statement of migrations) {
    try {
      await connection.query(statement);
    } catch {
      // Ignore migration differences on older MySQL variants.
    }
  }
}

async function seedDefaults(connection) {
  if (!env.ADMIN_USERNAME || (!env.ADMIN_PASSWORD_HASH && !env.ADMIN_PASSWORD)) {
    return;
  }

  const passwordHash = env.ADMIN_PASSWORD_HASH || hashPassword(env.ADMIN_PASSWORD);
  const [adminRows] = await connection.query('SELECT id FROM users WHERE username = ? LIMIT 1', [env.ADMIN_USERNAME]);
  const existingAdmin = adminRows[0];

  if (existingAdmin) {
    await connection.query(
      `UPDATE users
       SET password_hash = ?, role = 'admin', status = 'active', fullName = ?, notes = ?
       WHERE id = ?`,
      [passwordHash, env.ADMIN_USERNAME, 'primary-admin-bootstrap', existingAdmin.id],
    );
    return;
  }

  await connection.query(
    `INSERT INTO users
      (username, email, password_hash, api_key, role, status, fullName, notes)
     VALUES (?, ?, ?, ?, 'admin', 'active', ?, ?)`,
    [
      env.ADMIN_USERNAME,
      null,
      passwordHash,
      `api_${env.ADMIN_USERNAME}_${crypto.randomBytes(18).toString('hex')}`,
      env.ADMIN_USERNAME,
      'primary-admin-bootstrap',
    ],
  );
}

export async function ensureInitialized() {
  if (!initPromise) {
    initPromise = (async () => {
      await ensureDatabaseExists();
      const connection = await pool.getConnection();
      try {
        await ensureSchema(connection);
        await seedDefaults(connection);
      } finally {
        connection.release();
      }
    })();
  }

  return initPromise;
}

export { pool };
