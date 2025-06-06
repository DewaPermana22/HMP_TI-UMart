const semuaSection = document.querySelectorAll("section"),
semuaMenuLink = document.querySelectorAll(".navbar-menu-item li a");
window.addEventListener("scroll", () => {
  semuaSection.forEach(section => {
    let windowScrollY = window.scrollY,
    offsetTopSection = section.offsetTop - 100,
    sectionHeight = section.offsetHeight,
    idSection = section.getAttribute("id");
    
    if(windowScrollY >= offsetTopSection && windowScrollY < offsetTopSection + sectionHeight) {
      semuaMenuLink.forEach(link => {
        link.classList.remove("active");
        document.querySelector(".navbar-menu-item li a[href*=" + idSection + "]").classList.add("active");
        
      })
      
    }
    
    
  })
  
})

const menuBtn = document.getElementById("ikon_menu");
const menuMobile = document.querySelector(".navbar-menu-item-mobile");

menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

const cartButtons = document.querySelectorAll("#cart-button");
cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "/pages/keranjang.html";
  });
});

const authButton = document.getElementById("auth-button");
authButton.addEventListener("click", () => {
  alert("Fitur ini segera tersedia!");
});

const authButtonMobile = document.getElementById("auth");
authButtonMobile.addEventListener("click", () => {
  alert("Fitur ini segera tersedia!");
});

document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  loadArtikels();

  // const searchInput = document.getElementById("search-product-input");
  // const searchBtn = document.getElementById("search-product-btn");
  // const sortSelect = document.getElementById("sort-product-select");

  // // fungsi buat cari ya! kakak ganteng & cantik :3
  // if (searchBtn) {
  //   searchBtn.addEventListener("click", function () {
  //     const query = searchInput ? searchInput.value : "";
  //     searchProducts(query);
  //   });
  // }

  // // fungsi buat search lalu di enter ya! kakak ganteng & cantik :3
  // if (searchInput) {
  //   searchInput.addEventListener("keypress", function (e) {
  //     if (e.key === "Enter") {
  //       const query = searchInput.value;
  //       searchProducts(query);
  //     }
  //   });
  // }

  // // fungsi buat sort ya! kakak ganteng & cantik :3
  // if (sortSelect) {
  //   sortSelect.addEventListener("change", function () {
  //     const sortBy = sortSelect.value;
  //     sortProducts(sortBy);
  //   });
  // }

  // Fungsi buat di card
  function animateCounter(element, target, suffix, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);

      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  function mulaiCounterCard() {
    const counters = document.querySelectorAll("[data-counter]");
    const observerOptions = {
      threshold: 0.8,
      rootMargin: "0px 0px -100px 0px", // Mulai ketika elemen mulai terlihat
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute("data-counter"));
          const suffix = element.getAttribute("data-suffix") || "";

          // Mulai
          animateCounter(element, target, suffix, 1500);
          // Berhenti
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    counters.forEach((counter) => {
      const suffix = counter.getAttribute("data-suffix") || "";
      counter.textContent = "0" + suffix;
      observer.observe(counter);
    });
  }
  mulaiCounterCard();

  // Tab fungsi
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  function switchTab(targetTab) {
    tabButtons.forEach((button) => button.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));
    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    activeButton.classList.add("active");
    const activeContent = document.getElementById(targetTab);
    activeContent.classList.add("active");
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });

  tabButtons.forEach((button, index) => {
    button.addEventListener("keydown", function (e) {
      let targetIndex;

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        targetIndex = index > 0 ? index - 1 : tabButtons.length - 1;
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        targetIndex = index < tabButtons.length - 1 ? index + 1 : 0;
      }

      if (targetIndex !== undefined) {
        tabButtons[targetIndex].focus();
        const targetTab = tabButtons[targetIndex].getAttribute("data-tab");
        switchTab(targetTab);
      }
    });
  });
});
