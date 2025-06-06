function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<span class="star">☆</span>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star" style="color: #e5e7eb;">★</span>';
    }
    
    return starsHTML;
}


function renderProduct(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="discount-badge">${product.discount}</div>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="price-section">
                    <span class="current-price">${product.currentPrice}</span>
                    <span class="original-price">${product.originalPrice}</span>
                </div>
                <div class="rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-actions">
                    <button class="btn-cart" onclick="openModalVariant(${product.id})">
                        🛒
                    </button>
                    <button class="btn-buy" onclick="buyNow(${product.id})">
                        Beli
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderProducts(products) {
    const loadingElement = document.getElementById('products-loading');
    const gridElement = document.getElementById('products-grid');
    const emptyElement = document.getElementById('products-empty');
    
    if (loadingElement) loadingElement.style.display = 'none';
    
    if (products.length === 0) {
        gridElement.style.display = 'none';
        emptyElement.style.display = 'flex';
        return;
    }

    emptyElement.style.display = 'none';
    gridElement.style.display = 'grid';
    
    const productsHTML = products.map(product => renderProduct(product)).join('');
    gridElement.innerHTML = productsHTML;
}


// Render Artikel
function renderArticles(artikel){
    return `
        <div class="artikel-card">
        <img src="${artikel.image}" 
         alt="${artikel.name}" class="artikel-image">
    
    <div class="artikel-content">
        <h3 class="artikel-title">${artikel.name}</h3>
        
        <p class="artikel-desc">
            ${artikel.description}
        </p>
        
        <div class="artikel-author">
            <img src="${artikel.authorImage}" 
                 alt="Author" class="artikel-author-avatar">
            <div class="artikel-author-info">
                <div class="artikel-author-name">${artikel.author}</div>
                <div class="artikel-author-role">${artikel.role}</div>
            </div>
            <div class="artikel-stats">
            <div class="artikel-stat1">
                <img src="/assets/icon/heart-regular.svg" alt="like"> 
                ${artikel.liked}
            </div>
            <div class="artikel-stat">
                <img src="/assets/icon/bookmark-regular.svg" alt="bookmark"> 
                ${artikel.saved}
            </div>
        </div>
        </div>
    </div>
    </div>
    `
}


function renderArtikels(artikels) {
    const loadingElement = document.getElementById('artikel-loading');
    const gridElement = document.getElementById('articles-grid');
    const emptyElement = document.getElementById('articles-empty');
    
    if (loadingElement) loadingElement.style.display = 'none';
    
    if (artikels.length === 0) {
        gridElement.style.display = 'none';
        emptyElement.style.display = 'flex';
        return;
    }

    emptyElement.style.display = 'none';
    gridElement.style.display = 'grid';
    
    const productsHTML = artikels.map(artikel => renderArticles(artikel)).join('');
    gridElement.innerHTML = productsHTML;
}