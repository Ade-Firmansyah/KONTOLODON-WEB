import { createUser, deleteUser, getUserById, listUsers, updateUser } from '../../repositories/user.repo.js';
import { listTransactions } from '../../repositories/transaction.repo.js';
import { listDeposits } from '../../repositories/deposit.repo.js';
import { findWithdrawById, listWithdraws, updateWithdraw } from '../../repositories/withdraw.repo.js';
import { getDiscountSetting, getMarkupSetting, getSetting, setDiscountSetting, setMarkupSetting, setSetting } from '../../repositories/settings.repo.js';
import { createNotification, listNotifications } from '../../repositories/notification.repo.js';
import env from '../../config/env.js';
import { setSaldo } from '../../services/wallet.service.js';
import { requireFields } from '../../utils/validator.js';

export async function users(_req, res) {
  res.json({ status: true, data: await listUsers() });
}

export async function createAdminUser(req, res) {
  try {
    requireFields(req.body, ['username', 'password']);
    const initialSaldo = Number(req.body.saldo || 0);
    if (!Number.isFinite(initialSaldo) || initialSaldo < 0) {
      return res.status(400).json({ status: false, message: 'Saldo awal tidak valid' });
    }

    const data = await createUser(req.body);
    if (Number.isFinite(initialSaldo) && initialSaldo > 0) {
      await setSaldo(data, initialSaldo, `admin-user-${data.id}-initial-saldo`);
      data.saldo = initialSaldo;
    }
    res.status(201).json({ status: true, data: { ...data, password: undefined } });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || 'Gagal membuat user',
    });
  }
}

export async function updateAdminUser(req, res) {
  try {
    const payload = { ...req.body };
    const hasSaldoChange = payload.saldo !== undefined;
    if (hasSaldoChange) {
      const nextSaldo = Number(payload.saldo);
      if (!Number.isFinite(nextSaldo) || nextSaldo < 0) {
        return res.status(400).json({ status: false, message: 'Saldo tidak valid' });
      }
    }
    delete payload.saldo;

    const data = await updateUser(req.params.id, payload);
    if (!data) {
      return res.status(404).json({ status: false, message: 'User tidak ditemukan' });
    }

    if (hasSaldoChange) {
      await setSaldo(data, req.body.saldo, `admin-user-${data.id}-saldo-adjustment`);
      data.saldo = Number(req.body.saldo);
    }

    res.json({ status: true, data: { ...data, password: undefined } });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || 'Gagal memperbarui user',
    });
  }
}

export async function deleteAdminUser(req, res) {
  const data = await deleteUser(req.params.id);
  if (!data) {
    return res.status(404).json({ status: false, message: 'User tidak ditemukan' });
  }
  res.json({ status: true, data: { ...data, password: undefined } });
}

export async function transactions(_req, res) {
  res.json({ status: true, data: await listTransactions() });
}

export async function deposits(_req, res) {
  res.json({ status: true, data: await listDeposits() });
}

export async function withdraws(_req, res) {
  res.json({ status: true, data: await listWithdraws() });
}

export async function approveWithdraw(req, res) {
  try {
    const data = await findWithdrawById(req.params.id);
    if (!data) {
      return res.status(404).json({ status: false, message: 'Withdraw tidak ditemukan' });
    }

    if (data.status !== 'pending') {
      return res.status(400).json({ status: false, message: 'Withdraw sudah diproses' });
    }

    const user = await getUserById(data.user_id);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User tidak ditemukan' });
    }

    const previousSaldo = Number(user.saldo || 0);
    const nextSaldo = previousSaldo - Number(data.amount || 0);

    await setSaldo(user, nextSaldo, `withdraw-${data.id}-approve`);
    const updated = await updateWithdraw(data.id, { status: 'paid' });
    if (!updated) {
      await setSaldo(user, previousSaldo, `withdraw-${data.id}-rollback`);
      return res.status(500).json({ status: false, message: 'Withdraw gagal diproses' });
    }

    return res.json({ status: true, data: updated });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || 'Gagal memproses withdraw',
    });
  }
}

export async function rejectWithdraw(req, res) {
  try {
    const data = await findWithdrawById(req.params.id);
    if (!data) {
      return res.status(404).json({ status: false, message: 'Withdraw tidak ditemukan' });
    }

    if (data.status !== 'pending') {
      return res.status(400).json({ status: false, message: 'Withdraw sudah diproses' });
    }

    const updated = await updateWithdraw(data.id, {
      status: 'rejected',
      notes: req.body?.notes || data.notes || 'Rejected by admin',
    });

    if (!updated) {
      return res.status(500).json({ status: false, message: 'Withdraw gagal diproses' });
    }

    res.json({ status: true, data: updated });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || 'Gagal menolak withdraw',
    });
  }
}

export async function getMarkup(_req, res) {
  res.json({ status: true, data: await getMarkupSetting() });
}

export async function updateMarkup(req, res) {
  try {
    const payload = {
      markup: req.body?.markup,
      markup_type: req.body?.markup_type,
    };

    if (payload.markup === undefined && payload.markup_type === undefined) {
      return res.status(400).json({ status: false, message: 'markup atau markup_type wajib diisi' });
    }

    res.json({ status: true, data: await setMarkupSetting(payload) });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || 'Gagal memperbarui markup',
    });
  }
}

export async function getDiscount(_req, res) {
  res.json({ status: true, data: await getDiscountSetting() });
}

export async function updateDiscount(req, res) {
  try {
    res.json({ status: true, data: await setDiscountSetting({ discount_percent: req.body?.discount_percent }) });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || 'Gagal memperbarui discount',
    });
  }
}

export async function notifications(_req, res) {
  res.json({ status: true, data: await listNotifications() });
}

export async function createAdminNotification(req, res) {
  try {
    requireFields(req.body, ['title', 'message']);
    const targetRole = String(req.body.target_role || 'all').toLowerCase();
    if (!['all', 'admin', 'reseller', 'member'].includes(targetRole)) {
      return res.status(400).json({ status: false, message: 'Target notifikasi tidak valid' });
    }

    const data = await createNotification({
      title: String(req.body.title).trim(),
      message: String(req.body.message).trim(),
      target_role: targetRole,
      created_by: req.user?.id || null,
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || 'Gagal membuat notifikasi',
    });
  }
}

export async function getPremkuKey(_req, res) {
  const key = await getSetting('premku_api_key', env.PREMKU_API_KEY || '');
  res.json({
    status: true,
    data: {
      configured: Boolean(key),
      masked: key ? `${key.slice(0, 4)}${'*'.repeat(Math.max(key.length - 8, 4))}${key.slice(-4)}` : '',
    },
  });
}

export async function updatePremkuKey(req, res) {
  try {
    requireFields(req.body, ['api_key']);
    const key = String(req.body.api_key || '').trim();
    if (key.length < 8) {
      return res.status(400).json({ status: false, message: 'API key terlalu pendek' });
    }

    await setSetting('premku_api_key', key);
    res.json({
      status: true,
      data: {
        configured: true,
        masked: `${key.slice(0, 4)}${'*'.repeat(Math.max(key.length - 8, 4))}${key.slice(-4)}`,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: false,
      message: error.message || 'Gagal memperbarui API key Premku',
    });
  }
}
