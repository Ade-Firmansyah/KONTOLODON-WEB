CREATE TABLE IF NOT EXISTS users (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS products (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS transactions (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS saldo_logs (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deposits (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS withdraws (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS webhook_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source VARCHAR(80) NOT NULL DEFAULT 'premku',
  payload JSON NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'received',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_webhook_logs_source (source),
  INDEX idx_webhook_logs_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  target_role ENUM('all', 'admin', 'reseller', 'member') NOT NULL DEFAULT 'all',
  created_by INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_notifications_target_role (target_role),
  INDEX idx_notifications_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(80) NOT NULL UNIQUE,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
