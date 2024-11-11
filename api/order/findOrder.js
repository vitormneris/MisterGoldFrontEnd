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

    const divConteiner = document.getElementById("container")

    client.order.items.forEach(element => {
        const itemHTML = `
        <div class="item-container">
            <div class="left">
                <div class="item-img"><img src="${element.product.imageUrl}" class="item-img"></div>
                <div class="item-name"><h3>${element.product.name}</h3></div>
            </div>
            <div class="item-quantity">
                <label for="item-quantity">Quantidade:</label>
                <span id="quantity" class="item-quantity")">${element.quantity}</span>
            </div>
            <div class="item-price">
                <label for="item-price">Valor unitário:</label>
                <h3>R$ ${element.price.toFixed(2)}</h3>
            </div>
        </div>`;
    
        divConteiner.innerHTML += itemHTML;
    });

    const sp1 = document.getElementById("totalPrice")
    sp1.innerText = client.order.totalPrice

    const sp2 = document.getElementById("moment")
    sp2.innerText = client.order.moment

    const sp3 = document.getElementById("orderStatus")
    sp3.innerText = client.order.orderStatus
}
