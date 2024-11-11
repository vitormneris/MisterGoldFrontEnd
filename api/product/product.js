const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch('http://localhost:8084/produtos/' + productId + '/id', {
    headers: {
        "Content-Type": "application/json"
    },
    method: 'GET'
})
.then(response => {
    if (response.ok) {
        return response.json()
    }
})
.then(data => {
    showData(data)
})
.catch(error => {
    console.log(error)
});


function showData(data) {
    const div = document.getElementById("p-container");
    
    const card = 
    `<div class="p-image">
    <img id="image" src="${data.imageUrl}" class="img-fluid" style="width: 600px; height: 400px;" />
  </div>

  <div class="p-details">
    <h5 class="p-title" id="name">${data.name}</h5>
    <p class="p-cash" id="price">${data.price}</p>
    <p class="p-card" id="price_card">${data.price/10}</p>
    <h5 class="p-info" id="description">Detalhes do produto</h5>
    <h4 class="p-info" id="description">${data.description}</h4>
    <div class="p-info-container">
      <p class="p-material" id="material"><label for="p-material"> <b>Material: ${data.material}</b></label></p>
      <p class="p-size" id="size"><label for="p-size"> <b>Tamanho: ${data.size}</b></label></p>
      <p class="p-weight" id="weight"><label for="p-weight"> <b>Peso: ${data.weight}</b></label></p>
      <p class="p-color" id="color"><label for="p-color"> <b>Cor: ${data.color}</b></label></p>
      <p class="p-quantity" id="quantity"><label for="p-quantity"> <b>Quantidade: ${data.quantity}</b></label></p>
    </div>
   
      <a class="btn btn-primary" onclick="addToCart('${data.id}', '${data.name}', '${data.price}', '${data.imageUrl}')"><i class="fa-solid fa-cart-shopping"></i>Adicionar ao Carrinho</a>
  </div>
`
div.innerHTML += card
    console.log(data)
    
    const tdName = document.getElementById("name")
    tdName.innerText = data.name
        
    const tdImage = document.getElementById("image")
    tdImage.src = data.imageUrl

    const tdPrice = document.getElementById("price")
    tdPrice.innerText = "R$ " + data.price + " à vista"

    const tdState = document.getElementById("price_card")
    tdState.innerText = "R$ " +  data.price / 10 + "  no cartão"

    const tdDetails = document.getElementById("description")
    tdDetails.innerText += "\n" + data.description

    const tdMaterial = document.getElementById("material")
    tdMaterial.innerText += " " + data.material

    const tdSize = document.getElementById("size")
    tdSize.innerText += " " + data.size

    const tdWeight = document.getElementById("weight")
    tdWeight.innerText += " " + data.weight

    const tdColor = document.getElementById("color")
    tdColor.innerText += " " + data.color

    const tdQuantity = document.getElementById("quantity")
    tdQuantity.innerText += " " + data.quantity
}

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
