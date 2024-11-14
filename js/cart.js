document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    const cardCart = document.getElementById("mainContainer")

    const cartItemsContainer = document.createElement("div")

    cart.forEach(item => {
        const itemHTML = `
            <div class="item-container">
                <div class="left">
                    <div class="item-img"><img src="${item.imageUrl}" alt="${item.name}" class="item-img" style="width:100px; height:100px"></div>
                    <div class="item-name"><h3>${item.name}</h3></div>
                </div>
                <div class="item-quantity">
                    <label for="item-quantity">Quantidade:</label>
                    <input id="quantity" class="item-quantity" type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">
                </div>
                <div class="item-price">
                    <label for="item-price">Valor unitário:</label>
                    <h3>R$ ${item.price.toFixed(2)}</h3>
                </div>
                <div class="item-delete">
                    <button class="item-delete-btn" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i> Remover</button>
                </div>

            </div>`

        cartItemsContainer.innerHTML += itemHTML
        total += item.price * item.quantity
    });


    const firstPartConteiner =
        `<div class="form-container">
            <button  onclick="fecharModal()"><i class="fa-solid fa-trash"></i> FECHAR</button>
            <h2>Carrinho</h2>
            <hr class="hr" />`

    const secondtPartConteiner =
        `<hr class="hr" />
            <h2 class="totalTxt">Total: <span id="cart-total">R$ ${total.toFixed(2)}</span></h2>
            <a><button id="button" class="btn btn-success w-100">Finalizar Pedido</button></a>
            <div id="status"></div>
        </div>`

    cardCart.innerHTML += firstPartConteiner + cartItemsContainer.outerHTML + secondtPartConteiner

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function updateCartTotal() {
        let total = 0;
        let itemContainers = document.querySelectorAll('.item-container');

        itemContainers.forEach(item => {
            let quantityInput = item.querySelector('.item-quantity input');
            let priceElement = item.querySelector('.item-price h3');

            let quantity = parseInt(quantityInput.value); 
            let priceText = priceElement.textContent; 

            let price = parseFloat(priceText.replace('R$', '').replace(',', '').trim());

            let itemTotal = price * quantity;

            total += itemTotal;
        });

        document.getElementById("cart-total").textContent = formatPrice(total);
    }


    let quantityInputs = document.querySelectorAll('.item-quantity input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', updateCartTotal);
    });

    updateCartTotal();

})

function updateQuantity(id, newQuantity) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const item = cart.find(product => product.id === id);
    item.quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter(product => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload()
}