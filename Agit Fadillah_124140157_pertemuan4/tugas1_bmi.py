def hitung_bmi(berat: float, tinggi: float) -> float:
    """Menghitung nilai BMI dari berat badan dan tinggi badan.

    Parameter:
        berat (float): berat badan dalam kilogram.
        tinggi (float): tinggi badan dalam meter.

    Mengembalikan:
        float: nilai BMI hasil berat dibagi kuadrat tinggi.
    """
    return berat / (tinggi * tinggi)


def kategori_bmi(bmi: float) -> str:
    """Menentukan kategori berat badan berdasarkan nilai BMI.

    Parameter:
        bmi (float): nilai BMI yang sudah dihitung.

    Mengembalikan:
        str: kategori berat badan (kurang, normal, berlebih, atau obesitas).
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    print("--- PROGRAM PENGHITUNG BMI ---")
    berat = float(input("Masukkan berat badan (kg): "))
    tinggi = float(input("Masukkan tinggi badan (m): "))

    bmi = hitung_bmi(berat, tinggi)
    kategori = kategori_bmi(bmi)

    print(f"\nBerat badan : {berat} kg")
    print(f"Tinggi badan: {tinggi} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()
