let produkList = JSON.parse(localStorage.getItem("produkList")) || [];
const tableBody = document.getElementById("productTable");
const form = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");
const editIndexInput = document.getElementById("editIndex");

// Modal
const successModal = new bootstrap.Modal(document.getElementById("successModal"));
const confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
let deleteIndex = null;

// ===== Render Tabel =====
function renderTable() {
  tableBody.innerHTML = "";
  produkList.forEach((p, i) => {
    tableBody.innerHTML += `
      <tr>
        <td><img src="${p.foto}" alt="produk"></td>
        <td>${p.nama}</td>
        <td>${p.kategori}</td>
        <td>Rp${Number(p.harga).toLocaleString('id-ID')}</td>
        <td>${p.banyak}</td>
        <td>${p.tanggal}</td>
        <td>
          <button class="btn btn-sm btn-success me-2" onclick="editProduk(${i})"><i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-sm btn-danger" onclick="hapusProduk(${i})"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
  });
}

// ===== Ganti input kategori jadi dropdown (tanpa dobel) =====
const kategoriInput = document.getElementById("kategori");
const kategoriSelect = document.createElement("select");
kategoriSelect.className = "form-select";
kategoriSelect.id = "kategori";
kategoriSelect.required = true;
kategoriSelect.innerHTML = `
  <option value="" disabled selected>Pilih Kategori</option>
  <option value="Bahan Pokok">Bahan Pokok</option>
  <option value="Cemilan">Cemilan</option>
  <option value="Minuman">Minuman</option>
  <option value="Makanan Instan">Makanan Instan</option>
`;
kategoriInput.replaceWith(kategoriSelect);

// ===== Ubah input foto jadi upload =====
const fotoInput = document.getElementById("foto");
fotoInput.type = "file";
fotoInput.accept = "image/*";

// ===== Event Submit (tunggal & bersih) =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = fotoInput.files[0];
  const fotoURL = file ? URL.createObjectURL(file) : "";

  const newProduk = {
    nama: nama.value,
    kategori: kategoriSelect.value,
    harga: harga.value,
    banyak: banyak.value,
    tanggal: tanggal.value,
    foto: fotoURL
  };

  if (editIndexInput.value === "") {
    produkList.push(newProduk);
    successModal.show();
  } else {
    produkList[editIndexInput.value] = newProduk;
    editIndexInput.value = "";
    modalTitle.textContent = "Tambah Produk";
  }

  localStorage.setItem("produkList", JSON.stringify(produkList));
  renderTable();
  form.reset();
  bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
});

// ===== Edit Produk =====
function editProduk(index) {
  const p = produkList[index];
  nama.value = p.nama;
  kategoriSelect.value = p.kategori;
  harga.value = p.harga;
  banyak.value = p.banyak;
  tanggal.value = p.tanggal;
  editIndexInput.value = index;
  modalTitle.textContent = "Edit Produk";
  new bootstrap.Modal(document.getElementById("addModal")).show();
}

// ===== Konfirmasi Hapus =====
function hapusProduk(index) {
  deleteIndex = index;
  confirmDeleteModal.show();
}

confirmDeleteBtn.addEventListener("click", () => {
  if (deleteIndex !== null) {
    produkList.splice(deleteIndex, 1);
    localStorage.setItem("produkList", JSON.stringify(produkList));
    renderTable();
    confirmDeleteModal.hide();
    deleteIndex = null;
  }
});

// ===== Inisialisasi =====
renderTable();

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