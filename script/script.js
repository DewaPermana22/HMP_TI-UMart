// Ini Untuk Lucide Ikon
function initLucideIcons() {
  if (window.lucide) {
    lucide.createIcons();
  } else {
    setTimeout(initLucideIcons, 100);
  }
}

document.addEventListener('DOMContentLoaded', initLucideIcons);
window.addEventListener('load', initLucideIcons);


const menuBtn = document.getElementById("ikon_menu");
const menuMobile = document.querySelector(".navbar-menu-item-mobile");

menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("active");
  menuBtn.classList.toggle("active");
});
