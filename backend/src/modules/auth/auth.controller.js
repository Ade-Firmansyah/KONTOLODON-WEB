import { findUserByUsername } from '../../repositories/user.repo.js';
import { requireFields } from '../../utils/validator.js';
import { verifyPassword } from '../../utils/password.js';

export async function login(req, res, next) {
  try {
    requireFields(req.body, ['username', 'password']);

    const user = await findUserByUsername(req.body.username);
    if (!user || !verifyPassword(req.body.password, user.password_hash)) {
      return res.status(401).json({
        status: false,
        message: 'Username atau password salah',
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        status: false,
        message: 'Akun tidak aktif',
      });
    }

    res.json({
      status: true,
      role: user.role,
      api_key: user.api_key,
      user: {
        username: user.username,
        saldo: user.saldo,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
}
