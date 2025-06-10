document.addEventListener("DOMContentLoaded", async function () {
    try {
        await ArtikelManager.renderAllArtikel(); 
        document.body.addEventListener('click', function(e) {
            const card = e.target.closest('.artikel-card');
            if (!card) return;
            
            const dataID = card.dataset.id;
            if (!dataID) {
                console.error("Card tidak memiliki data-id!");
                return;
            }
            navigateToDetailArtikel(dataID);
        });
    } catch (error) {
        console.error("Gagal memuat artikel:", error);
    }
});

const searchInput = document.getElementById("search");
   if (searchInput) {
     searchInput.addEventListener("keypress", function (e) {
       if (e.key === "Enter") {
         const query = searchInput.value;
         searchArtikels(query);
       }
     });
   }
