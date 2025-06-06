const bayarButton = document.querySelectorAll('#bayar-button');

function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang belanja kosong</p>';
        updatePaymentDisplay(0, 0, 0, 0, true);
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
    hitungItemTerpilih();
}

function updatePaymentDisplay(subtotal, pajak, ongkir, total, disabled) {
    const formatRupiah = number => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);

    bayarButton.forEach(btn => {
        btn.innerText = `Bayar ${formatRupiah(total)}`;
        btn.disabled = disabled;
        disabled ? btn.classList.add('disabled') : btn.classList.remove('disabled');
    });
    
    document.getElementById('pajak-display').innerText = formatRupiah(pajak);
    document.querySelectorAll('#subtotal-harga').forEach(el => {
        el.innerText = formatRupiah(subtotal);
    });
    document.getElementById('ongkir-display').innerText = formatRupiah(ongkir);
}

// Pilih Semua Items
function selectAllItems() {
    document.querySelectorAll('.cart-item').forEach(item => {
        item.replaceWith(item.cloneNode(true));
    });

    document.querySelectorAll('.cart-item').forEach(item => {
        item.classList.add('selected');
        hitungItemTerpilih();
    });
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
    
    const pajakPPN = subtotalBelanjaan * 0.11;
    const hargaPlusPajak = subtotalBelanjaan + pajakPPN;
    let ongkir;
    if (subtotalBelanjaan === 0) {
        ongkir = 0;
    } else if (hargaPlusPajak < 15000) {
        ongkir = 5000;
    } else {
        ongkir = Math.floor(hargaPlusPajak / 15000) * 3000;
    }
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

function increaseQuantity(productId) {
    updateQuantity(productId, 1);
}

function decreaseQuantity(productId) {
    updateQuantity(productId, -1);
}

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
    hitungItemTerpilih();
});

function simpanItemTerpilih() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const selectedItems = [...document.querySelectorAll('.cart-item.selected')];
        const isSelectionMode = document.querySelector('.container-action-button')?.classList.contains('active');
        
        let itemsToPay = [];
        
        // Jika mode selection aktif dan ada item terpilih
        if (isSelectionMode && selectedItems.length > 0) {
            // Ambil item yang terpilih
            itemsToPay = cart.filter(item => 
                selectedItems.some(selectedItem => 
                    parseInt(selectedItem.getAttribute('data-id')) === item.id
                )
            );
        } else {
            console.log('Selection mode Error mas!.');
        }
        console.log('Selection mode:', isSelectionMode);
        console.log('Selected items count:', selectedItems.length);
        console.log('Items to pay:', itemsToPay);
        
        // Simpan ke sessionStorage
        sessionStorage.setItem('wantToPpay', JSON.stringify(itemsToPay));
        return itemsToPay.length > 0;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// Panggil fungsi saat tombol bayar diklik
bayarButton.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        if (!btn.disabled) {
            e.preventDefault();
            const success = simpanItemTerpilih();
            
            if (success) {
                const paymentData = JSON.parse(sessionStorage.getItem('wantToPpay'));
                console.log('Payment data:', paymentData);
                
                if (paymentData?.length > 0) {
                    window.location.href = "/pages/payment_pages.html";
                } else {
                    alert('Tidak ada item yang terpilih untuk dibayar');
                }
            } else {
                alert('Gagal memproses pembayaran. Silakan coba lagi.');
            }
        }
    });
});

const ovrlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");

function openModal() {
    const modalContent = document.getElementById("modalContent");
    const subtotal = parseInt(document.querySelector('#subtotal-harga')?.innerText.replace(/[^0-9]/g, '') || 0);
    const pajak = parseInt(document.getElementById('pajak-display')?.innerText.replace(/[^0-9]/g, '') || 0);
    const ongkir = parseInt(document.getElementById('ongkir-display')?.innerText.replace(/[^0-9]/g, '') || 0);
    const totalAkhir = subtotal + pajak + ongkir;

    const formatRupiah = number => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);

    modalContent.innerHTML = `
      <div class="subtotal">
      <h4>Subtotal : </h4>
      <p id="subtotal-mobile">${formatRupiah(subtotal)}</p>
      </div>
      <div class="subtotal">
      <h4>Pajak : </h4>
      <p id="pajak-mobile">${formatRupiah(pajak)}</p>
      </div>
      <div class="subtotal">
      <h4>Ongkir : </h4>
      <p id="ongkir-mobile">${formatRupiah(ongkir)}</p>
      </div>
      <div class="subtotal">
      <h4>Total : </h4>
      <p id="total-harga">${formatRupiah(totalAkhir)}</p>
      </div>
    `;

    setTimeout(() => {
        modal.classList.add("active");
    }, 10);
    ovrlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function tutupModal() {
    modal.classList.remove("active");
    setTimeout(() => {
        ovrlay.classList.remove("active");
    }, 300);
    document.body.style.overflow = "auto";
}

modal.addEventListener("click", (e) => {
    e.stopPropagation();
});

let startY = 0;
let currentY = 0;
let dragging = false;

modal.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    dragging = true;
});

modal.addEventListener("touchmove", (e) => {
    if (dragging) {
        currentY = e.touches[0].clientY;
        const diffy = currentY - startY;
        if (diffy > 0) {
            modal.style.transform = `translateY(${diffy}px)`;
        }
    }
});

modal.addEventListener("touchend", () => {
    if (!dragging) return;
    const diffY = currentY - startY;
    if (diffY > 100) {
        tutupModal();
    } else {
        modal.style.transform = 'translateY(0)';
    }
    dragging = false;
});

//navigasi ke pembayaran saat button di modal di klik
document.getElementById("btnModalGotoPay")?.addEventListener("click", () => {
    tutupModal();
    simpanItemTerpilih();
    window.location.href = "/pages/payment_pages.html";
})

displayCartItems();
document.documentElement.style.scrollBehavior = 'smooth';