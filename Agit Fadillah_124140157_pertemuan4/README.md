# Tugas Praktikum Python Dasar

Tiga program Python buat latihan dasar: variabel, struktur kendali, fungsi, struktur data, dan modul kustom.

Agit Fadillah | 124140157 | Prak PAW Pertemuan 4

## Isi Folder

```
Agit Fadillah_124140157_pertemuan4/
├── .gitignore
├── README.md
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
└── main.py
```

## 1. tugas1_bmi.py

Program penghitung nilai BMI (Body Mass Index).

- `hitung_bmi(berat, tinggi)`: hitung BMI pakai rumus `berat / (tinggi * tinggi)`.
- `kategori_bmi(bmi)`: tentukan kategori lewat `if-elif-else` (kurang, normal, berlebih, obesitas).
- Nilai BMI dicetak dengan 2 angka desimal pakai f-string.

Cara jalan:

```bash
python tugas1_bmi.py
```

Contoh eksekusi (input berat 62, tinggi 1.7):

```
--- PROGRAM PENGHITUNG BMI ---
Masukkan berat badan (kg): 62
Masukkan tinggi badan (m): 1.7

Berat badan : 62.0 kg
Tinggi badan: 1.7 m
Nilai BMI   : 21.45
Kategori    : Berat badan normal
```

## 2. tugas2_nilai_mahasiswa.py

Program pengelolaan data nilai 5 mahasiswa.

- Data disimpan di list berisi dictionary (`nama`, `nim`, `nilai_uts`, `nilai_uas`, `nilai_tugas`).
- `hitung_nilai_akhir(uts, uas, tugas)`: bobot 30% UTS + 40% UAS + 30% tugas.
- `tentukan_grade(nilai)`: grade A sampai E.
- `tampilkan_tabel(daftar)`: cetak tabel rapi pakai perataan f-string.
- `cari_tertinggi_terendah(daftar)`: cari nilai akhir tertinggi dan terendah.

Cara jalan:

```bash
python tugas2_nilai_mahasiswa.py
```

Contoh eksekusi:

```
--- PENGELOLAAN DATA NILAI MAHASISWA ---

============================================================
Nama              NIM         Nilai Akhir   Grade
------------------------------------------------------------
Agit Fadillah     124140157   87.90         A
Budi Santoso      124140158   72.60         B
Citra Dewi        124140159   61.40         C
Dian Pratama      124140160   49.50         E
Eka Wahyuni       124140161   92.60         A
============================================================

Nilai tertinggi:
  Eka Wahyuni (124140161) - 92.60 - Grade A
Nilai terendah:
  Dian Pratama (124140160) - 49.50 - Grade E
```

## 3. math_operations.py & main.py

Modul matematika dan program pemanggilnya.

`math_operations.py` (modul):

- Konstanta `PI = 3.14159`.
- Persegi: `luas_persegi(sisi)`, `keliling_persegi(sisi)`.
- Persegi panjang: `luas_persegi_panjang(panjang, lebar)`, `keliling_persegi_panjang(panjang, lebar)`.
- Lingkaran: `luas_lingkaran(jari_jari)`, `keliling_lingkaran(jari_jari)`.
- Suhu: `celsius_ke_fahrenheit(celsius)`, `celsius_ke_kelvin(celsius)`.

`main.py` (program utama):

- Pakai 2 cara impor: `import math_operations` dan `from math_operations import PI, celsius_ke_kelvin`.
- Panggil seluruh fungsi modul dengan nilai uji.

Cara jalan:

```bash
python main.py
```

Contoh eksekusi:

```
--- KALKULATOR GEOMETRI & SUHU ---

1. Persegi (sisi = 5)
   Luas     : 25.00
   Keliling : 20.00

2. Persegi Panjang (panjang = 8, lebar = 4)
   Luas     : 32.00
   Keliling : 24.00

3. Lingkaran (jari-jari = 7)
   Luas     : 153.94
   Keliling : 43.98

4. Konversi Suhu (25 derajat Celsius)
   Fahrenheit : 77.00
   Kelvin     : 298.15

Nilai konstanta PI yang dipakai: 3.14159
```

## Catatan

- Semua berkas pakai indentasi 4 spasi dan penamaan snake_case (PEP 8).
- Setiap fungsi punya docstring penjelasan parameter dan nilai kembalian.
- Folder `venv/` dan `__pycache__/` tidak ikut diunggah, sudah terdaftar di `.gitignore`.

Modul Praktikum PAW - Teknik Informatika ITERA 2026/2027
