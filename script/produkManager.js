function loadProducts() {
  const loadingElement = document.getElementById("products-loading");
  const gridElement = document.getElementById("products-grid");
  const emptyElement = document.getElementById("products-empty");

  if (loadingElement) loadingElement.style.display = "flex";
  if (gridElement) gridElement.style.display = "none";
  if (emptyElement) emptyElement.style.display = "none";

  setTimeout(() => {
    renderProducts(productsData);
  }, 500);
}

function openModalVariant(productId) {
  const modal = document.getElementById("modal-variant");
  const colorContainer = document.querySelector(".color-container");
  const variantContainer = document.querySelector(".variant-container");
  const product = productsData.find((p) => p.id === productId);
  const arrayVariant = product.variant || [];
  const arrayColor = product.color || [];

  let htmlContentColor = "";
  let htmlContentVariant = "";

  // Pengecekan varian/warna
  if (arrayColor.length > 0 || arrayVariant.length > 0) {
    modal.classList.add("active");
    arrayColor.map((color) => {
      htmlContentColor += `<div id="optionColor" style="background-color: ${color.hex};" class="color-option" data-color="${color.name}">
      </div>`;
    });

    arrayVariant.map((variant) => {
      htmlContentVariant += `<div class="variant-option" data-variant="${variant}">
        <span>${variant}</span>
      </div>`;
    });

    colorContainer.innerHTML = htmlContentColor;
    variantContainer.innerHTML = htmlContentVariant;
    let selectedColor = "";
    let selectedVariant = "";

    const selectColor = document.querySelectorAll(".color-option");
    if (selectColor && selectColor.length > 0) {
      selectColor.forEach((color) => {
        color.addEventListener("click", function () {
          selectColor.forEach((c) => c.classList.remove("selected"));
          color.classList.add("selected");
          selectedColor = color.getAttribute("data-color");
        });
      });

      const selectVariant = document.querySelectorAll(".variant-option");
      if (selectVariant && selectVariant.length > 0) {
        selectVariant.forEach((variant) => {
          variant.addEventListener("click", function () {
            selectVariant.forEach((c) => c.classList.remove("selected"));

            variant.classList.add("selected");
            selectedVariant = variant.getAttribute("data-variant");
          });
        });

        document.getElementById("add-to-cart").addEventListener("click", function () {
          if (selectedColor || selectedVariant) {
            addToCart(productId, selectedColor, selectedVariant);
          }
        });
        
      }
    } else {
      addToCart(productId);
    }
  }
}

function addToCart(productId, selectedColor = null, selectedVariant = null) {
  const product = productsData.find((p) => p.id === productId);
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    console.error("Error parsing cart:", error);
    cart = [];
  }

  if (!Array.isArray(cart)) {
    cart = [];
  }

  const uniqueId =
    selectedColor || selectedVariant
      ? `${productId}-${selectedColor || ""}-${selectedVariant || ""}`
      : productId;

  const existing = cart.findIndex((item) => item.uniqueId === uniqueId);

  if (existing !== -1) {
    // Jika produk sudah ada, tambah quantity
    cart[existing].quantity += 1;
  } else {
    // Jika produk belum ada, tambahkan sebagai item baru
    cart.push({
      id: product.id,
      uniqueId: uniqueId,
      name: product.name,
      price: product.currentPrice,
      image: product.image,
      quantity: 1,
      color: selectedColor,
      variant: selectedVariant,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  const modal = document.getElementById("modal-variant");
  if (modal) {
    modal.classList.remove("active");
  }

  const productName =
    selectedColor || selectedVariant
      ? `${product.name} (${selectedColor || selectedVariant})`
      : product.name;
  alert(`${productName} ditambahkan ke keranjang! Silahkan cek keranjang`);
}

function closeModalVariant() {
  const modal = document.getElementById("modal-variant");
  if (modal) {
    modal.classList.remove("active");
  }
}

function buyNow(productId) {
  const product = productsData.find((p) => p.id === productId);
  console.log("Buy now:", product.name);
  alert(`Membeli ${product.name} sekarang!`);
}

function searchProducts(query) {
  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  renderProducts(filteredProducts);
}

function sortProducts(sortBy) {
  let sortedProducts = [...productsData];

  switch (sortBy) {
    case "price-low":
      sortedProducts.sort((a, b) => {
        const priceA = parseInt(a.currentPrice.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.currentPrice.replace(/[^0-9]/g, ""));
        return priceA - priceB;
      });
      break;
    case "price-high":
      sortedProducts.sort((a, b) => {
        const priceA = parseInt(a.currentPrice.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.currentPrice.replace(/[^0-9]/g, ""));
        return priceB - priceA;
      });
      break;
    case "rating":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  renderProducts(sortedProducts);
}

// Export fungsi
window.ProdukManager = {
  loadProducts,
  searchProducts,
  sortProducts,
  addToCart,
  buyNow,
};
