document.addEventListener('DOMContentLoaded', function() {
  const semuaSection = document.querySelectorAll("section");
  const semuaMenuLink = document.querySelectorAll(".navbar-menu-item a");
  const containerNavbar = document.querySelector(".navbar-container");
  const buttonSearch = document.getElementById("search-button");
  const buttonCart = document.getElementById("cart-button");
  const authBtn = document.getElementById("auth-button");
  const authButtonMobile = document.getElementById("auth");
  const Logo = document.getElementById("Logo");
  const bar = document.querySelectorAll(".bar");

  function handleScroll() {
    if (!containerNavbar) return;

    const isScrolled = window.scrollY > 50;
    containerNavbar.classList.toggle("active", isScrolled);
    
    if (authBtn) authBtn.classList.toggle("active", isScrolled);
    if (bar) {
      for (let i = 0; i < bar.length; i++) {
        bar[i].style.backgroundColor = isScrolled ? "black" : "white";
      }
    }
    if (Logo) Logo.src = isScrolled ? "/assets/UmMart - Logo.svg" : "/assets/UmMart - Logo_White.svg";
    if (buttonSearch) buttonSearch.classList.toggle("active", isScrolled);
    if (buttonCart) buttonCart.classList.toggle("active", isScrolled);
    
    semuaMenuLink.forEach(link => {
      link.style.color = isScrolled ? "black" : "white";
    });

    if (semuaSection.length && semuaMenuLink.length) {
      semuaSection.forEach(section => {
        const windowScrollY = window.scrollY;
        const offsetTopSection = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const idSection = section.getAttribute("id");

        if (windowScrollY >= offsetTopSection && windowScrollY < offsetTopSection + sectionHeight) {
          semuaMenuLink.forEach(link => link.classList.remove("active"));
          const targetLink = document.querySelector(`.navbar-menu-item li a[href*="${idSection}"]`);
          if (targetLink) targetLink.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("scroll", handleScroll);

  const menuBtn = document.getElementById("ikon_menu");
  const menuMobile = document.querySelector(".navbar-menu-item-mobile");
  if (menuBtn && menuMobile) {
    menuBtn.addEventListener("click", () => {
      menuMobile.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });
  }

  document.querySelectorAll("#cart-button").forEach(button => {
    button.addEventListener("click", () => {
      window.location.href = "/pages/keranjang.html";
    });
  });

  document.getElementById("auth-button")?.addEventListener("click", () => {
    window.location.href = "/pages/riwayat_pembelian.html";
  });

  document.getElementById("auth")?.addEventListener("click", () => {
    window.location.href = "/pages/riwayat_pembelian.html";
  });

  handleScroll();
});