# Mini POS — Kasir & Keranjang Belanja Sederhana

> Tugas Praktikum PAW Pertemuan 1: JavaScript Dasar

## 1. Identitas

- **Nama:** [ISI NAMA LENGKAP]
- **NIM:** [ISI NIM]
- **Kelas Praktikum:** [RA / RB]
- **Folder pengumpulan:** `[NAMA]_[NIM]_pertemuan1` di repo `pemrograman_web_itera_[NIM]`

> Ganti semua `[...]` di atas sebelum push ke GitHub. Nama folder contoh: `muhammaddaffahakim_123140002_pertemuan1`.

## 2. Deskripsi Aplikasi

Aplikasi web **Kasir & Keranjang Belanja Sederhana (Mini POS)** untuk kasir kantin / toko kampus.
Menyatukan 3 kompetensi dasar praktikum:

1. Validasi input form (nama, harga, qty + pesan error merah).
2. Perhitungan kalkulator otomatis (subtotal, total, diskon, kembalian).
3. Manajemen keranjang belanja berbasis `localStorage` (tambah, hapus, reset, persisten saat refresh).

Tidak memakai framework / build step — murni HTML + CSS + JavaScript agar sesuai materi Pertemuan 1.

## 3. Panduan Menjalankan

Pilih salah satu:

**A. Klik dua kali (paling mudah)**
1. Buka folder ini di File Explorer.
2. Klik dua kali `index.html` → terbuka di browser.

**B. Live Server (disarankan, sesuai modul)**
1. Buka folder di VS Code.
2. Install extension *Live Server*.
3. Klik kanan `index.html` → *Open with Live Server*.

**C. Server lokal**
```bash
# dari dalam folder ini
python -m http.server 8000
# lalu buka http://localhost:8000
```

Tidak perlu `npm install` / koneksi internet (CSS & JS lokal, kecuali Fetch demo di `modul/`).

## 4. Daftar Fitur (checklist modul)

- [x] **Validasi Form**
  - [x] Nama wajib, min 3 karakter
  - [x] Harga angka positif, min Rp 500
  - [x] Qty bilangan bulat, min 1
  - [x] Pesan merah di bawah input yang salah, gagal tambah dicegah, sukses form auto-reset
- [x] **Kalkulator Otomatis**
  - [x] Subtotal per baris = Harga × Qty
  - [x] Total = jumlah semua subtotal
  - [x] Diskon 10% otomatis jika total ≥ Rp 50.000, atau kode `HEMAT10`
  - [x] Tampil nominal diskon + total akhir
  - [x] Input Uang Bayar → kembalian otomatis, warning jika kurang
- [x] **Keranjang + localStorage**
  - [x] Tabel No / Nama / Harga / Qty / Subtotal / Aksi Hapus
  - [x] Hapus per baris → total & diskon hitung ulang otomatis
  - [x] Simpan `JSON.stringify` / muat `JSON.parse` key `minipos_cart_v1` (+ `minipos_promo_v1`)
  - [x] Tombol Transaksi Baru / Reset kosongkan keranjang + storage
- [x] **UI/UX:** format Rupiah `id-ID`, layout responsif, keterbacaan angka

## 5. Tangkapan Layar

Simpan screenshot di folder `screenshots/` lalu ganti path di bawah (minimal 3 sesuai modul):

1. Form input utama + tabel keranjang:
   `![Form utama](screenshots/01-form-utama.png)`
2. Validasi error muncul (nama <3, harga <500, qty 0):
   `![Validasi error](screenshots/02-validasi-error.png)`
3. Hasil kalkulator (diskon + kembalian) + tabel terisi:
   `![Hasil kalkulator](screenshots/03-hasil-kalkulator.png)`

> Cara cepat: `Win + Shift + S` → paste ke Paint → simpan sebagai PNG di `screenshots/`.

## 6. Penjelasan Teknis Singkat

**Struktur file:**
- `index.html` — struktur: form `#form-barang`, tabel `#cart-body`, ringkasan `#total-belanja/#diskon/#total-akhir`, input `#input-bayar/#input-promo`.
- `style.css` — styling kartu, tabel, error merah, badge kembalian. Responsif 2 kolom → 1 kolom di HP.
- `script.js` — seluruh logika. Fungsi murni: `calcSubtotal(harga,qty)`, `calcTotal(items)`, `calcDiscount(total,usePromo)`, `calcChange(bayar,totalAkhir)`.
- `modul/` — latihan materi (variabel, kondisional, loop, fungsi+event, array/map/filter, objek, DOM, fetch async/await).

**Alur validasi:**
`submit → validateNama/Harga/Qty → showError(input, small.error, msg) → jika ada msg, batal + pesan global; jika lolos, push ke cart`.

**Alur kalkulator:**
`renderCart() → calcTotal() → calcDiscount(total>=50000 || promo) → totalAkhir → updateChange() saat input bayar berubah`.

**Mekanisme localStorage:**
```js
saveCart(cart)  // localStorage.setItem("minipos_cart_v1", JSON.stringify(cart))
loadCart()      // JSON.parse(localStorage.getItem("minipos_cart_v1")) || []
```
Dipanggil setiap tambah / hapus / reset, dan saat init `renderCart()` sehingga refresh tidak hilang.

## 7. Struktur Folder (sesuai Format Pengumpulan)

```
[NAMA]_[NIM]_pertemuan1/
├── index.html
├── style.css
├── script.js
├── README.md
├── pert1.html        # (opsional, file awal latihan — boleh hapus/dirapikan)
├── modul/
│   ├── index.html
│   └── latihan.js
└── screenshots/      # buat + isi 3 PNG sebelum kumpul
    ├── 01-form-utama.png
    ├── 02-validasi-error.png
    └── 03-hasil-kalkulator.png
```

Repo GitHub: `pemrograman_web_itera_[NIM]` (Public).
Submit via GForm kelas masing-masing sebelum deadline (RB: 7 Okt 2026, RA: 10 Okt 2026 23:59 WIB).
