import express from 'express';
import { login } from '../modules/auth/auth.controller.js';
import { getProducts } from '../modules/product/product.controller.js';
import { myOrders, order, orderStatus } from '../modules/order/order.controller.js';
import { deposit, depositStatus, myDeposits } from '../modules/deposit/deposit.controller.js';
import { withdraw } from '../modules/withdraw/withdraw.controller.js';
import { dashboardSummary, me, saldo, saldoLogs } from '../modules/wallet/wallet.controller.js';
import {
  createAdminUser,
  deleteAdminUser,
  approveWithdraw,
  deposits,
  createAdminNotification,
  getDiscount,
  getMarkup,
  getPremkuKey,
  notifications,
  rejectWithdraw,
  withdraws,
  transactions,
  updateDiscount,
  updateAdminUser,
  updateMarkup,
  updatePremkuKey,
  users,
} from '../modules/admin/admin.controller.js';
import { premkuWebhook } from '../modules/webhook/webhook.controller.js';
import { myNotifications } from '../modules/notification/notification.controller.js';
import { auth, resellerOnly } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/callback/premku', premkuWebhook);

router.get('/me', auth, me);
router.get('/dashboard/summary', auth, dashboardSummary);
router.get('/products', auth, getProducts);
router.post('/order', auth, resellerOnly, order);
router.get('/order/:invoice', auth, orderStatus);
router.get('/transactions', auth, myOrders);
router.get('/orders', auth, myOrders);
router.post('/deposit', auth, resellerOnly, deposit);
router.get('/deposits', auth, myDeposits);
router.get('/deposit/:invoice', auth, depositStatus);
router.post('/withdraw', auth, resellerOnly, withdraw);
router.get('/saldo', auth, saldo);
router.get('/saldo-logs', auth, saldoLogs);
router.get('/saldo/logs', auth, saldoLogs);
router.get('/notifications', auth, myNotifications);

router.get('/admin/users', auth, adminOnly, users);
router.post('/admin/create-user', auth, adminOnly, createAdminUser);
router.patch('/admin/update-user/:id', auth, adminOnly, updateAdminUser);
router.delete('/admin/delete-user/:id', auth, adminOnly, deleteAdminUser);
router.get('/admin/transactions', auth, adminOnly, transactions);
router.get('/users', auth, adminOnly, users);
router.get('/transactions/all', auth, adminOnly, transactions);
router.get('/admin/deposits', auth, adminOnly, deposits);
router.get('/admin/withdraws', auth, adminOnly, withdraws);
router.patch('/admin/withdraws/:id/approve', auth, adminOnly, approveWithdraw);
router.patch('/admin/withdraws/:id/reject', auth, adminOnly, rejectWithdraw);
router.get('/admin/markup', auth, adminOnly, getMarkup);
router.patch('/admin/markup', auth, adminOnly, updateMarkup);
router.get('/admin/discount', auth, adminOnly, getDiscount);
router.patch('/admin/discount', auth, adminOnly, updateDiscount);
router.get('/admin/notifications', auth, adminOnly, notifications);
router.post('/admin/notifications', auth, adminOnly, createAdminNotification);
router.get('/admin/premku-key', auth, adminOnly, getPremkuKey);
router.patch('/admin/premku-key', auth, adminOnly, updatePremkuKey);
router.get('/admin/settings', auth, adminOnly, getPremkuKey);
router.patch('/admin/settings', auth, adminOnly, updatePremkuKey);

router.get('/docs', (_req, res) => {
  res.json({
    status: true,
    docs: [
      'POST /api/login',
      'GET /api/me',
      'GET /api/dashboard/summary',
      'GET /api/products',
      'POST /api/order',
      'GET /api/order/:invoice',
      'GET /api/transactions',
      'GET /api/orders',
      'POST /api/deposit',
      'GET /api/deposits',
      'GET /api/deposit/:invoice',
      'POST /api/withdraw',
      'GET /api/saldo',
      'GET /api/saldo-logs',
      'GET /api/saldo/logs',
      'GET /api/admin/users',
      'GET /api/admin/transactions',
      'GET /api/admin/withdraws',
      'PATCH /api/admin/withdraws/:id/approve',
      'PATCH /api/admin/withdraws/:id/reject',
      'GET /api/admin/premku-key',
      'PATCH /api/admin/premku-key',
      'POST /api/callback/premku',
    ],
  });
});

export default router;
