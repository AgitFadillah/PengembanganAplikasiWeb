# Pertemuan 2: Personal Dashboard (ES6+)

**Nama:** Leon  
**NIM:** 124140157  
**Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (PAW) - ITERA  
**Tahun Akademik:** 2026/2027 Gasal

---

## Penjelasan Aplikasi

Personal Dashboard adalah aplikasi web sederhana untuk mengelola kegiatan harian — tugas kuliah, catatan cepat, dan informasi cuaca/waktu real-time. Aplikasi ini memanfaatkan fitur **JavaScript Next Gen (ES6+)** sepenuhnya dan mengintegrasikan **API publik eksternal** untuk menampilkan data asinkron.

### Fitur Utama

- **Cuaca Real-time** — Widget cuaca lokasi kampus ITERA (Lampung Selatan) via [Open-Meteo API](https://open-meteo.com).
- **Kutipan Hari** — Kutipan motivasi acak via [DummyJSON Quotes API](https://dummyjson.com).
- **Manajemen Tugas** — Tambah, hapus, toggle status selesai, filter (semua/selesai/proses), hapus semua yang selesai.
- **Catatan Cepat** — Tambah dan hapus catatan pribadi yang otomatis tersimpan.
- **Penyimpanan Lokal** — Semua data tugas dan catatan disimpan di `localStorage` agar bertahan melewati refresh.
- **Responsif** — Antarmuka dibangun dengan Tailwind CSS, responsive di semua perangkat.

### Screenshot

> 📸 *Silakan jalankan aplikasi dan capture screenshot sendiri.*

---

## Struktur Project

```
leon_124140157_pertemuan2/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── main.js            ← Entry point (DOM controller & event handlers)
    ├── app.js             ← Logic aplikasi (class TaskItem, DashboardApp)
    └── modules/
        ├── data.js        ← API endpoints, storage keys, initial todos
        └── utils.js       ← Helper: formatDate, storage, dsb
```

---

## Fitur ES6+ yang Diimplementasikan

Berikut adalah daftar lengkap fitur ES6+ dan lokasi kode-nya:

| No | Fitur ES6+ | Penjelasan | Lokasi File |
|---|------------|------------|-------------|
| 1 | `let` & `const` | Deklarasi variabel modern | `main.js:1-2`, `app.js:4-10` |
| 2 | `const` (immutable ref) | Objek/array tetap, isi bisa dimodifikasi | `app.js:25, 38` |
| 3 | **Arrow Functions** | 3+ arrow functions | `app.js:6, 9, utils.js:4-6,12-16`, `main.js:30+52+76` |
| 4 | **Template Literals** | Rendering HTML dengan backticks + `${}` | `app.js:33-42`, `main.js:44-52` |
| 5 | **Object Destructuring** | Ekstrak properti & parameter | `app.js:55-58`, `main.js:3,26-30` |
| 6 | **Array Destructuring** | Ekstrak elemen array | `app.js:61-62` |
| 7 | **Spread Operator** | Shallow copy & merge array/objek | `app.js:25, 29, 34, 122-125` |
| 8 | **Rest Operator** | Fungsi fleksibel | `app.js:45-46` |
| 9 | **ES6 Classes** | `TaskItem` & `DashboardApp` | `app.js:7-63` |
| 10 | **Class Inheritance** | `static fromJSON/toJSON` | `app.js:22-36` |
| 11 | **Method Shorthand** | Object method tanpa `function` | `app.js:15-20` |
| 12 | **Computed Property Names** | — | `app.js:1-2` (data.js) |
| 13 | **Default Parameters** | Parameter default | `app.js:8, 19` |
| 14 | **Import/Export (Modules)** | `export`/`import` | Semua file |
| 15 | **Higher-Order Functions** | `.map`, `.filter`, `.find` | `app.js:74-92`, `main.js:36, 70` |
| 16 | **Promise** | `fetch()` & `async/await` | `app.js:47-72` |
| 17 | **async/await** | Fungsi asinkron dengan try/catch | `app.js:47, 56, main.js:83, 94` |
| 18 | **Promise Chaining** | `.then`, `.catch` | `app.js:56, 69` |
| 19 | **`Array.from()`** | — | — |
| 20 | **`Array.prototype.includes()`** | — | — |

---

## Cara Menjalankan

### Prasyarat

- Browser modern (Chrome, Firefox, Edge, Safari)
- Live Server (VS Code extension) — **wajib** karena aplikasi memakai ES6 Modules (`type="module"`)

### Langkah-langkah

1. Buka VS Code
2. Buka folder `leon_124140157_pertemuan2`
3. Klik kanan pada file `index.html` → pilih **"Open with Live Server"**

> ⚠️ **Jangan buka langsung dengan double-click** (file://). Browser akan memblokir import modul ES6 karena batasan CORS. Gunakan Live Server untuk protokol `http://localhost`.

---

## API yang Digunakan

| Nama | Endpoint | Deskripsi |
|------|----------|-----------|
| Cuaca | `https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current-weather=true` | Data cuaca real-time kampus ITERA |
| Kutipan | `https://dummyjson.com/quotes/random` | Kutipan motivasi acak |

---

## Dependensi

- [Tailwind CSS (CDN)](https://tailwindcss.com) — styling utility tanpa build step

---

## Notes

- Data disimpan di `localStorage` browser, tidak ada backend server.
- Jika API gagal dimuat (koneksi bermasalah), aplikasi tetap berfungsi untuk fitur tugas & catatan.
- Format tanggal menggunakan lokasi Indonesia (id-ID).