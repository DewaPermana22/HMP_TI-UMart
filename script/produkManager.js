function loadProducts() {
    const loadingElement = document.getElementById('products-loading');
    const gridElement = document.getElementById('products-grid');
    const emptyElement = document.getElementById('products-empty');
    
    if (loadingElement) loadingElement.style.display = 'flex';
    if (gridElement) gridElement.style.display = 'none';
    if (emptyElement) emptyElement.style.display = 'none';
    
    setTimeout(() => {
        renderProducts(productsData);
    }, 500);
}

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);

    let cart;
    try {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
        console.error('Error parsing cart:', error);
        cart = [];
    }

    if (!Array.isArray(cart)) {
        cart = [];
    }

    const existing = cart.findIndex(item => item.id === productId);
    if (existing !== -1) {
        // Jika produk sudah ada, tambahkan quantity
        cart[existing].quantity += 1;
    } else {
        // Jika produk belum ada, tambahkan ke cart dengan quantity 1
        cart.push({
            id: product.id,
            name: product.name,
            price: product.currentPrice,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Product added to cart:', cart);
    alert(`${product.name} ditambahkan ke keranjang!, Silahkan cek keranjang`);
}

function buyNow(productId) {
    const product = productsData.find(p => p.id === productId);
    console.log('Buy now:', product.name);
    alert(`Membeli ${product.name} sekarang!`);
}

function searchProducts(query) {
    const filteredProducts = productsData.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filteredProducts);
}

function sortProducts(sortBy) {
    let sortedProducts = [...productsData];
    
    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => {
                const priceA = parseInt(a.currentPrice.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.currentPrice.replace(/[^0-9]/g, ''));
                return priceA - priceB;
            });
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => {
                const priceA = parseInt(a.currentPrice.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.currentPrice.replace(/[^0-9]/g, ''));
                return priceB - priceA;
            });
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
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
    buyNow
};