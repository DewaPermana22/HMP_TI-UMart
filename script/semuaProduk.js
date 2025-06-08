const searchInput = document.getElementById("search");
   const sortSelect = document.getElementById("sort-product-select");

//    if (searchBtn) {
//      searchBtn.addEventListener("click", function () {
//        const query = searchInput ? searchInput.value : "";
//        searchProducts(query);
//      });
//    }
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