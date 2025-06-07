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

const formatRupiah = number => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
}).format(number);

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert-type ${type}`;
    const icons = {
        success: 'check-circle',
        warning: 'alert-triangle',
        error: 'x-circle',
        info: 'info'
    };
    alert.innerHTML = `
        <i data-lucide="${icons[type]}" class="alert-icon"></i>
        <div class="alert-message">${message}</div>
        <i data-lucide="x" class="alert-close"></i>
    `;
    document.body.appendChild(alert);
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    const close = alert.querySelector('.alert-close');
    if (close) {
        close.addEventListener('click', function() {
            closeAlert(this);
        });
    }
    const removeWaktu = setTimeout(() => {
        if (document.body.contains(alert)) {
            closeAlert(close);
        }
    }, 5000);
    alert.dataset.timer = removeWaktu;
}

function closeAlert(close) {
    const alert = close.closest('.alert-type');
    if (alert && !alert.classList.contains('removing')) {
        if (alert.dataset.timer) {
            clearTimeout(parseInt(alert.dataset.timer));
        }
        alert.classList.add('removing');
        setTimeout(() => {
            if (document.body.contains(alert)) {
                alert.remove();
            }
        }, 300);
    }
}



window.formatRupiah = formatRupiah;
window.showAlert = showAlert;