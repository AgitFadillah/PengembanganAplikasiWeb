# ==============================================================================
# Berkas: member.py
# Deskripsi: Class Member sebagai anggota perpustakaan yang dapat meminjam item
# ==============================================================================


class Member:
    """Merepresentasikan seorang anggota perpustakaan beserta riwayat pinjamannya."""

    def __init__(self, nama: str, nim: str):
        # Atribut public: identitas anggota
        self.nama = nama
        self.nim = nim

        # Atribut protected: hanya untuk class ini dan turunannya
        self._daftar_pinjaman = []

    def tambah_pinjaman(self, item):
        """Mencatat satu item ke dalam daftar pinjaman anggota ini."""
        self._daftar_pinjaman.append(item)

    def lihat_pinjaman(self):
        """Menampilkan seluruh item yang pernah dipinjam anggota ini."""
        print(f"Riwayat pinjaman {self}:")

        if len(self._daftar_pinjaman) == 0:
            print("belum ada pinjaman.")
            return

        for item in self._daftar_pinjaman:
            item.cetak_info()

    def __str__(self) -> str:
        """Representasi teks anggota saat objek dicetak dengan print()."""
        return f"{self.nama} ({self.nim})"
