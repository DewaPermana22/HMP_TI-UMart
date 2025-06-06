function initLucideIcons() {
  if (window.lucide) {
    lucide.createIcons();
  } else {
    setTimeout(initLucideIcons, 100);
  }
}

document.addEventListener("DOMContentLoaded", initLucideIcons);
window.addEventListener("load", initLucideIcons);