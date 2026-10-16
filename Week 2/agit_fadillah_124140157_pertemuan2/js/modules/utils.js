// js/modules/utils.js
// Fungsi utilitas (helper)

export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Gagal menyimpan ke ${key}:`, error);
  }
};

export const loadFromStorage = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error(`Gagal memuat dari ${key}:`, error);
    return null;
  }
};