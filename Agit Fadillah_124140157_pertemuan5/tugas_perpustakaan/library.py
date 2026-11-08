class Library:
    def __init__(self, nama_perpustakaan: str):
        self.nama_perpustakaan = nama_perpustakaan
        self.__koleksi = []
        self._daftar_anggota = []

    @property
    def total_item(self) -> int:
        return len(self.__koleksi)

    def tambah_item(self, item):
        self.__koleksi.append(item)

    def tambah_member(self, member):
        self._daftar_anggota.append(member)

    def tampilkan_katalog(self):
        print(f"Katalog {self.nama_perpustakaan}:")

        if self.total_item == 0:
            print("belum ada item.")
            return

        for item in self.__koleksi:
            item.cetak_info()

    def cari_item(self, kata_kunci: str):
        print(f"Cari '{kata_kunci}':")
        jumlah_ditemukan = 0

        for item in self.__koleksi:
            if item.id_item == kata_kunci or kata_kunci in item.judul:
                item.cetak_info()
                jumlah_ditemukan += 1

        if jumlah_ditemukan == 0:
            print("tidak ada yang cocok.")

    def pinjam_item(self, member, id_item: str) -> bool:
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
