// Ini Javascript Untuk Page Keranjang

const buttonPilih = document.querySelector(".btn-pilih");
const containerActionButton = document.querySelector(".container-action-button");
const buttonBatal = document.getElementById("button-batal");


buttonPilih.addEventListener("click", () => {
    buttonPilih.classList.remove("active");
    containerActionButton.classList.add("active");
})

buttonBatal.addEventListener("click", () => {
    buttonPilih.classList.add("active");
    containerActionButton.classList.remove("active");
})