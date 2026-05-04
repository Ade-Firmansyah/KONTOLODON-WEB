# Fase 4 - Backend Implementation

## Status Implementasi

Backend sudah dibuat dengan modul:

- Auth
- User
- Product
- Order
- Deposit
- Withdraw
- Wallet
- Admin
- Webhook

Update logika terbaru:

- Login divalidasi ke user repository berdasarkan username dan password.
- Admin CRUD user sudah tersedia melalui endpoint backend.
- Password disimpan hanya di repository backend dan tidak dikirim ke UI.
- Markup tier tersimpan di settings repository dan dipakai saat produk dihitung.
- Produk dan order membaca harga jual dari hasil perhitungan markup.

## Cara Jalan Lokal

Dari root project:

```bash
node backend/server.js
```

Default port backend:

```text
4000
```

Health check:

```text
GET http://localhost:4000/health
```

## Catatan Production

Backend saat ini memakai MySQL/MariaDB melalui `mysql2`. Database default `apps_premhytam` dibuat otomatis jika user database memiliki privilege `CREATE DATABASE`.

Semua flow saldo harus melewati wallet/database transaction dan semua perubahan saldo wajib masuk `saldo_logs`.
