const containerProdukToPay = document.getElementById('toPayProduct');

function displayPrdukToPay() {
    const itemsToPay = JSON.parse(sessionStorage.getItem('wantToPay')) || {};
    let content = '';

    if (itemsToPay.items?.length === 0) {
        content = '<p>Belum ada produk yang akan dibayar</p>';
    } else {
        itemsToPay.items?.forEach(item => {
            const variantInfo = item.variant || item.color || 'Tidak ada variant';
            content += `
                <div class="produk-toPay">
                    <div class="produk-toPay-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="produk-toPay-info">
                        <h3>${item.name}</h3>
                        <div class="cart-item-tags">
                        <div class="tag">varian : ${variantInfo}</div>
                        <div class="tag">Jumlah : ${item.quantity}</div>
                        </div>
                        <span class="produk-toPay-price">${item.price}</span>
                    </div>
                </div>
            `;      
        });
    }

    document.getElementById('totalBayar').innerText = `${formatRupiah(itemsToPay.totalAkhir)}`;


    const containerProdukToPay = document.getElementById('containerProdukToPay') 
        || document.querySelector('.container-produk-toPay')
        || document.querySelector('[data-container="produk-topay"]');
    
    if (containerProdukToPay) {
        containerProdukToPay.innerHTML = content;
    } else {
        console.error('container not found');
    }
}


// jika fungsi diatas tidak bekerja, silahkan gunakan fungsi di bawah ini.
// Ini adalah fungsi alternatif untuk menampilkan produk yang akan dibayar, namun dengan pendekatan yang sedikit berbeda.
// Jika Anda ingin menggunakan fungsi ini, silahkan uncomment dan ganti pemanggilan fungsi displayPrdukToPay dengan displayPrdukToPayDOMMethod

// function displayPrdukToPayDOMMethod() {
//     const itemsToPay = JSON.parse(sessionStorage.getItem('wantToPpay')) || [];
//     console.log('Items to pay:', itemsToPay);
    
//     const containerProdukToPay = document.getElementById('containerProdukToPay') 
//         || document.querySelector('.container-produk-toPay')
//         || document.querySelector('[data-container="produk-topay"]');
    
//     if (!containerProdukToPay) {
//         console.error('Container untuk produk tidak ditemukan');
//         return;
//     }

//     containerProdukToPay.innerHTML = '';

//     if (itemsToPay.length === 0) {
//         const emptyMessage = document.createElement('p');
//         emptyMessage.textContent = 'Belum ada produk yang akan dibayar';
//         containerProdukToPay.appendChild(emptyMessage);
//         return;
//     }

//     itemsToPay.forEach(item => {
//         const formattedPrice = typeof item.price === 'string' 
//             ? item.price 
//             : `Rp. ${item.price.toLocaleString('id-ID')}`;
        
//         const variantInfo = item.variant || item.color || 'Tidak ada variant';

//         const produkDiv = document.createElement('div');
//         produkDiv.className = 'produk-toPay';

//         const imageDiv = document.createElement('div');
//         imageDiv.className = 'produk-toPay-image';
        
//         const img = document.createElement('img');
//         img.src = item.image;
//         img.alt = item.name;
//         img.loading = 'lazy';
        
//         imageDiv.appendChild(img);

//         const infoDiv = document.createElement('div');
//         infoDiv.className = 'produk-toPay-info';

//         const title = document.createElement('h3');
//         title.textContent = item.name;

//         const variant = document.createElement('p');
//         variant.textContent = `Variant: ${variantInfo}`;

//         const quantity = document.createElement('p');
//         quantity.textContent = `Quantity: ${item.quantity || 1}`;

//         const price = document.createElement('span');
//         price.className = 'produk-toPay-price';
//         price.textContent = formattedPrice;

//         infoDiv.appendChild(title);
//         infoDiv.appendChild(variant);
//         infoDiv.appendChild(quantity);
//         infoDiv.appendChild(price);

//         produkDiv.appendChild(imageDiv);
//         produkDiv.appendChild(infoDiv);

//         containerProdukToPay.appendChild(produkDiv);
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    displayPrdukToPay();
});

let chosenMethod = "";

document.querySelectorAll('.method').forEach(method => {
    method.addEventListener('click', () => {
        chosenMethod = selectPaymentMethod(method.id);
        document.getElementById('paymentMethod').innerText = chosenMethod || '';
    });
});



// Region Checkout Logic
function selectPaymentMethod(method) {
    const paymentMethods = document.querySelectorAll('.method');
    paymentMethods.forEach(m => m.classList.remove('selected'));
    
    let selectedMethod = ""; 

    const domMethod = document.getElementById(method);
    if (domMethod) {
        domMethod.classList.add('selected');
        selectedMethod = domMethod.getAttribute('data-method') || method;
    }

    return selectedMethod;
}

function checkOut() {

    //Validasi info user
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    if (!name || !phone || !address) {
       showAlert('Harap lengkapi semua informasi sebelum melanjutkan pembayaran.', 'error');
        return;
    }

    if (name.length < 3) {
        alert('Nama harus terdiri dari minimal 3 karakter.');
        return;
    }

    const regexPhone = /^\+?[0-9]{10,15}$/;
    if (!regexPhone.test(phone)) {
        showAlert('Nomor telepon tidak valid. Harap masukkan nomor telepon yang benar.', 'warning');
        return;
    }

    if (address.length < 10) {
        showAlert('Alamat harus terdiri dari minimal 10 karakter.', 'warning');
        return;
    }

    if (chosenMethod === "") {
        showAlert('Silakan pilih metode pembayaran sebelum melanjutkan.', 'warning');
        return;
        
    }

    if (chosenMethod === "Cash on Delivery (COD)") {

        const transactionData = {
            nama_pembeli : name,
            no_telepon : phone,
            alamat : address,
            catatan : document.getElementById('details').value.trim() || '-',
            metode_pembayaran : chosenMethod,
            produk : JSON.parse(sessionStorage.getItem('wantToPay')),
        }

        console.log('Data transaksi:', transactionData);

        // Ambil transaksi lama (kalau belum ada, buat array kosong)
let allTransactions = JSON.parse(localStorage.getItem('TransactionData')) || [];

// Tambahkan transaksi baru
allTransactions.push(transactionData);

// Simpan kembali ke localStorage
localStorage.setItem('TransactionData', JSON.stringify(allTransactions));


        //Simpan data transaksi ke LocalStorage

        showAlert('Pesanan Anda akan segera diproses. Silahkan Cek halaman riwayat pembelian untuk informasi lebih lanjut.', 'success');
    }
}


function setTransaction(){

}