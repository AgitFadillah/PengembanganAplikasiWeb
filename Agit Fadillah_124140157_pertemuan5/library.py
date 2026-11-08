# ==============================================================================
# Berkas: library.py
# Deskripsi: Class Library yang mengelola koleksi serta sirkulasi item perpustakaan
# ==============================================================================


class Library:
    """Mengelola koleksi item beserta proses peminjaman dan pengembaliannya."""

    def __init__(self, nama_perpustakaan: str):
        # Atribut public: nama perpustakaan
        self.nama_perpustakaan = nama_perpustakaan

        # Atribut private: terlindungi name mangling menjadi _Library__koleksi
        self.__koleksi = []

        # Atribut protected: hanya untuk class ini dan turunannya
        self._daftar_anggota = []

    # --------------------------------------------------------------------------
    # PROPERTY GETTER (membaca jumlah koleksi sebagai atribut biasa)
    # --------------------------------------------------------------------------
    @property
    def total_item(self) -> int:
        """Mengembalikan jumlah seluruh item yang tersimpan di koleksi."""
        return len(self.__koleksi)

    # --------------------------------------------------------------------------
    # MANAJEMEN KOLEKSI
    # --------------------------------------------------------------------------
    def tambah_item(self, item):
        """Menambahkan satu item baru ke dalam koleksi perpustakaan."""
        self.__koleksi.append(item)

    def tambah_member(self, member):
        """Mendaftarkan seorang anggota ke dalam perpustakaan."""
        self._daftar_anggota.append(member)

    def tampilkan_katalog(self):
        """Menampilkan seluruh item koleksi beserta status ketersediaannya."""
        print(f"Katalog {self.nama_perpustakaan}:")

        if self.total_item == 0:
            print("belum ada item.")
            return

        for item in self.__koleksi:
            item.cetak_info()

    def cari_item(self, kata_kunci: str):
        """Mencari item berdasarkan id atau judul, lalu mencetak setiap hasilnya.

        Pencarian judul mencocokkan kata kunci pada bagian mana pun dari judul.
        """
        print(f"Cari '{kata_kunci}':")
        jumlah_ditemukan = 0

        for item in self.__koleksi:
            if item.id_item == kata_kunci or kata_kunci in item.judul:
                item.cetak_info()
                jumlah_ditemukan += 1

        if jumlah_ditemukan == 0:
            print("tidak ada yang cocok.")

    # --------------------------------------------------------------------------
    # SIRKULASI (PINJAM & KEMBALI)
    # --------------------------------------------------------------------------
    def pinjam_item(self, member, id_item: str) -> bool:
        """Memproses peminjaman satu item oleh seorang anggota."""
        for item in self.__koleksi:
            if item.id_item == id_item:
                if item.is_dipinjam:
                    print(f"{id_item} sedang dipinjam, permintaan {member.nama} ditolak.")
                    return False

                item.is_dipinjam = True
                member.tambah_pinjaman(item)
                print(f"{member.nama} meminjam {id_item}.")
                return True

        print(f"{id_item} tidak ada di koleksi.")
        return False

    def kembalikan_item(self, member, id_item: str, hari_terlambat: int) -> bool:
        """Memproses pengembalian item beserta perhitungan denda keterlambatan."""
        for item in self.__koleksi:
            if item.id_item == id_item:
                if not item.is_dipinjam:
                    print(f"{id_item} tidak sedang dipinjam, pengembalian ditolak.")
                    return False

                item.is_dipinjam = False
                denda = item.hitung_denda(hari_terlambat)
                print(f"{member.nama} mengembalikan {id_item}, terlambat {hari_terlambat} hari, denda Rp {denda:,.0f}.")
                return True

        print(f"{id_item} tidak ada di koleksi.")
        return False
