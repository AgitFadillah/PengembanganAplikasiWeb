import math_operations
from math_operations import PI, celsius_ke_kelvin


def main():
    print("--- KALKULATOR GEOMETRI & SUHU ---")

    print("\n1. Persegi (sisi = 5)")
    print(f"   Luas     : {math_operations.luas_persegi(5):.2f}")
    print(f"   Keliling : {math_operations.keliling_persegi(5):.2f}")

    print("\n2. Persegi Panjang (panjang = 8, lebar = 4)")
    print(f"   Luas     : {math_operations.luas_persegi_panjang(8, 4):.2f}")
    print(f"   Keliling : {math_operations.keliling_persegi_panjang(8, 4):.2f}")

    print("\n3. Lingkaran (jari-jari = 7)")
    print(f"   Luas     : {math_operations.luas_lingkaran(7):.2f}")
    print(f"   Keliling : {math_operations.keliling_lingkaran(7):.2f}")

    print("\n4. Konversi Suhu (25 derajat Celsius)")
    print(f"   Fahrenheit : {math_operations.celsius_ke_fahrenheit(25):.2f}")
    print(f"   Kelvin     : {celsius_ke_kelvin(25):.2f}")

    print(f"\nNilai konstanta PI yang dipakai: {PI}")

if __name__ == "__main__":
    main()
