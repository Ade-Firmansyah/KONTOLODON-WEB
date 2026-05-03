# Premiumin Plus Dashboard

Frontend React untuk dashboard Premiumin Plus dengan tema gelap, aksen pink, dan layout responsif desktop.
Seluruh data masih mock supaya siap disambungkan ke backend Node.js nanti.

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

## Login

- Input username
- Input password
- Checkbox ingat saya
- Login user / reseller
- Login admin mock

## Dashboard

- Sidebar navigasi
- Navbar / topbar
- Kartu saldo dan statistik
- API Key card
- Chart mock
- Notifikasi transaksi mock
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
  - Data akun mock
  - API credentials mock

- `Laporan Kendala`
  - Form tiket dan riwayat tiket

- `Bot WA & Telegram`
  - Link bot WhatsApp dan Telegram

- `Document`
  - Ringkasan dokumentasi API mock

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

Semua data saat ini masih mock dan siap diganti API backend tanpa mengubah alur utama UI.

