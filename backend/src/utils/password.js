import crypto from 'node:crypto';

function normalizePassword(value) {
  return String(value ?? '');
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(normalizePassword(password), salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const value = normalizePassword(stored);

  if (!value.includes(':')) {
    return normalizePassword(password) === value;
  }

  const [salt, hash] = value.split(':');
  const nextHash = crypto.scryptSync(normalizePassword(password), salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(nextHash, 'hex'));
}

export function isHashedPassword(value) {
  return String(value || '').includes(':');
}
