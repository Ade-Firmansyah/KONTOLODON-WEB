# Struktur Project Premiumin Plus

Dokumen ini merapikan isi project saat ini dan memetakan implementasi ke Fase 1 sampai Fase 4.

## Environment

File `.env` lokal berisi variabel:

- `API_KEY`
- `BASE_URL`
- `ADMIN`

Nilai rahasia tidak ditulis ulang di dokumentasi. Untuk contoh publik gunakan `.env.example`.

## Frontend Saat Ini

- `src/App.tsx`: routing utama dan proteksi login sederhana.
- `src/pages/LoginPage.tsx`: halaman login.
- `src/pages/DashboardPage.tsx`: dashboard user/reseller.
- `src/pages/AdminPanelPage.tsx`: admin shell dan routing halaman admin.
- `src/pages/admin/data`: tipe data admin UI.
- `src/pages/admin/pages`: user management, monitoring transaksi, setting markup.
- `src/components/layout`: shell, sidebar, topbar.

## Backend Scaffold

Struktur backend fase sudah disiapkan di:

```text
backend/
  server.js
  src/
    app.js
    config/
    modules/
    routes/
    services/
    repositories/
    middlewares/
    utils/
    workers/
```

## Database

Schema fase ada di:

- `database/schema.mysql.sql`

Schema lama PHP sudah dihapus dari runtime repo. Ringkasan auditnya tetap ada di `docs/legacy-php-audit.md`.

## Dokumen Fase Canonical

- `docs/fase-1-requirement.md`
- `docs/fase-2-database.md`
- `docs/fase-3-architecture-api.md`
- `docs/fase-4-backend-implementation.md`
