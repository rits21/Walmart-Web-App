document.addEventListener("DOMContentLoaded", function () {
    const productList = document.querySelector('.product-list');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const products = [
        { id: 1, name: "Women's Floral Dress", price: "$49.99", image: "product1.jpg" },
        { id: 2, name: "Men's Casual Shirt", price: "$29.99", image: "product2.jpg" },
        { id: 3, name: "Teenage Girls Wear", price: "$54.99", image: "product3.jpg" },
        { id: 4, name: "Teenage Boys Weart", price: "$39.99", image: "product4.jpg" }
        // Add more products as needed
    ];

    // Display initial product list
    displayProducts(products);

    // Add event listener to the search button
    searchButton.addEventListener("click", handleSearch);

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        displayProducts(filteredProducts);
    }

    function displayProducts(products) {
        productList.innerHTML = "";

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.productId = product.id;
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;
            productList.appendChild(productCard);
        });
    }
});