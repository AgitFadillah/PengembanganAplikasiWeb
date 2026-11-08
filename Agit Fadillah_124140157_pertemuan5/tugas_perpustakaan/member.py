class Member:
    def __init__(self, nama: str, nim: str):
        self.nama = nama
        self.nim = nim
        self._daftar_pinjaman = []

    def tambah_pinjaman(self, item):
        self._daftar_pinjaman.append(item)

    def lihat_pinjaman(self):
        print(f"Riwayat pinjaman {self}:")

        if len(self._daftar_pinjaman) == 0:
            print("belum ada pinjaman.")
            return

        for item in self._daftar_pinjaman:
            item.cetak_info()

    def __str__(self) -> str:
        return f"{self.nama} ({self.nim})"
