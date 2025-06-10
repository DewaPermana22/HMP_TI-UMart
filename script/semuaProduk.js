document.addEventListener("DOMContentLoaded", function () {
  renderAllProduks();
})

const searchInput = document.getElementById("search");
   const sortSelect = document.getElementById("sort-product-select");
   if (searchInput) {
     searchInput.addEventListener("keypress", function (e) {
       if (e.key === "Enter") {
         const query = searchInput.value;
         searchProducts(query);
       }
     });
   }

   if (sortSelect) {
     sortSelect.addEventListener("change", function () {
       const sortBy = sortSelect.value;
       sortProducts(sortBy);
     });
   }