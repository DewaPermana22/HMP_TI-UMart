function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

let currentProduct = null;
let currentDetail = null;
let selectedVariant = "";
let selectedColor = "";

function initializePage() {
  const productId = getUrlParameter('id');
  const productContainer = document.getElementById('productContainer') || document.body;

  if (!productId) {
    showError(productContainer, 'ID Produk tidak valid');
    return;
  }


  currentProduct = productsData.find(p => p.id === Number(productId));
  currentDetail = produkDetailData.find(d => d.id_produk === Number(productId));

  if (!currentProduct || !currentDetail) {
    showError(productContainer, 'Produk tidak ditemukan');
    return;
  }

  try {
    renderProduct();
  } catch (error) {
    showError(productContainer, 'Gagal memuat detail produk');
  }
}

function showError(container, message) {
  container.innerHTML = `
    <div style="padding: 2rem; text-align: center;">
      <h2>Error</h2>
      <p>${message}</p>
      <a href="/" style="color: #0066cc;">Kembali ke Beranda</a>
    </div>
  `;
}

function renderProduct() {
  document.getElementById("productTitle").textContent = currentProduct.name;
  document.getElementById("currentPrice").textContent = currentProduct.currentPrice;
  document.getElementById("originalPrice").textContent = currentProduct.originalPrice;
  document.getElementById("discount").textContent = currentProduct.discount;
  document.getElementById("reviewCount").textContent = `(${currentProduct.reviewCount} ulasan)`;

  document.getElementById("storeName").textContent = currentDetail.nama_toko;
  document.getElementById("mainImageSrc").src = currentDetail.image_detail[0];
  document.getElementById("storeAvatar").textContent = currentDetail.nama_toko.charAt(0);
  document.getElementById("storeReviewCount").textContent = `(${currentDetail.review_count} ulasan)`;
  document.getElementById("descriptionText").textContent = currentDetail.deskripsi;

  generateStars(currentProduct.rating, "starsContainer");
  generateStars(currentDetail.rating, "storeStars");

  if (currentProduct.variant.length > 0 && currentProduct.color.length > 0) {
  generateVariants();
  generateColors();
} else if (currentProduct.variant.length > 0 && currentProduct.color.length === 0) {
  generateVariants();
  document.getElementById("colorSection").style.display = "none";
} else if ((currentProduct.variant?.length === 0 || !currentProduct.variant) && currentProduct.color.length > 0) {
  generateColors();
  document.getElementById("variantSection").style.display = "none";
} else {
  document.getElementById("variantSection").style.display = "none";
  document.getElementById("colorOptions").style.display = "none";
}


  generateThumbnails();
  generateSpecifications();
}

function generateStars(rating, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = Array(5).fill(0)
    .map((_, i) => `<span class="${i < rating ? 'star' : 'star empty'}">★</span>`)
    .join('');
}

function generateThumbnails() {
  const container = document.getElementById("thumbnailContainer");
  if (!container || !currentDetail.image_detail) return;

  container.innerHTML = currentDetail.image_detail
    .map((img, i) => `
      <img class="thumbnail ${i === 0 ? 'active' : ''}" 
           src="${img}" 
           alt="Product image ${i + 1}"
           onclick="selectImage(${i})">
    `).join('');
}

function selectImage(index) {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainImageSrc');
  
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  
  if (mainImage && currentDetail.image_detail[index]) {
    mainImage.src = currentDetail.image_detail[index];
    mainImage.alt = `Product image ${index + 1}`;
  }
}

function generateVariants() {
  const container = document.getElementById("variantOptions");
  if (!container || !currentProduct.variant) return;

  container.innerHTML = currentProduct.variant
    .map((variant, i) => `
      <button data-variant="${variant}" class="variant-btn ${i === selectedVariant ? 'active' : ''}"
              onclick="selectVariant(${i})">
        ${variant}
      </button>
    `).join('');

    selectVariant(0);
}

function selectVariant(index) {
  document.querySelectorAll('.variant-btn').forEach((btn, i) => {
    const isActive = i === index;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      selectedVariant = btn.getAttribute('data-variant');
    }
  });

}
function generateColors() {
  const container = document.getElementById("colorOptions");
  if (!container || !currentProduct.color) return;

  container.innerHTML = currentProduct.color
    .map((color, i) => `
      <div class="color-btn ${i === selectedColor ? 'active' : ''}"
           style="background-color: ${color.hex}"
           title="${color.name}"
           onclick="selectColor(${i})"></div>
    `).join('');

    selectColor(0);
}

function selectColor(index) {
  document.querySelectorAll('.color-btn').forEach((btn, i) => {
    const isActive = i === index;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      selectedColor = btn.getAttribute('title');
    }
  });
}

function generateSpecifications() {
  const table = document.getElementById("specTable");
  if (!table || !currentDetail.spesifikasi) return;

  table.innerHTML = Object.entries(currentDetail.spesifikasi)
    .map(([key, value]) => `
      <tr class="spec-row">
        <td class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</td>
        <td class="spec-value">${value}</td>
      </tr>
    `).join('');
}

let valueQty = 0;
function changeQuantity(change) {
  const input = document.getElementById("quantity");
  if (!input) return;
  const currentValue = parseInt(input.value);
  const validCurrentValue = isNaN(currentValue) ? 1 : currentValue;

  valueQty = Math.max(1, validCurrentValue + change);
  input.setAttribute("value", valueQty);
  console.log(valueQty);
}

document.getElementById("toChart").addEventListener("click", () => {
  if (selectedColor || selectedVariant) {
    addToCart(currentProduct.id, selectedColor, selectedVariant, valueQty);
  } else {
    addToCart(currentProduct.id, null, null, valueQty);
  };
})

function langsungBeli() {
  const totalAkhir = parseInt(currentProduct.currentPrice.replace(/[^0-9]/g, "")) * valueQty || 0;
  console.log("total akhir : ", totalAkhir);
  console.log("qty : ", valueQty);
  const items = {
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.currentPrice,
    quantity: valueQty,
    color: selectedColor,
    variant: selectedVariant,
    image: currentProduct.image,
  };

  const itemsWantToPay = {
    items: [items],
    totalAkhir: totalAkhir,
  };

  sessionStorage.setItem("wantToPay", JSON.stringify(itemsWantToPay));
  setTimeout(() => {
    window.location.href = "/pages/payment_pages.html";
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.readyState === 'complete') {
    initializePage();
  } else {
    window.addEventListener('load', initializePage);
  }
});