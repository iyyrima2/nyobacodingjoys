// Highlight card aktif
const items = document.querySelectorAll(".history-card");

items.forEach(card => {
  card.addEventListener("click", () => {
    items.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});
