const bayarButton = document.getElementById('bayar-button');

function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang belanja kosong</p>';
        return;
    }
    
    let html = '';
    let subtotalBelanjaan = 0;

    cart.forEach(item => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        const subtotal = price * item.quantity;
        subtotalBelanjaan += subtotal;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-box-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-content">
                    <div class="cart-item-header">
                        <h3>${item.name}</h3>
                        <button class="delete-btn" onclick="removeFromCart(${item.id})">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                            </svg>
                        </button>
                    </div>
                    <div class="cart-item-tags">
                        <span class="tag">Ukuran: Medium</span>
                        <span class="tag">${item.price}</span>
                    </div>
                    <div class="cart-item-footer">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" onclick="decreaseQuantity(${item.id})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn plus" onclick="increaseQuantity(${item.id})">+</button>
                        </div>
                        <div class="price-info">
                            <span class="total-price">Rp${subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    updatePaymentDisplay(0, 0, 0, 0, true);
}

function updatePaymentDisplay(subtotal, pajak, ongkir, total, disabled) {
    const formatRupiah = number => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number);

    bayarButton.innerText = `Bayar ${formatRupiah(total)}`;
    document.getElementById('pajak-display').innerText = formatRupiah(pajak);
    document.getElementById('subtotal-harga').innerText = formatRupiah(subtotal);
    document.getElementById('ongkir-display').innerText = formatRupiah(ongkir);
    
    bayarButton.disabled = disabled;
    disabled ? bayarButton.classList.add('disabled') : bayarButton.classList.remove('disabled');
}

function hitungItemTerpilih() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedItems = document.querySelectorAll('.cart-item.selected');
    const isSelectionMode = document.querySelector('.container-action-button')?.classList.contains('active');
    
    let subtotalBelanjaan = 0;
    let modeHitungBySlectedItem = isSelectionMode && selectedItems.length > 0;
    
    if (modeHitungBySlectedItem) {
        selectedItems.forEach(itemElement => {
            const itemId = parseInt(itemElement.getAttribute('data-id'));
            const cartItem = cart.find(item => item.id === itemId);
            
            if (cartItem) {
                const price = parseInt(cartItem.price.replace(/[^0-9]/g, ''));
                subtotalBelanjaan += price * cartItem.quantity;
            }
        });
    }
    
    const pajakPPN = hitungItemTerpilih ? subtotalBelanjaan * 0.11 : 0;
    const ongkir = hitungItemTerpilih ? 25000 : 0;
    const totalAkhir = subtotalBelanjaan + pajakPPN + ongkir;

    updatePaymentDisplay(
        Math.round(subtotalBelanjaan),
        Math.round(pajakPPN),
        ongkir,
        Math.round(totalAkhir),
        !modeHitungBySlectedItem || totalAkhir <= 0
    );
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function increaseQuantity(productId) { updateQuantity(productId, 1); }
function decreaseQuantity(productId) { updateQuantity(productId, -1); }

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function selectItem() {
    document.querySelectorAll('.cart-item').forEach(item => {
        item.replaceWith(item.cloneNode(true));
    });

    document.querySelectorAll('.cart-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            item.classList.toggle('selected');
            hitungItemTerpilih();
        });
    });
}

function unselectAllItems() {
    document.querySelectorAll('.cart-item').forEach(item => {
        item.classList.remove('selected');
    });
}

function removeSelectionListeners() {
    document.querySelectorAll('.cart-item').forEach(item => {
        item.replaceWith(item.cloneNode(true));
    });
}

// Event listeners
document.querySelector(".btn-pilih")?.addEventListener("click", () => {
    document.querySelector(".btn-pilih").classList.remove("active");
    document.querySelector(".container-action-button").classList.add("active");
    selectItem();
    hitungItemTerpilih();
});

document.getElementById("button-batal")?.addEventListener("click", () => {
    document.querySelector(".btn-pilih").classList.add("active");
    document.querySelector(".container-action-button").classList.remove("active");
    unselectAllItems();
    removeSelectionListeners();
    updatePaymentDisplay(0, 0, 0, 0, true);
});

if (!bayarButton.disabled) {
    bayarButton.addEventListener("click", () => {
       window.location.href = "/pages/payment_pages.html";
    })    
}

// Initialize
displayCartItems();