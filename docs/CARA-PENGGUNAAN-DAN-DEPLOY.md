# Cara Penggunaan dan Deploy Premiumin Plus

Dokumen ini dibuat supaya project bisa dijalankan dari nol sampai online dengan langkah yang jelas.

## 1. Kebutuhan Awal

Install aplikasi berikut:

- Node.js 20 atau lebih baru
- MySQL atau MariaDB
- Git
- Akun GitHub
- Hosting backend yang mendukung Node.js
- Hosting frontend seperti Vercel atau Netlify

## 2. Clone Project

```bash
git clone https://github.com/Ade-Firmansyah/KONTOLODON-WEB.git
cd KONTOLODON-WEB
```

Install dependency:

```bash
npm install
```

## 3. Setup Environment

Copy file contoh env:

```bash
copy .env.example .env
```

Isi `.env`:

```env
API_KEY="API_KEY_PREMKU_ANDA"
BASE_URL="https://premku.com/api/"
ADMIN="NOMOR_ADMIN_ANDA"

DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="root"
DB_PASSWORD="root"
DB_NAME="apps_premhytam"

VITE_API_BASE_URL="http://localhost:4000/api"

ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH=""
PREMKU_WEBHOOK_SECRET=""
```

Catatan:

- Jika memakai XAMPP biasanya `DB_PASSWORD` kosong.
- Jika memakai Laragon/MySQL lokal kadang password `root`.
- Database `apps_premhytam` akan dibuat otomatis oleh backend jika user database punya izin `CREATE DATABASE`.

## 4. Membuat Hash Password Admin

Jangan simpan password polos di kode.

Generate hash:

```bash
node -e "import('./backend/src/utils/password.js').then(({hashPassword})=>console.log(hashPassword('password-admin-anda')))"
```

Copy hasilnya ke `.env`:

```env
ADMIN_PASSWORD_HASH="HASIL_HASH_DI_SINI"
```

## 5. Jalankan Backend

```bash
npm run backend
```

Backend berjalan di:

```text
http://localhost:4000
```

Cek health:

```text
http://localhost:4000/health
```

Jika muncul:

```json
{"status":true,"service":"premiumin-plus-backend"}
```

berarti backend aktif.

## 6. Jalankan Frontend

Buka terminal kedua:

```bash
npm run dev
```

Frontend berjalan di:

```text
http://localhost:3000
```

Login memakai admin utama yang dibuat dari `.env`.

## 7. Alur Penggunaan Admin

1. Login sebagai admin.
2. Buka `User Management`.
3. Buat user baru:
   - Admin
   - Reseller
   - Member
4. Atur saldo user jika diperlukan.
5. Buka `Setting Markup`.
6. Masukkan API key Premku.
7. Atur markup dan discount.
8. Buka `Pesan Notifikasi` untuk kirim pesan ke user.

## 8. Alur Penggunaan Reseller

1. Login memakai akun reseller yang dibuat admin.
2. Cek saldo di dashboard.
3. Deposit saldo jika perlu.
4. Order produk.
5. Lihat riwayat pesanan.
6. Gunakan API key reseller untuk integrasi bot atau website lain.

## 9. Alur Sistem Penting

Frontend tidak boleh memanggil Premku langsung.

Alur yang benar:

```text
Frontend -> Backend -> Database -> Premku
```

Deposit history, order history, saldo, produk, dan notifikasi dibaca dari database melalui backend.

## 10. Deploy Backend

Pilihan mudah:

- Railway
- Render
- VPS Node.js

Contoh Railway:

1. Buat project baru di Railway.
2. Connect GitHub repository.
3. Tambahkan MySQL database.
4. Isi environment variable seperti `.env`.
5. Set command:

```bash
npm run backend
```

6. Deploy.
7. Copy URL backend, contoh:

```text
https://premiumin-backend.up.railway.app
```

## 11. Deploy Frontend

Pilihan mudah:

- Vercel
- Netlify

Contoh Vercel:

1. Import repository dari GitHub.
2. Framework: Vite.
3. Build command:

```bash
npm run build
```

4. Output directory:

```text
dist
```

5. Tambahkan environment:

```env
VITE_API_BASE_URL="https://URL-BACKEND-ANDA/api"
```

6. Deploy.

## 12. Setup Domain

1. Beli domain.
2. Arahkan domain frontend ke Vercel/Netlify.
3. Arahkan subdomain backend, misalnya:

```text
api.domainanda.com
```

ke Railway/Render/VPS.

4. Pastikan SSL aktif.
5. Ubah `VITE_API_BASE_URL` menjadi:

```env
VITE_API_BASE_URL="https://api.domainanda.com/api"
```

Deploy ulang frontend setelah mengubah env.

## 13. Checklist Sebelum Online

Pastikan:

- `npm run lint` sukses.
- `npm run build` sukses.
- Backend `/health` sukses.
- Login admin sukses.
- Admin bisa buat user reseller/member.
- Produk muncul dari Premku/backend.
- Saldo dashboard dan profil sama.
- Deposit hanya masuk saldo saat status success.
- Order gagal melakukan refund.
- Notifikasi admin muncul di dropdown user.
- `.env` tidak ikut masuk GitHub.

## 14. Perintah Penting

```bash
npm install
npm run backend
npm run dev
npm run lint
npm run build
```

## 15. Troubleshooting

Jika muncul `Unknown database apps_premhytam`:

- Pastikan MySQL aktif.
- Pastikan `DB_USER` dan `DB_PASSWORD` benar.
- Pastikan user database punya izin membuat database.

Jika login gagal:

- Cek `ADMIN_USERNAME`.
- Cek `ADMIN_PASSWORD_HASH`.
- Restart backend setelah ubah `.env`.

Jika frontend tidak bisa fetch API:

- Pastikan backend aktif.
- Pastikan `VITE_API_BASE_URL` benar.
- Untuk production, pastikan URL memakai HTTPS.

## 16. Catatan Keamanan

- Jangan upload `.env`.
- Jangan taruh password polos di kode.
- API key Premku hanya disimpan di backend.
- Reseller hanya memakai API key dari sistem ini.
- Member tidak boleh mengakses endpoint API reseller.

