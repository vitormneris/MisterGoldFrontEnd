import { validationClient } from "../validationClient.js"

const token = localStorage.getItem("token")

validationClient(token).then(id => {
    fetch('http://localhost:8084/clientes/' + id + '/id', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
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
}).catch(error => {
    console.log(error)
})

function showData(client) {
    console.log(client)

    let count = 0
    client.order.forEach(order => {
        count++
        const mainConteiner = document.getElementById("container")

        const divConteiner = document.createElement("div")
    
        order.items.forEach(item => {
            const itemHTML = `
                        <div class="item-container">
                            <div class="left">
                                <div class="item-img"><img src="${item.product.imageUrl}" class="item-img" style="width: 100px; height:100px"></div>
                                <div class="item-name"><h3>${item.product.name}</h3></div>
                            </div>
                            <div class="item-quantity">
                                <label for="item-quantity">Quantidade:</label>
                                <span id="quantity" class="item-quantity")">${item.quantity}</span>
                            </div>
                            <div class="item-price">
                                <label for="item-price">Valor unitário:</label>
                                <h3>R$ ${item.price.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>`
            divConteiner.innerHTML += itemHTML;
        })
    
        const firstPartConteiner = `
            <div class="form-container">
                <h2>Pedido ${count}</h2>
                <hr class="hr" />
                <h3 class="confirmTxt">Por favor, confirme os itens de seu pedido antes de concluir a compra:</h3>`
    
    
        const secondPartConteiner = `
                <hr class="hr" />
                <h2 class="totalTxt">Total do pedido: <span id="totalPrice">${order.totalPrice}</span></h2>
                <h2 class="totalTxt">Momento: <span id="moment">${order.moment}</span></h2>
                <h2 class="totalTxt">Status do pedido: <span id="orderStatus">${order.orderStatus}</span></h2>
    
                <a href="/html/order.html"><button class="btn btn-success w-100">Confirmar compra</button></a>
            </div>`
    
        mainConteiner.innerHTML += firstPartConteiner + divConteiner.outerHTML + secondPartConteiner
    })
   
}
