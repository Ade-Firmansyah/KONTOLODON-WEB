import { execute, query } from '../config/db.js';

function toNotification(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    message: row.message,
    target_role: row.target_role,
    created_by: row.created_by || null,
    created_at: row.created_at,
  };
}

export async function listNotificationsForRole(role) {
  const rows = await query(
    `SELECT *
     FROM notifications
     WHERE target_role = 'all' OR target_role = ?
     ORDER BY id DESC
     LIMIT 20`,
    [role],
  );
  return rows.map(toNotification);
}

export async function listNotifications() {
  const rows = await query('SELECT * FROM notifications ORDER BY id DESC LIMIT 100');
  return rows.map(toNotification);
}

export async function createNotification(payload) {
  const result = await execute(
    `INSERT INTO notifications (title, message, target_role, created_by)
     VALUES (?, ?, ?, ?)`,
    [payload.title, payload.message, payload.target_role || 'all', payload.created_by || null],
  );

  const rows = await query('SELECT * FROM notifications WHERE id = ? LIMIT 1', [result.insertId]);
  return toNotification(rows[0] || null);
}
