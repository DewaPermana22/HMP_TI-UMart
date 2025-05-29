function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang belanja kosong</p>';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        const subtotal = price * item.quantity;
        total += subtotal;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>Harga: ${item.price}</p>
                    <div class="quantity-control">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                    <p>Subtotal: Rp${subtotal.toLocaleString()}</p>
                    <button onclick="removeFromCart(${item.id})">Hapus</button>
                </div>
            </div>
        `;
    });
    
    html += `<div class="cart-total"><p>Total: Rp${total.toLocaleString()}</p></div>`;
    cartContainer.innerHTML = html;
}

// Fungsi untuk menambah/mengurangi quantity
function increaseQuantity(productId) {
    updateQuantity(productId, 1);
}

function decreaseQuantity(productId) {
    updateQuantity(productId, -1);
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // Jika quantity <= 0, hapus item dari cart
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Panggil fungsi ini saat halaman cart dimuat
displayCartItems();