# Premiumin Plus Dashboard

Frontend React dan backend Express untuk Premiumin Plus, middleware produk digital antara Premku API, database MySQL, dan user reseller/member.
Data operasional diambil dari backend dan database, bukan dari dummy state frontend.

Dokumentasi lengkap clone, instalasi, run lokal, dan deploy tersedia di:

- `docs/CARA-PENGGUNAAN-DAN-DEPLOY.md`

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Motion
- Lucide React

## Jalankan Lokal

```bash
npm install
npm run dev
```

Buka:

```bash
http://localhost:3000
```

## Route

- `/login`
- `/dashboard`
- `/admin`

Route terlindungi akan redirect ke `/login` jika session belum ada.

## Backend dan Database

- Backend berjalan di `http://localhost:4000`
- Frontend memakai `VITE_API_BASE_URL`
- Database default: `apps_premhytam`
- Jika database belum ada, backend akan membuat database dan tabel utama otomatis.
- Admin pertama dibuat dari `ADMIN_USERNAME` dan `ADMIN_PASSWORD` jika database masih kosong.

## Dashboard

- Sidebar navigasi
- Navbar / topbar
- Kartu saldo dan statistik
- API Key card
- Produk, saldo, transaksi, deposit, withdraw, dan markup dibaca dari API backend.
- Menu komunitas, order, deposit, harga, riwayat, profil, bantuan, bot, dan dokumentasi

## Halaman Utama

- `Order Akun`
  - Checkout produk
  - Input tujuan WhatsApp
  - Qty
  - Total tagihan
  - Tombol WhatsApp bantuan

- `Deposit Saldo`
  - Nominal deposit
  - Pilihan cepat nominal
  - Langkah pembayaran QRIS
  - Tombol WhatsApp bantuan

- `Daftar Harga`
  - Daftar produk dan harga saja
  - Tanpa tombol beli

- `Riwayat`
  - Riwayat pesanan
  - Riwayat deposit
  - Mutasi saldo

- `Profil`
  - Data akun dari `/api/me`
  - API credentials dari database

- `Laporan Kendala`
  - Form tiket dan riwayat tiket

- `Bot WA & Telegram`
  - Link bot WhatsApp dan Telegram

- `Document`
  - Ringkasan dokumentasi API backend

## Fitur UI

- Dark theme dengan aksen pink
- Card modern, rounded, dan compact
- Responsive desktop
- Animasi ringan
- Komponen modular dan reusable

## Struktur

```text
src/
  asset/
  components/
    layout/
  pages/
  services/
  styles/
  utils/
```

## Catatan

Login user/reseller/admin memakai API backend lokal di `backend/`, katalog produk dibaca dari endpoint API, dan markup admin ikut memengaruhi harga jual.
 bagus
