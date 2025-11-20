// Fungsi untuk menampilkan/menyembunyikan password
function togglePassword(id, btn) {
  const input = document.getElementById(id);
  const icon = btn.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("bi-eye-slash", "bi-eye");
  }
}

// Fungsi validasi password
document.getElementById("resetForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const pass = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (pass !== confirm) {
    Swal.fire({
      title: "Gagal!",
      text: "Password tidak sama. Silakan periksa kembali.",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#66b6c8"
    });
  } else {
    Swal.fire({
      title: "Berhasil!",
      text: "Kata sandi berhasil diubah.",
      icon: "success",
      confirmButtonText: "Lanjut",
      confirmButtonColor: "#66b6c8",
      background: "#ffffff",
      color: "#333"
    }).then(() => {
      window.location.href = "../Login/Login.html";
    });
  }
});
