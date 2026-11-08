from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, id_item: str, judul: str):
        self.id_item = id_item
        self.judul = judul
        self.__dipinjam = False

    @abstractmethod
    def get_detail(self) -> str:
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        pass

    @property
    def is_dipinjam(self) -> bool:
        return self.__dipinjam

    @is_dipinjam.setter
    def is_dipinjam(self, status: bool):
        if not isinstance(status, bool):
            raise TypeError("Isi is_dipinjam harus True atau False!")
        self.__dipinjam = status

    def cetak_info(self):
        if self.__dipinjam:
            status = "dipinjam"
        else:
            status = "tersedia"

        print(f"{self.get_detail()}, {status}")

class Book(LibraryItem):
    def __init__(self, id_item: str, judul: str, penulis: str, jumlah_halaman: int):
        super().__init__(id_item, judul)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    def get_detail(self) -> str:
        return f"{self.id_item} {self.judul}, {self.penulis}, {self.jumlah_halaman} halaman"

    def hitung_denda(self, hari_terlambat: int) -> float:
        denda_per_hari = 1000
        return hari_terlambat * denda_per_hari

class Magazine(LibraryItem):
    def __init__(self, id_item: str, judul: str, edisi: int, bulan_terbit: str):
        super().__init__(id_item, judul)
        self.edisi = edisi
        self.bulan_terbit = bulan_terbit

    def get_detail(self) -> str:
        return f"{self.id_item} {self.judul}, edisi {self.edisi} {self.bulan_terbit}"

    def hitung_denda(self, hari_terlambat: int) -> float:
        denda_per_hari = 500
        return hari_terlambat * denda_per_hari
