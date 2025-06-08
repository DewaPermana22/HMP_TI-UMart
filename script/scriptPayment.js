const containerProdukToPay = document.getElementById("toPayProduct");
const ovrlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");
let chosenMethod = "";

document.addEventListener("DOMContentLoaded", () => {
  displayPrdukToPay();

  document.querySelectorAll(".method").forEach((method) => {
    method.addEventListener("click", () => {
      chosenMethod = selectPaymentMethod(method.id);
      document.getElementById("paymentMethod").innerText = chosenMethod || "";
    });
  });
});

function displayPrdukToPay() {
  const itemsToPay = JSON.parse(sessionStorage.getItem("wantToPay")) || {};
  let content = "";

  if (itemsToPay.items?.length === 0) {
    content = "<p>Belum ada produk yang akan dibayar</p>";
  } else {
    itemsToPay.items?.forEach((item) => {
      const variantInfo = item.variant || item.color || "Tidak ada variant";
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

  document.getElementById("totalBayar").innerText = `${formatRupiah(
    itemsToPay.totalAkhir
  )}`;

  const container =
    document.getElementById("containerProdukToPay") ||
    document.querySelector(".container-produk-toPay") ||
    document.querySelector('[data-container="produk-topay"]');

  if (container) {
    container.innerHTML = content;
  } else {
    console.error("container not found");
  }
}

function selectPaymentMethod(method) {
  const paymentMethods = document.querySelectorAll(".method");
  paymentMethods.forEach((m) => m.classList.remove("selected"));

  let selectedMethod = "";
  const domMethod = document.getElementById(method);
  if (domMethod) {
    domMethod.classList.add("selected");
    selectedMethod = domMethod.getAttribute("data-method") || method;
  }
  return selectedMethod;
}

function tutupModal() {
  modal.classList.remove("active");
  ovrlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

function saveTransaction(transactionData) {
  try {
    let allTransactions =
      JSON.parse(localStorage.getItem("TransactionData")) || [];
    allTransactions.push(transactionData);
    localStorage.setItem("TransactionData", JSON.stringify(allTransactions));
    return true;
  } catch (error) {
    console.error("Error saving transaction:", error);
    return false;
  }
}

function handleCODPayment() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const details = document.getElementById("details").value.trim() || "-";

  if (!validateUserInput(name, phone, address)) return;

  const transactionData = createTransactionData(
    name,
    phone,
    address,
    "Cash on Delivery (COD)",
    details
  );

  if (saveTransaction(transactionData)) {
    showAlert(
      "Pesanan Anda akan segera diproses. Silahkan Cek halaman riwayat pembelian untuk informasi lebih lanjut.",
      "success"
    );
    sessionStorage.removeItem("wantToPay");
  } else {
    showAlert("Terjadi kesalahan saat menyimpan transaksi.", "error");
  }
}

function handleBankTransferPayment(fileName = null) {
  openModal(
    "Transfer Bank",
    "Silahkan scan kode QR di atas, untuk melakukan pembayaran"
  );
}

function handleEWalletPayment(fileName = null) {
  openModal(
    "E-Wallet (QRIS)",
    "Silahkan scan QRIS di atas, untuk melakukan pembayaran"
  );
}

function openModal(titleModal, infoText) {
  const infoAllert = document.getElementById("info-allert");
  const modalTitle = document.getElementById("modalTitle");
  const buttonUpload = document.getElementById("uploadBukti");
  const saveQr = document.getElementById("saveQr");
  let fileName = "";
  let extFile = "";

  modalTitle.innerText = titleModal || "Konfirmasi Pembayaran";
  infoAllert.innerText =
    infoText ||
    "Silahkan lakukan pembayaran sesuai dengan instruksi berikut ini.";

  buttonUpload.innerText = "Unggah Bukti";
  buttonUpload.disabled = false;
  saveQr.innerText = "Simpan Kode QR";
  saveQr.setAttribute("data-action", "saveQrCode");
  saveQr.disabled = false;

  buttonUpload.addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = function (event) {
      const file = event.target.files[0];
      if (!file) return;

      fileName = file.name;
      extFile = fileName.split(".").pop();

      if (file.size > 5 * 1024 * 1024) {
        showAlert("Ukuran file terlalu besar. Maksimal 5MB.", "error");
        return;
      }

      if (!file.type.startsWith("image/")) {
        showAlert("File harus berupa gambar.", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("prevBuktiTransaksi").src = e.target.result;
        buttonUpload.innerText = "Ubah Bukti";
        saveQr.setAttribute("data-action", "saveTransaction");
        saveQr.innerText = "Simpan Transaksi";
      };
      reader.readAsDataURL(file);
    };
    input.click();
  });

  saveQr.addEventListener("click", async function () {
    const action = this.getAttribute("data-action");
    const hasImage = document.getElementById("prevBuktiTransaksi").src !== "";

    if (action === "saveTransaction") {
      if (!hasImage && chosenMethod !== "Cash on Delivery (COD)") {
        showAlert("Harap unggah bukti pembayaran terlebih dahulu.", "warning");
        return;
      }

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const details = document.getElementById("details").value.trim() || "-";

      if (!validateUserInput(name, phone, address)) return;

      try {
        this.disabled = true;
        this.innerText = "Menyimpan...";

        const transactionData = createTransactionData(
          name,
          phone,
          address,
          chosenMethod,
          details,
          hasImage ? `${fileName.substring(0, 10)}.${extFile}` : null
        );

        if (saveTransaction(transactionData)) {
          const itemToDeleteStr = sessionStorage.getItem("wantToPay");

          if (itemToDeleteStr) {
            try {
              // Parse data wantToPay
              const itemToDelete = JSON.parse(itemToDeleteStr);

              // Ambil cart dari localStorage
              const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

              if (itemToDelete.items && Array.isArray(itemToDelete.items)) {
                itemToDelete.items.forEach((paymentItem) => {
                  const index = cartItems.findIndex(
                    (cartItem) => cartItem.uniqueId === paymentItem.uniqueId
                  );

                  if (index !== -1) {
                    cartItems.splice(index, 1);
                  }
                });

                localStorage.setItem("cart", JSON.stringify(cartItems));
              }

              sessionStorage.removeItem("wantToPay");

              showAlert(
                "Transaksi berhasil disimpan dan item telah dihapus dari keranjang!",
                "success"
              );
              setTimeout(() => {
                window.location.href = "/pages/riwayat_pembelian.html";
              }, 1500);
            } catch (error) {
              console.error("Error parsing wantToPay data:", error);
            }
          } else {
            console.log("Tidak ada data wantToPay yang ditemukan");
          }
        } else {
          console.error("Gagal menyimpan transaksi");
          showAlert("Gagal menyimpan transaksi. Silakan coba lagi.", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        showAlert("Terjadi kesalahan saat menyimpan transaksi.", "error");
      } finally {
        this.disabled = false;
        this.innerText = "Simpan Kode QR";
        this.setAttribute("data-action", "saveQrCode");
      }
    } else {
      await saveQrImage();
    }
  });

  setTimeout(() => {
    modal.classList.add("active");
    ovrlay.classList.add("active");
  }, 10);
}

function createTransactionData(
  name,
  phone,
  address,
  paymentMethod,
  details = "-",
  namaFile = null
) {
  return {
    id: crypto.randomUUID(),
    nama_pembeli: name,
    no_telepon: phone,
    alamat: address,
    catatan: details,
    tanggal: new Date().toISOString(),
    status: "Pending",
    metode_pembayaran: paymentMethod,
    bukti_pembayaran:
      paymentMethod === "Cash on Delivery (COD)" ? "-" : namaFile,
    produk: JSON.parse(sessionStorage.getItem("wantToPay")),
  };
}

function validateUserInput(name, phone, address) {
  if (!name || !phone || !address) {
    showAlert(
      "Harap lengkapi semua informasi sebelum melanjutkan pembayaran.",
      "error"
    );
    return false;
  }

  if (name.length < 3) {
    showAlert("Nama harus terdiri dari minimal 3 karakter.", "error");
    return false;
  }

  const regexPhone = /^\+?[0-9]{10,15}$/;
  if (!regexPhone.test(phone)) {
    showAlert(
      "Nomor telepon tidak valid. Harap masukkan nomor telepon yang benar.",
      "warning"
    );
    return false;
  }

  if (address.length < 10) {
    showAlert("Alamat harus terdiri dari minimal 10 karakter.", "warning");
    return false;
  }

  return true;
}

async function saveQrImage() {
  return new Promise((resolve) => {
    try {
      const qrElement = document.getElementById("prevBuktiTransaksi");
      if (!qrElement || !qrElement.src) {
        resolve(false);
        return;
      }

      qrElement.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = qrElement.naturalWidth || qrElement.width;
        canvas.height = qrElement.naturalHeight || qrElement.height;
        ctx.drawImage(qrElement, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL("image/png", 1.0);
        if (dataURL) {
          const link = document.createElement("a");
          link.download = "kode-qr-pembayaran.png";
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => resolve(true), 500);
        } else {
          resolve(false);
        }
      };

      if (qrElement.complete) {
        qrElement.onload();
      }
    } catch (error) {
      console.error("Error saving QR:", error);
      resolve(false);
    }
  });
}
