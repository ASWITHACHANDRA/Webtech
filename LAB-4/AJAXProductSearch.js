const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const messageDiv = document.getElementById("message");

let debounceTimer;

// Debounce function
searchInput.addEventListener("input", function () {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        searchProducts(searchInput.value.trim());
    }, 500);  // 500ms delay
});

function searchProducts(query) {

    if (query === "") {
        resultsDiv.innerHTML = "";
        messageDiv.innerText = "";
        return;
    }

    fetch("products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            return response.json();
        })
        .then(data => {

            const filtered = data.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );

            displayResults(filtered);
        })
        .catch(error => {
            resultsDiv.innerHTML = "";
            messageDiv.innerText = "Error loading products!";
        });
}

function displayResults(products) {

    resultsDiv.innerHTML = "";

    if (products.length === 0) {
        messageDiv.innerText = "No results found";
        return;
    }

    messageDiv.innerText = "";

    products.forEach(product => {
        resultsDiv.innerHTML += `
            <div class="product">
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Price:</strong> ₹${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
            </div>
        `;
    });
}
