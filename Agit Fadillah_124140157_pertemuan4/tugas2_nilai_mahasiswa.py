def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """Menghitung nilai akhir dari komponen UTS, UAS, dan tugas.

    Bobot: UTS 30%, UAS 40%, tugas 30%.

    Parameter:
        uts (float): nilai UTS.
        uas (float): nilai UAS.
        tugas (float): nilai tugas.

    Mengembalikan:
        float: nilai akhir berbobot.
    """
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai: float) -> str:
    """Menentukan grade huruf dari nilai akhir.

    Parameter:
        nilai (float): nilai akhir mahasiswa.

    Mengembalikan:
        str: grade A, B, C, D, atau E.
    """
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


def tampilkan_tabel(daftar_mahasiswa: list):
    """Mencetak tabel nilai mahasiswa lengkap dengan grade.

    Parameter:
        daftar_mahasiswa (list): list berisi dictionary data mahasiswa.
    """
    print("\n" + "=" * 60)
    print(f"{'Nama':<18}{'NIM':<12}{'Nilai Akhir':<14}{'Grade':<6}")
    print("-" * 60)
    for mahasiswa in daftar_mahasiswa:
        print(
            f"{mahasiswa['nama']:<18}"
            f"{mahasiswa['nim']:<12}"
            f"{mahasiswa['nilai_akhir']:<14.2f}"
            f"{mahasiswa['grade']:<6}"
        )
    print("=" * 60)


def cari_tertinggi_terendah(daftar_mahasiswa: list):
    """Mencari dan menampilkan mahasiswa dengan nilai tertinggi dan terendah.

    Parameter:
        daftar_mahasiswa (list): list berisi dictionary data mahasiswa.
    """
    tertinggi = daftar_mahasiswa[0]
    terendah = daftar_mahasiswa[0]
    for mahasiswa in daftar_mahasiswa:
        if mahasiswa["nilai_akhir"] > tertinggi["nilai_akhir"]:
            tertinggi = mahasiswa
        if mahasiswa["nilai_akhir"] < terendah["nilai_akhir"]:
            terendah = mahasiswa

    print("\nNilai tertinggi:")
    print(
        f"  {tertinggi['nama']} ({tertinggi['nim']}) - "
        f"{tertinggi['nilai_akhir']:.2f} - Grade {tertinggi['grade']}"
    )
    print("Nilai terendah:")
    print(
        f"  {terendah['nama']} ({terendah['nim']}) - "
        f"{terendah['nilai_akhir']:.2f} - Grade {terendah['grade']}"
    )


def main():
    data_mahasiswa = [
        {"nama": "Agit Fadillah", "nim": "124140157", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
        {"nama": "Budi Santoso", "nim": "124140158", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 72},
        {"nama": "Citra Dewi", "nim": "124140159", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 58},
        {"nama": "Dian Pratama", "nim": "124140160", "nilai_uts": 50, "nilai_uas": 45, "nilai_tugas": 55},
        {"nama": "Eka Wahyuni", "nim": "124140161", "nilai_uts": 92, "nilai_uas": 95, "nilai_tugas": 90},
    ]

    for mahasiswa in data_mahasiswa:
        mahasiswa["nilai_akhir"] = hitung_nilai_akhir(
            mahasiswa["nilai_uts"],
            mahasiswa["nilai_uas"],
            mahasiswa["nilai_tugas"],
        )
        mahasiswa["grade"] = tentukan_grade(mahasiswa["nilai_akhir"])

    print("--- PENGELOLAAN DATA NILAI MAHASISWA ---")
    tampilkan_tabel(data_mahasiswa)
    cari_tertinggi_terendah(data_mahasiswa)


if __name__ == "__main__":
    main()
