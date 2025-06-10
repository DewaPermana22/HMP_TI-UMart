function loadProducts() {
    const loadingElement = document.getElementById("products-loading");
    const gridElement = document.getElementById("products-grid");
    const emptyElement = document.getElementById("products-empty");

    if (loadingElement) loadingElement.style.display = "flex";
    if (gridElement) gridElement.style.display = "none";
    if (emptyElement) emptyElement.style.display = "none";

    setTimeout(() => {
        renderProductsToGrid(
            productsData.slice(0, 8), 
            "products-grid", 
            "products-loading", 
            "products-empty"
        );
    }, 500);
}

function renderAllProduks() {
    const loadingElement = document.getElementById("products-loading-all");
    const gridElement = document.getElementById("products-grid-all");
    const emptyElement = document.getElementById("products-empty-all");

    if (loadingElement) loadingElement.style.display = "flex";
    if (gridElement) gridElement.style.display = "none";
    if (emptyElement) emptyElement.style.display = "none";

    setTimeout(() => {
        renderProductsToGrid(
            productsData,
            "products-grid-all",
            "products-loading-all", 
            "products-empty-all"
        );
    }, 500);
}

function openModalVariant(productId) {
  const modal = document.getElementById("modal-variant");
  const colorContainer = document.querySelector(".color-container");
  const variantContainer = document.querySelector(".variant-container");
  const product = productsData.find((p) => p.id === productId);
  
  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  const arrayVariant = product.variant || [];
  const arrayColor = product.color || [];

  let htmlContentColor = "";
  let htmlContentVariant = "";

  if (arrayColor.length > 0 || arrayVariant.length > 0) {
    modal.classList.add("active");
    
    arrayColor.forEach((color) => {
      htmlContentColor += `<div class="color-option" style="background-color: ${color.hex};" data-color="${color.name}">
      </div>`;
    });

    arrayVariant.forEach((variant) => {
      htmlContentVariant += `<div class="variant-option" data-variant="${variant}">
        <span>${variant}</span>
      </div>`;
    });

    if (colorContainer) colorContainer.innerHTML = htmlContentColor;
    if (variantContainer) variantContainer.innerHTML = htmlContentVariant;

    let selectedColor = "";
    let selectedVariant = "";

    setupColorSelection();
    setupVariantSelection();
    setupAddToCartButton();

    function setupColorSelection() {
      const selectColor = document.querySelectorAll(".color-option");
      selectColor.forEach((color) => {
        color.addEventListener("click", function () {
          selectColor.forEach((c) => c.classList.remove("selected"));
          color.classList.add("selected");
          selectedColor = color.getAttribute("data-color");
        });
      });
    }

    function setupVariantSelection() {
      const selectVariant = document.querySelectorAll(".variant-option");
      selectVariant.forEach((variant) => {
        variant.addEventListener("click", function () {
          selectVariant.forEach((c) => c.classList.remove("selected"));
          variant.classList.add("selected");
          selectedVariant = variant.getAttribute("data-variant");
        });
      });
    }

    function setupAddToCartButton() {
  const addToCartBtn = document.querySelectorAll(".addToCart");
  
  if (addToCartBtn.length > 0) {
    addToCartBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        const hasColors = arrayColor.length > 0;
        const hasVariants = arrayVariant.length > 0;
        
        let canAddToCart = true;
        let errorMessage = "";
        
        // Jika ada pilihan warna tapi belum dipilih
        if (hasColors && !selectedColor) {
          canAddToCart = false;
          errorMessage += "Silakan pilih warna. ";
        }
        
        // Jika ada pilihan varian tapi belum dipilih
        if (hasVariants && !selectedVariant) {
          canAddToCart = false;
          errorMessage += "Silakan pilih varian. ";
        }
        
        if (canAddToCart) {
          addToCart(productId, selectedColor, selectedVariant);
        } else {
          alert(errorMessage.trim());
        }
      });
    });
}
  }
}
}

function addToCart(productId, selectedColor = null, selectedVariant = null, quantity = null) {
  const product = productsData.find((p) => p.id === productId);
  
  if (!product) {
    console.error("Product not found for cart:", productId);
    return;
  }

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
      quantity: quantity ? quantity : 1,
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
      ? `${product.name} (${[selectedColor, selectedVariant].filter(Boolean).join(", ")})`
      : product.name;
  
  showAlert(`${productName} ditambahkan ke keranjang! Silahkan cek keranjang`, 'success');
}

function closeModalVariant() {
  const modal = document.getElementById("modal-variant");
  if (modal) {
    modal.classList.remove("active");
  }
}

function navigateToProductDetail(productId) {
  const productExists = productsData.some(p => p.id === productId);
  if (productExists) {
    window.location.href = `/pages/produk_detail.html?id=${productId}`;
  } else {
    console.error('Produk tidak ditemukan');
    window.location.href = '/pages/404.html';
  }
}

function searchProducts(query) {
    const loadingElement = document.getElementById("products-loading-all");
    if (loadingElement) loadingElement.style.display = 'flex';

    const filteredProducts = productsData.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
    );

    setTimeout(() => {
        renderProductsToGrid(
            filteredProducts,
            "products-grid-all",
            "products-loading-all",
            "products-empty-all"
        );
    }, 300);
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

window.ProdukManager = {
  renderAllProduks,
  loadProducts,
  searchProducts,
  sortProducts,
  addToCart,
  navigateToProductDetail,
};
