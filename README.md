# Premiumin Plus Web - Dashbor Digital Premium

Premiumin Plus adalah platform dashboard digital modern yang dirancang untuk manajemen layanan premium dengan antarmuka yang elegan dan fungsional. Aplikasi ini hadir dengan tema **Elegant Pink (Rose Palette)** yang memberikan kesan eksklusif dan profesional.

## 🌟 Fitur Utama

- **Elegant Dashboard**: Pantauan saldo, total pesanan, dan grafik mutasi secara real-time.
- **Sistem Checkout Automatis**: Proses pembelian produk digital (Netflix, Spotify, YouTube, dll) yang instan.
- **Dropdown Notifikasi**: Sistem pemberitahuan real-time untuk status pesanan dan promo terbaru.
- **Dokumentasi API V2**: Panduan lengkap bagi developer untuk integrasi sistem secara terprogram.
- **Manajemen User**: Pengaturan profil, riwayat pesanan, riwayat deposit, dan mutasi saldo.
- **Light/Dark Mode**: Dukungan penuh untuk tema terang dan gelap dengan opsi persistensi.
- **Responsive Layout**: Antarmuka yang optimal baik di desktop maupun perangkat mobile.

## 🛠️ Stack Teknologi

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com/)
- **Animations**: [Motion/React](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router 7
- **Runtime**: Node.js

## 🚀 Cara Instalasi

### Prasyarat
- Node.js (Versi terbaru disarankan)
- npm atau yarn

### Langkah-langkah
1. **Clone Repositori**
   ```bash
   git clone https://github.com/digitalpanel2024-ai/premiuminplus-Web.git
   cd premiuminplus-Web
   ```

2. **Instal Dependencies**
   ```bash
   npm install
   ```

3. **Jalankan Aplikasi (Mode Development)**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

4. **Build untuk Produksi**
   ```bash
   npm run build
   ```
   Hasil build akan tersedia di folder `dist/`.

## 📁 Struktur Proyek

```text
src/
├── components/         # Komponen UI Reusable
│   ├── layout/         # Sidebar, Topbar, dll
│   ├── DashboardHome.js
│   ├── CheckoutPage.js
│   └── ...
├── context/            # Management state (ThemeContext)
├── assets/             # Gambar dan aset statis
├── index.css           # Global styles & Konfigurasi Tailwind
├── App.tsx             # Routing utama
└── main.tsx            # Entry point aplikasi
```

## 🎨 Kustomisasi Tema

Aplikasi ini menggunakan sistem variabel CSS Tailwind 4. Untuk mengubah warna brand utama, silakan edit di file `src/index.css`:

```css
@theme {
  --color-rose-600: #e11d48; /* Warna Utama */
  /* Tambahkan kustomisasi lainnya di sini */
}
```

## 📄 Lisensi

Proyek ini dibuat untuk keperluan platform **Premiumin Plus**. Seluruh hak cipta dimiliki oleh tim pengembang.

---
*Dibuat dengan ❤️ oleh [Digital Panel](https://github.com/digitalpanel2024)*
