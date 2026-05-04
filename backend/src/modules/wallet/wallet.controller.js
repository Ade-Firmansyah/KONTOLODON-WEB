import { query } from '../../config/db.js';
import { listSaldoLogsByUser } from '../../repositories/wallet.repo.js';

export function me(req, res) {
  res.json({
    status: true,
    data: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email || '',
      saldo: Number(req.user.saldo || 0),
      role: req.user.role,
      api_key: req.user.api_key,
    },
  });
}

export function saldo(req, res) {
  res.json({
    status: true,
    saldo: Number(req.user.saldo || 0),
  });
}

export async function saldoLogs(req, res) {
  res.json({
    status: true,
    data: await listSaldoLogsByUser(req.user.id),
  });
}

export async function dashboardSummary(req, res) {
  const userId = Number(req.user.id);
  const [transactionRows] = await query(
    `SELECT
      COUNT(*) AS total_transactions,
      COALESCE(SUM(total_price), 0) AS total_spent
     FROM transactions
     WHERE user_id = ?`,
    [userId],
  );
  const [depositRows] = await query(
    `SELECT
      COUNT(*) AS total_deposits,
      COALESCE(SUM(amount), 0) AS total_deposit_amount
     FROM deposits
     WHERE user_id = ? AND status IN ('success', 'sukses', 'paid')`,
    [userId],
  );
  const [productRows] = await query(
    `SELECT COUNT(*) AS active_products
     FROM products
     WHERE status IN ('active', 'Aktif', 'ready')`,
  );

  res.json({
    status: true,
    data: {
      saldo: Number(req.user.saldo || 0),
      total_transactions: Number(transactionRows?.total_transactions || 0),
      total_spent: Number(transactionRows?.total_spent || 0),
      total_deposits: Number(depositRows?.total_deposits || 0),
      total_deposit_amount: Number(depositRows?.total_deposit_amount || 0),
      active_products: Number(productRows?.active_products || 0),
    },
  });
}
