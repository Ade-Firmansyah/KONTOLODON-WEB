# Fase 1 - Requirement dan Scope

## Visi Produk

Premiumin Plus adalah platform reseller produk digital yang menghubungkan dashboard user/reseller dengan API Premku.

## Role

- Admin: kelola user, saldo, transaksi, markup, dan setting sistem.
- Reseller: order produk, deposit saldo, withdraw saldo, lihat riwayat, gunakan API.
- Member: akses dashboard dasar, order produk, deposit, dan riwayat.

## Sitemap

Auth:

- Login
- Register via WhatsApp

Dashboard user/reseller:

- Dashboard
- Order Akun
- Deposit Saldo
- Tarik Saldo
- Riwayat Pesanan
- Riwayat Deposit
- Mutasi Saldo
- Daftar Harga
- Profil
- Laporan Kendala
- API Docs

Admin:

- User Management
- Monitoring Transaksi
- Setting Markup
- Deposit Monitoring
- Withdraw Approval
- System Settings

## Rule Sistem

- Saldo tidak boleh minus.
- Login wajib memakai username dan password yang terdaftar di database.
- Admin dapat create, edit, dan delete user reseller/member.
- API key wajib untuk akses API reseller dan order flow.
- Semua perubahan saldo wajib masuk saldo log.
- Order diproses async melalui queue pada fase production.
- Webhook wajib disimpan sebagai log.
- Harga jual mengikuti markup tier yang diset admin.
