document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 0; // Página inicial
    const pageSize = 9; // Número de itens por página

    fetchData();

    document.querySelector(".pagination").addEventListener("click", handlePaginationClick);

    function fetchData() {
        fetch(`http://localhost:8084/produtos?page=${currentPage}&pageSize=${pageSize}&isActive=true`, {
            method: "GET"
        })
        .then(response => {
            if (response.status === 200) return response.json();
        })
        .then(data => {
            if (data && data.content) {
                showData(data);
                updatePagination(data.totalPages || 1); // Atualiza a paginação
            } else {
                console.log("Nenhum dado encontrado.");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function showData(data) {
        const divContainer = document.getElementById("containerProducts");
        divContainer.innerHTML = ""; // Limpa os dados anteriores

        data.content.forEach(contents => {
            const cardProducts = `
                    <div class="col-lg-4 col-md-12 mb-6 mb-lg-3">
                        <div class="card">

                            <div onclick="redirectToProductPage('${contents.id}')" class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                                <img src="${contents.imageUrl}" class="img-fluid"> 
                            </div>

                            <div class="card-body">

                                <h5 class="card-title">${contents.name}</h5>

                                <div class="category_line_alt"></div>

                                <p class="card-text product-price-cash"> R$ ${contents.price} à vista </p>

                                <p class="card-text product-price-card"> 10 x R$ ${contents.price / 10} no cartão </p>

                                <a href="#!" class="btn btn-primary" onclick="addToCart('${contents.id}', '${contents.name}', '${contents.price}', '${contents.imageUrl}')"><i class="fa-solid fa-cart-shopping"></i>+</a>

                            </div>
                        </div>
                    </div>`

            divContainer.innerHTML += cardProducts
        })
    }
});

function addToCart(id, name, price, imageUrl) {
    const product = {
        id: id,
        name: name,
        price: parseFloat(price),
        imageUrl: imageUrl,
        quantity: 1 // sempre será 1 inicialmente
    };

    // Verifica se já existe algum produto no carrinho
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Adiciona o produto ao carrinho
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Produto adicionado ao carrinho!");
}
