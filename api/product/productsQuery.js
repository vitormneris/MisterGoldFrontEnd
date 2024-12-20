const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('name').trim();

if (productName == null || productName == "") window.location.href = "/index.html"

const title = document.getElementById("title")
const sp = document.createElement("span")
sp.style.color = "#facc15"
sp.innerText += " " + productName
title.appendChild(sp)

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 0
    const pageSize = 3

    fetchData();

    document.querySelector(".pagination").addEventListener("click", handlePaginationClick);

    function fetchData() {
        fetch(`http://18.227.48.211:8081/produtos?page=${currentPage}&pageSize=${pageSize}&isActive=true&name=` + productName, {
            method: "GET"
        })
        .then(response => {
            if (response.status === 200) return response.json();
        })
        .then(data => {
            if (data && data.content) {
                showData(data);
                updatePagination(data.totalPages || 1);
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
        divContainer.innerHTML = ""

        const h1 = document.getElementById("status")

        if (data.content.length == 0) {
            h1.style.color = "red"
            h1.innerText =  "Não foi encontrado resultados para esta pesquisa!"
        } else {
            document.getElementById("divStatus").style.display = "none"
        }

        data.content.forEach(contents => {
            const cardProducts = `
                <div class="col-lg-4 col-md-12 mb-6 mb-lg-3">
                    <div class="card">

                        <div onclick="redirectToProductPage('${contents.id}')" class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                            <img src="${contents.imageUrl}" class="img-fluid" style="width:400px; heigth:400px"> 
                        </div>

                        <div class="card-body">

                            <h5 class="card-title">${contents.name}</h5>

                            <div class="category_line_alt"></div>

                            <p class="card-text product-price-cash"> R$ ${contents.price.toFixed(2)} à vista </p>

                            <p class="card-text product-price-card"> 10 x R$ ${(contents.price / 10).toFixed(2)} no cartão </p>

                            <a href="#!" class="btn btn-primary" onclick="addToCart('${contents.id}', '${contents.name}', '${contents.price}', '${contents.imageUrl}')"><i class="fa-solid fa-cart-shopping"></i>+</a>

                        </div>
                    </div>
                </div>`

            divContainer.innerHTML += cardProducts
        })
    }

    function updatePagination(totalPages) {
        const pagination = document.querySelector(".pagination");
        pagination.innerHTML = `
            <li class="page-item ${currentPage === 0 ? 'disabled' : ''}">
                <a class="page-link" href="#" aria-label="Previous" data-page="prev">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`;
        
        for (let i = 0; i < totalPages; i++) {
            pagination.innerHTML += `
                <li class="page-item ${currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i + 1}</a>
                </li>`;
        }

        pagination.innerHTML += `
            <li class="page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" aria-label="Next" data-page="next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>`;
    }

    function handlePaginationClick(event) {
        event.preventDefault();
        const page = event.target.getAttribute("data-page");
        
        if (page === "prev" && currentPage > 0) {
            currentPage--;
        } else if (page === "next" && currentPage < document.querySelectorAll(".pagination .page-item").length - 3) {
            currentPage++;
        } else if (!isNaN(page)) {
            currentPage = parseInt(page);
        }

        fetchData();
    }
})


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
        location.reload()
    }