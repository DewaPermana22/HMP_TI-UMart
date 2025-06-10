function loadArtikels() {
    const loadingElement = document.getElementById('artikel-loading');
    const gridElement = document.getElementById('articles-grid');
    const emptyElement = document.getElementById('articles-empty');
    
    if (loadingElement) loadingElement.style.display = 'flex';
    if (gridElement) gridElement.style.display = 'none';
    if (emptyElement) emptyElement.style.display = 'none';
    
    setTimeout(() => {
        renderArtikelToGrid(
            articlesData.slice(0, 3),
            "articles-grid",
            "artikel-loading",
            "articles-empty"
        );
    }, 500);
}

function renderAllArtikel() {
    const loadingElement = document.getElementById("semua-artikel-loading");
    const gridElement = document.getElementById("semua-articles-grid");
    const emptyElement = document.getElementById("semua-articles-empty");

    if (loadingElement) loadingElement.style.display = "flex";
    if (gridElement) gridElement.style.display = "none";
    if (emptyElement) emptyElement.style.display = "none";

    setTimeout(() => {
        renderArtikelToGrid(
            articlesData,
            "semua-articles-grid",
            "semua-artikel-loading", 
            "semua-articles-empty"
        );
    }, 500);
}


function navigateToDetailArtikel(articleId){
    console.log("article id : ", articleId);
    const isExistArticles = articlesData.some(article => article.id === parseInt(articleId));
    if (isExistArticles) {
    window.location.href = `/pages/artikel_detail.html?id=${articleId}`;
    } else {
    console.error('artikel tidak ditemukan');
    window.location.href = '/pages/404.html';
    }
}


function searchArtikels(query) {
    const loadingElement = document.getElementById("semua-artikel-loading");
    if (loadingElement) loadingElement.style.display = 'flex';

    const filteredArticles = articlesData.filter(art => 
        art.name.toLowerCase().includes(query.toLowerCase()) ||
        (art.author && art.role.toLowerCase().includes(query.toLowerCase()))
    );

    setTimeout(() => {
        renderArtikelToGrid(
            filteredArticles,
            "semua-articles-grid",
            "semua-artikel-loading",
            "semua-articles-empty"
        );
    }, 300);
}

window.ArtikelManager = {
    loadArtikels,
    renderAllArtikel,
    navigateToDetailArtikel,
    searchArtikels
};
