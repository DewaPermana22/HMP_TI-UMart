const semuaSection = document.querySelectorAll("section");
const semuaMenuLink = document.querySelectorAll(".navbar-menu-item li a");

window.addEventListener("scroll", () => {
  semuaSection.forEach((section) => {
    let windowScrollY = window.scrollY;
    let offsetTopSection = section.offsetTop - 100;
    let sectionHeight = section.offsetHeight;
    let idSection = section.getAttribute("id");

    if (
      windowScrollY >= offsetTopSection &&
      windowScrollY < offsetTopSection + sectionHeight
    ) {
      semuaMenuLink.forEach((link) => {
        link.classList.remove("active");
      });

      const targetLink = document.querySelector(
        `.navbar-menu-item li a[href*="${idSection}"]`
      );
      if (targetLink) {
        targetLink.classList.add("active");
      }
    }
  });
});

const menuBtn = document.getElementById("ikon_menu");
const menuMobile = document.querySelector(".navbar-menu-item-mobile");

if (menuBtn && menuMobile) {
  menuBtn.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });
}


const cartButtons = document.querySelectorAll("#cart-button");
cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "/pages/keranjang.html";
  });
});


const authButton = document.getElementById("auth-button");
if (authButton) {
  authButton.addEventListener("click", () => {
    window.location.href = "/pages/riwayat_pembelian.html";
  });
}

const authButtonMobile = document.getElementById("auth");
if (authButtonMobile) {
  authButtonMobile.addEventListener("click", () => {
    window.location.href = "/pages/riwayat_pembelian.html";
  });
}
