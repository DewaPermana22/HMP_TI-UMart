const containerProdukToPay = document.getElementById('toPayProduct');

function displayPrdukToPay() {
    const itemsToPay = JSON.parse(sessionStorage.getItem('wantToPpay')) || [];
    console.log('Items to pay:', itemsToPay);
    let content = '';

    if (itemsToPay.length === 0) {
        content = '<p>Belum ada produk yang akan dibayar</p>';
        return;
    } else if (itemsToPay.length > 0) {
        itemsToPay.forEach(item => {
            content += `
            <div class="produk-toPay">
                <div class="produk-toPay-image">
                <img src="${item.image}" alt="${item.name}>
                </div>
                <div class="produk-toPay-info">
                <h3>${item.name}</h3>
                <p>Deskripsi singkat produk 1.</p>
                <span class="produk-toPay-price">${item.price}</span>
                </div>
            </div>
    `;      
        });
    } else {
        content = '<p>Terjadi kesalahan dalam menampilkan produk</p>';
    }

    containerProdukToPay.innerHTML = content;
}

document.addEventListener('DOMContentLoaded', () => {
    displayPrdukToPay();
});

