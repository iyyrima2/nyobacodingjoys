// === TOGGLE SIDEBAR ===
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
menuToggle.addEventListener('click', () => {
  if (window.innerWidth > 768) sidebar.classList.toggle('collapsed');
  else sidebar.classList.toggle('active');
});

// === FILTER PRODUK BERDASARKAN KATEGORI ===
const categoryLinks = document.querySelectorAll('#category-list a');
const products = document.querySelectorAll('.col[data-category]');
categoryLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    categoryLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const category = link.dataset.category;
    products.forEach(p => {
      p.style.display = (category === 'semua' || p.dataset.category === category) ? 'block' : 'none';
    });
  });
});

// === SEARCH ===
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', () => {
  const keyword = searchInput.value.toLowerCase();
  products.forEach(p => {
    const name = p.dataset.name.toLowerCase();
    p.style.display = name.includes(keyword) ? 'block' : 'none';
  });
});

// === PANEL ORDER ===
const cartBtn = document.getElementById('cart-btn');
const orderPanel = document.getElementById('order-panel');
const closeCart = document.getElementById('close-cart');
const orderItems = document.getElementById('order-items');
const totalPrice = document.getElementById('total-price');

let orders = [];

cartBtn.addEventListener('click', () => orderPanel.classList.add('active'));
closeCart.addEventListener('click', () => orderPanel.classList.remove('active'));

// === TAMBAH PRODUK KE ORDER ===
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const col = card.closest('.col');
    const name = col.dataset.name;
    const price = parseInt(col.dataset.price);

    const existing = orders.find(o => o.name === name);
    if (existing) existing.qty += 1;
    else orders.push({ name, price, qty: 1 });

    renderOrders();
  });
});

function renderOrders() {
  orderItems.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  orders.forEach((o, index) => {
    total += o.price * o.qty;
    totalItems += o.qty;

    const item = document.createElement('div');
    item.className = 'order-item d-flex align-items-center justify-content-between border rounded p-2 mb-2';

    item.innerHTML = `
      <div class="d-flex align-items-center">
        <div class="order-bar me-2"></div>
        <div>
          <h6 class="mb-0 fw-bold">${o.name}</h6>
          <small class="text-muted">Rp${o.price.toLocaleString()}</small>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary minus-btn" data-index="${index}">−</button>
        <span>${o.qty}</span>
        <button class="btn btn-sm btn-outline-secondary plus-btn" data-index="${index}">+</button>
      </div>
    `;
    orderItems.appendChild(item);
  });

  totalPrice.textContent = 'Rp. ' + total.toLocaleString();

  // Tambahkan ringkasan item di bawah
  let summary = document.querySelector('.order-summary');
  if (!summary) {
    summary = document.createElement('div');
    summary.className = 'order-summary text-center mt-3';
    orderPanel.querySelector('.border-top').prepend(summary);
  }
  summary.innerHTML = `
    <small class="text-muted">${totalItems} items</small>
  `;

  // Event untuk tombol + dan -
  document.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.index;
      orders[idx].qty++;
      renderOrders();
    });
  });

  document.querySelectorAll('.minus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.index;
      if (orders[idx].qty > 1) orders[idx].qty--;
      else orders.splice(idx, 1);
      renderOrders();
    });
  });
}

// === POPUP PEMBAYARAN ===
const paymentModal = document.getElementById("payment-modal");
const closePayment = document.getElementById("close-payment");

closePayment.addEventListener("click", () => {
  paymentModal.classList.add("d-none");
});

// Aksi tombol Tunai
document.getElementById("pay-cash").addEventListener("click", () => {
  alert("Pembayaran Tunai dipilih!");
  paymentModal.classList.add("d-none");
});

// Aksi tombol QRIS
document.getElementById("pay-qris").addEventListener("click", () => {
  alert("Pembayaran QRIS dipilih!");
  paymentModal.classList.add("d-none");
});

// === POPUP RINGKASAN PESANAN ===
const bayarBtnPanel = document.getElementById("btn-bayar-order");
const summaryModal = document.getElementById("summary-modal");
const closeSummary = document.getElementById("close-summary");
const summaryList = document.getElementById("summary-list");
const summaryCount = document.getElementById("summary-count");
const summaryTotal = document.getElementById("summary-total");

// buka popup ringkasan
bayarBtnPanel.addEventListener("click", () => {
  if (orders.length === 0) return;

  summaryModal.classList.remove("d-none");

  let html = "";
  let total = 0;

  orders.forEach(o => {
    html += `
      <div class="d-flex justify-content-between">
        <span>${o.name}</span>
        <span>Rp${o.price.toLocaleString()}</span>
      </div>
    `;
    total += o.price * o.qty;
  });

  summaryList.innerHTML = html;
  summaryCount.textContent = "#" + orders.length;
  summaryTotal.textContent = "Rp" + total.toLocaleString();
});

// tombol close ringkasan
closeSummary.addEventListener("click", () => {
  summaryModal.classList.add("d-none");
});

// tombol edit kembali ke panel order
document.getElementById("summary-edit").addEventListener("click", () => {
  summaryModal.classList.add("d-none");
  orderPanel.classList.add("active");
});

// tombol bayar -> buka popup metode pembayaran
document.getElementById("summary-pay").addEventListener("click", () => {
  summaryModal.classList.add("d-none");
  paymentModal.classList.remove("d-none");
});

// === POPUP PEMBAYARAN TUNAI ===
const cashModal = document.getElementById("cash-modal");
const closeCash = document.getElementById("close-cash");
const confirmCash = document.getElementById("confirm-cash");

document.getElementById("pay-cash").addEventListener("click", () => {
  paymentModal.classList.add("d-none");
  cashModal.classList.remove("d-none");
});

closeCash.addEventListener("click", () => {
  cashModal.classList.add("d-none");
});

confirmCash.addEventListener("click", () => {
  const amount = parseInt(document.getElementById("cash-amount").value);
  let total = 0;
  orders.forEach(o => total += o.price * o.qty);

  if (isNaN(amount) || amount < total) {
    alert("Nominal tidak cukup!");
    return;
  }

  const kembalian = amount - total;
  alert(`Pembayaran berhasil!\nKembalian: Rp${kembalian.toLocaleString()}`);
  cashModal.classList.add("d-none");
});

// === POPUP QRIS DINAMIS ===
const qrisModal = document.getElementById("qris-modal");
const closeQris = document.getElementById("close-qris");

document.getElementById("pay-qris").addEventListener("click", () => {
  paymentModal.classList.add("d-none");
  qrisModal.classList.remove("d-none");

  // hitung total transaksi
  let total = 0;
  orders.forEach(o => total += o.price * o.qty);
  document.getElementById("qris-total").value = total.toLocaleString();

  // hapus QR lama (jika ada)
  const qrisContainer = document.getElementById("qris-code");
  qrisContainer.innerHTML = "";

  // buat QR baru
  const qrisData = `Pembayaran QRIS - Total Rp${total.toLocaleString()}`;
  new QRCode(qrisContainer, {
    text: qrisData,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
});

closeQris.addEventListener("click", () => {
  qrisModal.classList.add("d-none");
});

// === POPUP HASIL PEMBAYARAN ===
const successModal = document.getElementById("success-modal");
const failedModal = document.getElementById("failed-modal");
const successHome = document.getElementById("success-home");
const failedRetry = document.getElementById("failed-retry");

confirmCash.addEventListener("click", () => {
  const amount = parseInt(document.getElementById("cash-amount").value);
  let total = 0;
  orders.forEach(o => total += o.price * o.qty);

  if (isNaN(amount) || amount < total) {
    // Gagal
    document.getElementById("failed-total").textContent = "Rp" + total.toLocaleString();
    document.getElementById("failed-amount").textContent = isNaN(amount) ? "Rp0" : "Rp" + amount.toLocaleString();
    document.getElementById("failed-change").textContent = "Rp0";
    cashModal.classList.add("d-none");
    failedModal.classList.remove("d-none");
  } else {
    // Berhasil
    const kembalian = amount - total;
    document.getElementById("success-total").textContent = "Rp" + total.toLocaleString();
    document.getElementById("success-amount").textContent = "Rp" + amount.toLocaleString();
    document.getElementById("success-change").textContent = "Rp" + kembalian.toLocaleString();
    cashModal.classList.add("d-none");
    successModal.classList.remove("d-none");
  }
});

// tombol tutup hasil pembayaran
successHome.addEventListener("click", () => {
  successModal.classList.add("d-none");
  window.location.reload(); // kembali ke awal
});

failedRetry.addEventListener("click", () => {
  failedModal.classList.add("d-none");
  cashModal.classList.remove("d-none");
});

// === HALAMAN HISTORY ===
const historyIcon = document.querySelector('.bi-bookmark');
const historyPage = document.getElementById('history-page');
const mainLayout = document.querySelector('main');
const sidebarLayout = document.getElementById('sidebar');
const orderPanelLayout = document.getElementById('order-panel');

historyIcon.addEventListener('click', () => {
  // Sembunyikan layout utama
  mainLayout.classList.add('d-none');
  sidebarLayout.classList.add('d-none');
  orderPanelLayout.classList.add('d-none');

  // Tampilkan halaman history
  historyPage.classList.remove('d-none');
});

// ===== POPUP LOGOUT =====
const logoutBtn = document.getElementById("logout-btn");
const logoutModal = document.getElementById("logout-modal");
const logoutCancel = document.getElementById("logout-cancel");
const logoutConfirm = document.getElementById("logout-confirm");

// buka popup
logoutBtn.addEventListener("click", () => {
  logoutModal.classList.remove("d-none");
});

// batal
logoutCancel.addEventListener("click", () => {
  logoutModal.classList.add("d-none");
});

// konfirmasi logout
logoutConfirm.addEventListener("click", () => {
  window.location.href = "../Dashboard Login/Login/login.html";
});
