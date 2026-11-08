from library_item import Book, Magazine
from member import Member
from library import Library

if __name__ == "__main__":
    perpus = Library("Perpustakaan ITERA")

    agit = Member("Agit Fadillah", "124140157")
    nayla = Member("Nayla Agustria", "121140002")
    perpus.tambah_member(agit)
    perpus.tambah_member(nayla)

    perpus.tambah_item(Book("B001", "Pemrograman Web dengan Python", "Budi Santoso", 320))
    perpus.tambah_item(Book("B002", "Struktur Data Terapan", "Siti Rahma", 280))
    perpus.tambah_item(Magazine("M001", "Jurnal Teknologi Informasi", 12, "November"))
    perpus.tambah_item(Magazine("M002", "Majalah Sains Terapan", 45, "Oktober"))

    perpus.tampilkan_katalog()

    perpus.cari_item("Python")
    perpus.cari_item("M001")
    perpus.cari_item("Kalkulus")

    perpus.pinjam_item(agit, "B001")
    perpus.pinjam_item(nayla, "M002")
    perpus.pinjam_item(nayla, "B001")

    perpus.tampilkan_katalog()

    perpus.kembalikan_item(agit, "B001", 4)
    perpus.kembalikan_item(nayla, "M002", 2)

    agit.lihat_pinjaman()

    perpus.tampilkan_katalog()
    print(f"Total item: {perpus.total_item}")
