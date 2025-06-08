const ovrlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");

function renderTransaction(transaction) {
  return `
        <tr class="tableRow" data-id="${transaction.id}">
            <td>${transaction.nama_pembeli}</td>
            <td>${transaction.alamat.substring(0, 10) + "..."}</td>
            <td>${transaction.no_telepon}</td>
            <td>${
              transaction.catatan != "-"
                ? transaction.catatan.substring(0, 10) + "..."
                : "-"
            }</td>
            <td>${formatTanggal(transaction.tanggal)}</td>
            <td>${transaction.metode_pembayaran}</td>
            <td>
            ${
              transaction.metode_pembayaran === "Cash on Delivery (COD)"
                ? `<span>-</span>`
                : `<div class="upload-container">
                    <span class="file-name">${transaction.bukti_pembayaran}</span>
                </div>`
            }
            </td>
            ${
              transaction.status === "Pending"
                ? `<td>
                <span class="status status-pending">
                  <span class="status-dot"></span>
                  Menunggu
                </span>
              </td>`
                : transaction.status === "Diterima"
                ? `<td>
                <span class="status status-success">
                  <span class="status-dot"></span>
                  Diterima
                </span>
              </td>`
                : `<td>
                <span class="status status-cancelled">
                  <span class="status-dot"></span>
                  Dibatalkan
                </span>
              </td>`
            }
              
        </tr>`;
}

function loadTransactions() {
  const transactionTableBody = document.getElementById("tableBody");
  const transactions =
    JSON.parse(localStorage.getItem("TransactionData")) || [];

  if (transactions.length === 0) {
    transactionTableBody.innerHTML =
      "<tr><td colspan='8'>Tidak ada transaksi</td></tr>";
    return;
  }

  transactionTableBody.innerHTML = transactions.map(renderTransaction).join("");
  handleRowClick();
}

document.addEventListener("DOMContentLoaded", function () {
  loadTransactions();
});

function handleRowClick() {
  document.querySelectorAll(".tableRow").forEach((row) => {
    row.addEventListener("click", () => {
      const transactionId = row.getAttribute("data-id");
      const transactions =
        JSON.parse(localStorage.getItem("TransactionData")) || [];

      const transactionDetail = transactions.find((t) => t.id == transactionId);

      if (transactionDetail) {
        openDetailModal(transactionDetail);
      } else {
        console.error("Transaction not found!");
        alert("Data transaksi tidak ditemukan!");
      }
    });
  });
}

function openDetailModal(transaction) {
  modal.classList.add("active");
  ovrlay.classList.add("active");
  document.body.style.overflow = "hidden";

  const produkList =
    transaction.produk.items && Array.isArray(transaction.produk.items)
      ? transaction.produk.items
      : [];

  modal.innerHTML = `
     <div class="modal-header">
      <h3 class="modal-title">Detail Transaksi</h3>
      <button class="modal-close" onclick="tutupModal()">
        x
      </button>
    </div>

    <div class="modal-content">
      <div class="wrapper-info">
        <div class="nama-dan-noHp">
          <div class="nama">
            <label for="nama">Nama Pembeli</label>
            <input disabled="true" id="nama" type="text" value="${
              transaction.nama_pembeli || ""
            }">
          </div>
          <div class="noHp">
            <label for="noHp">No Telepon</label>
            <input disabled="true" id="noHp" type="text" value="${
              transaction.no_telepon || ""
            }">
          </div>
        </div>
                <div class="alamat-dan-detail">
          <div class="alamat">
            <label for="alamat">Alamat</label>
            <textarea disabled="true" id="alamat" rows="4">${
              transaction.alamat || ""
            }</textarea>
          </div>
          <div class="detail">
            <label for="detail">Catatan</label>
            <textarea disabled="true" id="detail" rows="4">${
              transaction.catatan || ""
            }</textarea>
          </div>
        </div>

                <div class="transaction-info">
          <div class="info-item">
            <label>Tanggal Transaksi:</label>
            <span>${formatTanggal(transaction.tanggal)}</span>
          </div>
        </div>
      </div>

    <div class="container-list-produk">
      <h4>Daftar Produk:</h4>
      ${
        produkList.length > 0
          ? produkList
              .map(
                (item) => `
          <div class="produk-toPay">
          <div class="produk-toPay-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="produk-toPay-info">
            <h3>${item.name}</h3>
            <div class="cart-item-tags">
              <div class="tag">varian : ${
                item.variant ? item.variant : item.color
              }</div>
              <div class="tag">Jumlah : ${item.quantity}</div>
            </div>
            <span class="produk-toPay-price">${item.price}</span>
          </div>
        </div>
        `
              )
              .join("")
          : "<p>Tidak ada produk</p>"
      }
    </div>
    <div class="modal-actions">
    ${
      transaction.status === "Pending"
      ? `
        <button class="btn btn-secondary" onclick="updateStatus('${transaction.id}', 'Dibatalkan')()">Batalkan Pesanan</button>
        <button class="btn btn-primary" onclick="updateStatus('${transaction.id}', 'Diterima')">
          Tandai Selesai
        </button>
      `
          : ""
      }
    </div>
  `;
}

function tutupModal() {
  modal.classList.remove("active");
  ovrlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

function updateStatus(transactionId, newStatus) {
  const transactions =
    JSON.parse(localStorage.getItem("TransactionData")) || [];
  const transactionIndex = transactions.findIndex((t) => t.id == transactionId);
  if (transactionIndex !== -1) {
    transactions[transactionIndex].status = newStatus;
    localStorage.setItem("TransactionData", JSON.stringify(transactions));
    loadTransactions();
    tutupModal();

    showAlert(
      `Status transaksi berhasil diubah menjadi ${newStatus}`,
      "success"
    );
  }
}
