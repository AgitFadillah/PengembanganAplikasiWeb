mini pos kasir kantin - tugas paw pertemuan 1

halo, ini tugas praktikum paw pertemuan 1 javascript dasar, kelas RB.
yang bikin saya sendiri, datanya di bawah.

identitas
nama saya Agit Fadillah
nim 124140157
kelas RB

deskripsi singkat
jadi ini aplikasi kasir simpel buat kantin kampus gitu. ceritanya kasir input barang, terus otomatis kehitung, terus kesimpen jadi ga ilang walau di refresh.
saya bikin sesuai modul kok, ada 3 yang diminta :
validasi form, kalkulator otomatis, sama keranjang + localstorage.
ga pake aneh aneh, cuma html css js biasa.

cara jalanin
jujur paling gampang tinggal klik 2x index.html nya, langsung kebuka di chrome.
atau kalau mau rapi bisa pake live server di vscode, klik kanan index.html open with live server.
saya biasanya pake yang klik 2x sih. oh iya butuh internet dikit buat font poppins sama tailwind di modul, selain itu offline bisa.

fitur yang udah jalan
validasi dulu, nama harus diisi minimal 3 huruf, harga minimal 500, qty minimal 1 dan harus bulat. kalau salah nanti muncul merah di bawahnya, barangnya ga masuk. kalau bener langsung masuk dan formnya kereset sendiri.
terus kalkulatornya, subtotal itu harga kali qty, total itu jumlahin semua, diskon 10% kalau udah 50rb ke atas atau pake kode HEMAT10, nanti keluar diskonnya berapa sama total akhirnya. uang bayar diisi langsung keluar kembaliannya, kalau kurang ada tulisannya kurang berapa.
keranjangnya tabel biasa, ada no nama harga qty subtotal sama tombol hapus. hapus satu baris langsung ngitung ulang. kesimpen di localstorage jadi aman. ada tombol reset buat transaksi baru.
tampilan seadanya, font poppins semua, angka udah rupiah indonesia, header abu2, di hp jadi 1 kolom.

screenshot
foto form utama :
screenshots/01-form-utama.png
[form utama](screenshots/01-form-utama.png)

foto pas error merah :
screenshots/02-validasi-error.png
[validasi error](screenshots/02-validasi-error.png)

foto hasil diskon + tabel keisi :
screenshots/03-hasil-kalkulator.png
[hasil kalkulator](screenshots/03-hasil-kalkulator.png)

penjelasan dikit
index.html itu strukturnya form-barang, cart-body, total-belanja diskon total-akhir, input bayar sama promo.
style.css saya tulis manual saja, background abu muda, header abu gelap 334155, tombol ijo, font poppins semua.
script.js fungsinya validateNama validateHarga validateQty buat cek, calcSubtotal calcTotal calcDiscount calcChange buat hitung, renderCart updateSummary buat tampil, saveCart loadCart buat localstorage.
modul itu latihan ngikutin web, ada variabel if ternary switch, loop for while for of, fungsi sapaNama hitungKalkulator, array push pop sort map filter, objek mahasiswa, dom create element, fetch jsonplaceholder. saya ikutin contohnya.

alur kasarnya
submit -> cek validasi -> kalau error merah dan batal, kalau oke push ke cart.
render -> total -> diskon -> total akhir -> kembalian pas bayar diisi.
localstorage pake JSON stringify pas simpan, JSON parse pas baca, dipanggil tiap tambah hapus reset.

struktur folder
agitfadillah_124140157_pertemuan1
di dalemnya ada index.html, style.css, script.js, README ini, folder modul isinya index.html sama latihan.js, sama folder screenshots isi 3 png.

