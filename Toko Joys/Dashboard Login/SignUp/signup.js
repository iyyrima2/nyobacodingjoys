// Toggle password field 1
document.querySelector(".toggle-password").addEventListener("click", function() {
  const password = document.getElementById("password");
  const icon = this.querySelector("i");

  if (password.type === "password") {
    password.type = "text";
    icon.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    password.type = "password";
    icon.classList.replace("bi-eye-slash", "bi-eye");
  }
});

// Toggle password field 2
document.querySelector(".toggle-password2").addEventListener("click", function() {
  const password = document.getElementById("confirm-password");
  const icon = this.querySelector("i");

  if (password.type === "password") {
    password.type = "text";
    icon.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    password.type = "password";
    icon.classList.replace("bi-eye-slash", "bi-eye");
  }
});
