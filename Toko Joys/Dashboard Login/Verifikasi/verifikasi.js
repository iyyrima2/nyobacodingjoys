// Arahkan ke halaman reset setelah klik verifikasi
document.getElementById("verifyForm").addEventListener("submit", function(e) {
  e.preventDefault();
  window.location.href = "../reset/reset.html";
});

// Tampilkan/sembunyikan kode
const toggleView = document.querySelector(".toggle-view");
const kodeInput = document.getElementById("kode");

toggleView.addEventListener("click", function() {
  if (kodeInput.type === "password") {
    kodeInput.type = "text";
    this.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    kodeInput.type = "password";
    this.classList.replace("bi-eye-slash", "bi-eye");
  }
});
