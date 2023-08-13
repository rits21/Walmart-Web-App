
document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.products');
    let searchInput = document.getElementById('searchInput');
    let searchButton = document.getElementById('searchButton');
    let originalProducts = [];

    async function fetchProducts(url) {
        try {
            let data = await fetch(url);
            let response = await data.json();

            originalProducts = response; // Store original products

            displayProducts(originalProducts);
        } catch (err) {
            console.log(err);
        }
    }

    function displayProducts(productArray) {
        products.innerHTML = '';

        for (let i = 0; i < productArray.length; i++) {
            let description = productArray[i].description;
            let title = productArray[i].title;
            products.innerHTML += `
            <div class="product">
                <img src="${productArray[i].image}" alt="${productArray[i].category}" class="product-img">
                <div class="product-content">
                    <h2 class="product-title">${title.length > 18 ? title.substring(0, 18).concat(' ...') : title}</h2>
                    <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ...more') : description}</p>
                    <div class="product-price-container">
                        <h3 class="product-price">$${productArray[i].price}</h3>
                        <a href="#!" data-productId="${productArray[i].id}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                    </div>
                </div>
            </div>`;
        }
    }

    function filterProducts(query, productArray) {
        return productArray.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    function displayFilteredProducts(query) {
        products.innerHTML = ''; // Clear existing products

        let filteredProducts = filterProducts(query, originalProducts);

        if (filteredProducts.length === 0) {
            products.innerHTML = '<p>No matching products found.</p>';
        } else {
            displayProducts(filteredProducts); // Display filtered products
        }
    }

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value;
        displayFilteredProducts(searchTerm);
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const searchTerm = searchInput.value;
            displayFilteredProducts(searchTerm);
        }
    });
  
    fetchProducts('https://fakestoreapi.com/products');

});
