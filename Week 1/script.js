// Mini POS — Praktikum PAW Pertemuan 1 (JavaScript Dasar)
// Kompetensi: validasi form, kalkulator otomatis, keranjang + localStorage

const CART_KEY = "minipos_cart_v1";
const PROMO_KEY = "minipos_promo_v1";
const PROMO_CODE = "HEMAT10";
const DISCOUNT_RATE = 0.1;
const DISCOUNT_THRESHOLD = 50000;
const MIN_HARGA = 500;

// ---------- Helpers ----------
function formatRupiah(nilai) {
  return "Rp " + Number(nilai || 0).toLocaleString("id-ID");
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadPromo() {
  return (localStorage.getItem(PROMO_KEY) || "").toUpperCase();
}

function savePromo(code) {
  if (code) localStorage.setItem(PROMO_KEY, code.toUpperCase());
  else localStorage.removeItem(PROMO_KEY);
}

// State
let cart = loadCart();
let promoApplied = loadPromo() === PROMO_CODE;

// ---------- DOM refs ----------
const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("input-nama");
const inputHarga = document.getElementById("input-harga");
const inputQty = document.getElementById("input-qty");
const errNama = document.getElementById("err-nama");
const errHarga = document.getElementById("err-harga");
const errQty = document.getElementById("err-qty");
const formMsg = document.getElementById("form-msg");

const cartBody = document.getElementById("cart-body");
const cartEmpty = document.getElementById("cart-empty");
const cartCount = document.getElementById("cart-count");

const totalBelanjaEl = document.getElementById("total-belanja");
const diskonEl = document.getElementById("diskon");
const totalAkhirEl = document.getElementById("total-akhir");
const inputPromo = document.getElementById("input-promo");
const promoMsg = document.getElementById("promo-msg");
const inputBayar = document.getElementById("input-bayar");
const infoKembalian = document.getElementById("info-kembalian");

// ---------- Validasi ----------
function validateNama(value) {
  if (!value || value.trim() === "") return "Nama barang wajib diisi.";
  if (value.trim().length < 3) return "Nama barang minimal 3 karakter.";
  return "";
}

function validateHarga(value) {
  if (value === "" || value === null) return "Harga wajib diisi.";
  const num = Number(value);
  if (!Number.isFinite(num)) return "Harga harus berupa angka.";
  if (num < MIN_HARGA) return `Harga minimal Rp ${MIN_HARGA.toLocaleString("id-ID")}.`;
  return "";
}

function validateQty(value) {
  if (value === "" || value === null) return "Qty wajib diisi.";
  const num = Number(value);
  if (!Number.isInteger(num)) return "Qty harus bilangan bulat.";
  if (num < 1) return "Qty minimal 1.";
  return "";
}

function showError(inputEl, errEl, msg) {
  errEl.textContent = msg || "";
  inputEl.classList.toggle("invalid", Boolean(msg));
}

// ---------- Kalkulator ----------
function calcSubtotal(harga, qty) {
  return Number(harga) * Number(qty);
}

function calcTotal(items) {
  return items.reduce((sum, it) => sum + calcSubtotal(it.harga, it.qty), 0);
}

function calcDiscount(total, usePromo) {
  // Diskon 10% jika total >= 50rb ATAU kode HEMAT10 dipakai
  if (total >= DISCOUNT_THRESHOLD || usePromo) {
    // Jika promo dipakai tapi total masih di bawah threshold, tetap beri diskon
    // agar fitur kupon terasa. Jika tanpa promo dan di bawah threshold => 0.
    if (total < DISCOUNT_THRESHOLD && !usePromo) return 0;
    return Math.round(total * DISCOUNT_RATE);
  }
  return 0;
}

function calcChange(uangBayar, totalAkhir) {
  return Number(uangBayar) - Number(totalAkhir);
}

// ---------- Render ----------
function renderCart() {
  cartBody.innerHTML = "";

  cart.forEach((item, index) => {
    const tr = document.createElement("tr");
    const subtotal = calcSubtotal(item.harga, item.qty);
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(item.nama)}</td>
      <td class="num">${formatRupiah(item.harga)}</td>
      <td class="num">${item.qty}</td>
      <td class="num">${formatRupiah(subtotal)}</td>
      <td><button class="btn btn-small" data-index="${index}">Hapus</button></td>
    `;
    cartBody.appendChild(tr);
  });

  const totalQty = cart.reduce((s, it) => s + Number(it.qty), 0);
  cartCount.textContent = `${totalQty} item (${cart.length} jenis)`;
  cartEmpty.classList.toggle("show", cart.length === 0);

  updateSummary();
}

function updateSummary() {
  const total = calcTotal(cart);
  const diskon = calcDiscount(total, promoApplied);
  const totalAkhir = total - diskon;

  totalBelanjaEl.textContent = formatRupiah(total);
  diskonEl.textContent = "- " + formatRupiah(diskon);
  totalAkhirEl.textContent = formatRupiah(totalAkhir);

  // Info promo
  if (promoApplied) {
    promoMsg.textContent = `Promo ${PROMO_CODE} aktif — diskon 10%.`;
    promoMsg.className = "promo-msg ok";
  } else if (total >= DISCOUNT_THRESHOLD) {
    promoMsg.textContent = "Diskon otomatis 10% karena total ≥ Rp 50.000.";
    promoMsg.className = "promo-msg ok";
  } else {
    promoMsg.textContent = "";
    promoMsg.className = "promo-msg";
  }

  updateChange(totalAkhir);
}

function updateChange(totalAkhir) {
  const raw = inputBayar.value;
  if (raw === "" || raw === null) {
    infoKembalian.textContent = "Masukkan nominal uang bayar untuk hitung kembalian.";
    infoKembalian.className = "kembalian";
    return;
  }
  const bayar = Number(raw);
  if (!Number.isFinite(bayar) || bayar < 0) {
    infoKembalian.textContent = "Nominal uang bayar tidak valid.";
    infoKembalian.className = "kembalian err";
    return;
  }
  const selisih = calcChange(bayar, totalAkhir);
  if (selisih < 0) {
    infoKembalian.textContent = `Uang belum mencukupi. Kurang ${formatRupiah(Math.abs(selisih))}.`;
    infoKembalian.className = "kembalian err";
  } else {
    infoKembalian.textContent = `Kembalian: ${formatRupiah(selisih)} (Bayar ${formatRupiah(bayar)} - Total ${formatRupiah(totalAkhir)})`;
    infoKembalian.className = "kembalian ok";
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

// ---------- Events ----------
// Validasi live saat mengetik (feedback langsung)
inputNama.addEventListener("input", () => showError(inputNama, errNama, validateNama(inputNama.value)));
inputHarga.addEventListener("input", () => showError(inputHarga, errHarga, validateHarga(inputHarga.value)));
inputQty.addEventListener("input", () => showError(inputQty, errQty, validateQty(inputQty.value)));

formBarang.addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = inputNama.value.trim();
  const hargaRaw = inputHarga.value;
  const qtyRaw = inputQty.value;

  const msgNama = validateNama(nama);
  const msgHarga = validateHarga(hargaRaw);
  const msgQty = validateQty(qtyRaw);

  showError(inputNama, errNama, msgNama);
  showError(inputHarga, errHarga, msgHarga);
  showError(inputQty, errQty, msgQty);

  if (msgNama || msgHarga || msgQty) {
    formMsg.textContent = "Perbaiki input yang bertanda merah sebelum tambah ke keranjang.";
    formMsg.className = "form-msg err";
    return;
  }

  cart.push({ nama, harga: Number(hargaRaw), qty: Number(qtyRaw) });
  saveCart(cart);
  renderCart();

  formBarang.reset();
  formMsg.textContent = `"${nama}" berhasil masuk keranjang.`;
  formMsg.className = "form-msg ok";
});

// Hapus per baris (event delegation)
cartBody.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;
  const idx = Number(btn.dataset.index);
  const [removed] = cart.splice(idx, 1);
  saveCart(cart);
  renderCart();
  formMsg.textContent = removed ? `"${removed.nama}" dihapus dari keranjang.` : "";
  formMsg.className = "form-msg err";
});

// Promo
document.getElementById("btn-promo").addEventListener("click", () => {
  const code = inputPromo.value.trim().toUpperCase();
  if (code === "") {
    promoMsg.textContent = "Masukkan kode promo dulu (coba HEMAT10).";
    promoMsg.className = "promo-msg err";
    return;
  }
  if (code === PROMO_CODE) {
    promoApplied = true;
    savePromo(code);
    updateSummary();
  } else {
    promoMsg.textContent = "Kode promo tidak valid. Yang valid: HEMAT10.";
    promoMsg.className = "promo-msg err";
  }
});

// Uang bayar -> hitung otomatis
inputBayar.addEventListener("input", () => {
  const total = calcTotal(cart);
  const diskon = calcDiscount(total, promoApplied);
  updateChange(total - diskon);
});

// Reset / transaksi baru
function resetTransaction() {
  cart = [];
  promoApplied = false;
  saveCart(cart);
  savePromo("");
  inputPromo.value = "";
  inputBayar.value = "";
  formMsg.textContent = "";
  renderCart();
}

document.getElementById("btn-reset").addEventListener("click", resetTransaction);
document.getElementById("btn-reset-header").addEventListener("click", resetTransaction);

// Init
inputPromo.value = loadPromo() === PROMO_CODE ? PROMO_CODE : "";
renderCart();
