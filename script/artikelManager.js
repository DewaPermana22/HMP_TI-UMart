function loadArtikels() {
    const loadingElement = document.getElementById('artikel-loading');
    const gridElement = document.getElementById('articles-grid');
    const emptyElement = document.getElementById('articles-empty');
    
    if (loadingElement) loadingElement.style.display = 'flex';
    if (gridElement) gridElement.style.display = 'none';
    if (emptyElement) emptyElement.style.display = 'none';
    
    setTimeout(() => {
        renderArtikels(articlesData);
    }, 500);
}

window.ArtikelManager = {
    loadArtikels
};