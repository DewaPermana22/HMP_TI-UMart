function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

let currentArticle = null;
let currentDetail = null;
let selectedVariant = "";
let selectedColor = "";

function initializePage() {
  const articleID = getUrlParameter('id');
  const artikelContainer = document.getElementById('ArtikelContainer') || document.body;

  if (!articleID) {
    showError(artikelContainer, 'ID Artikel tidak valid');
    return;
  }


  currentArticle = articlesData.find(p => p.id === Number(articleID));
  currentDetail = articleDetailData.find(d => d.article_id === Number(articleID));

  if (!currentArticle || !currentDetail) {
    showError(artikelContainer, 'Artikel tidak ditemukan');
    return;
  }

  try {
    renderArticle();
  } catch (error) {
    showError(artikelContainer, 'Gagal memuat detail artikel');
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

function renderArticle() {
  document.getElementById("articleTitle").textContent = currentArticle.name;
  document.getElementById("imageArticle").src = currentArticle.image;
  document.getElementById("imageArticle").alt = currentArticle.name;
  document.getElementById("kontenArtikel_atas").textContent = currentDetail.deskripsi_atas;
  document.getElementById("kontenArtikel_bawah").textContent = currentDetail.deskripsi_bawah;
  document.getElementById("authorName").textContent = currentArticle.author;
  document.getElementById("publishDate").textContent = currentDetail.realese_date;
  document.getElementById("Role").textContent = currentArticle.role;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.readyState === 'complete') {
    initializePage();
  } else {
    window.addEventListener('load', initializePage);
  }
});