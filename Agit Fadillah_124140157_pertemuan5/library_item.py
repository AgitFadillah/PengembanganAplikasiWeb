# ==============================================================================
# Berkas: library_item.py
# Deskripsi: Abstract class LibraryItem beserta subclass Book dan Magazine
# ==============================================================================

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract class dasar untuk seluruh item koleksi perpustakaan.

    Class ini tidak dapat diinstansiasi langsung karena memiliki dua
    abstract method, yaitu get_detail() dan hitung_denda().
    """

    def __init__(self, id_item: str, judul: str):
        # Atribut public: boleh dibaca langsung dari luar class
        self.id_item = id_item
        self.judul = judul

        # Atribut private: terlindungi name mangling menjadi _LibraryItem__dipinjam
        self.__dipinjam = False

    # --------------------------------------------------------------------------
    # ABSTRACT METHOD (wajib diimplementasikan oleh seluruh subclass)
    # --------------------------------------------------------------------------
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan keterangan lengkap item sebagai teks."""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        """Menghitung nilai denda keterlambatan pengembalian item."""
        pass

    # --------------------------------------------------------------------------
    # PROPERTY GETTER (membaca status peminjaman sebagai atribut biasa)
    # --------------------------------------------------------------------------
    @property
    def is_dipinjam(self) -> bool:
        """Mengembalikan status apakah item sedang dipinjam atau tidak."""
        return self.__dipinjam

    # --------------------------------------------------------------------------
    # PROPERTY SETTER (mengubah status peminjaman melalui validasi)
    # --------------------------------------------------------------------------
    @is_dipinjam.setter
    def is_dipinjam(self, status: bool):
        if not isinstance(status, bool):
            raise TypeError("Isi is_dipinjam harus True atau False!")
        self.__dipinjam = status

    # --------------------------------------------------------------------------
    # CONCRETE METHOD (logika umum yang dibagi ke seluruh subclass)
    # --------------------------------------------------------------------------
    def cetak_info(self):
        """Mencetak keterangan item beserta status ketersediaannya."""
        if self.__dipinjam:
            status = "dipinjam"
        else:
            status = "tersedia"

        print(f"{self.get_detail()}, {status}")


class Book(LibraryItem):
    """Subclass untuk item koleksi berupa buku."""

    def __init__(self, id_item: str, judul: str, penulis: str, jumlah_halaman: int):
        # Memanggil constructor parent class LibraryItem via super()
        super().__init__(id_item, judul)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    # OVERRIDING abstract method milik LibraryItem
    def get_detail(self) -> str:
        return f"{self.id_item} {self.judul}, {self.penulis}, {self.jumlah_halaman} halaman"

    # OVERRIDING abstract method milik LibraryItem
    def hitung_denda(self, hari_terlambat: int) -> float:
        denda_per_hari = 1000
        return hari_terlambat * denda_per_hari


class Magazine(LibraryItem):
    """Subclass untuk item koleksi berupa majalah."""

    def __init__(self, id_item: str, judul: str, edisi: int, bulan_terbit: str):
        super().__init__(id_item, judul)
        self.edisi = edisi
        self.bulan_terbit = bulan_terbit

    # OVERRIDING abstract method milik LibraryItem
    def get_detail(self) -> str:
        return f"{self.id_item} {self.judul}, edisi {self.edisi} {self.bulan_terbit}"

    # OVERRIDING abstract method milik LibraryItem dengan rumus denda berbeda
    def hitung_denda(self, hari_terlambat: int) -> float:
        denda_per_hari = 500
        return hari_terlambat * denda_per_hari
