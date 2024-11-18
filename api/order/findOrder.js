import { validationClient } from "../validationClient.js"

const token = localStorage.getItem("token")

validationClient(token).then(id => {
    fetch('http://18.227.48.211:8081/clientes/' + id + '/id', {
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
    const h1 = document.getElementById("status")

    if (client.order.length == 0) {
        h1.style.color = "red"
        h1.innerText =  "Nenhum pedido foi feito ainda!"
    } else {
        document.getElementById("divStatus").style.display = "none"
    }

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
                <h3 class="confirmTxt">Por favor, confirme os itens de seu pedido antes de concluir a compra:</h3>
                <hr class="hr" />
                <div class="orderContainer">`
         
        const date = new Date(order.moment);

        const formattedDate = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    
        const secondPartConteiner = `

                <label class="form-label" for="totalPrice">Total do pedido</label>
                <input type="number" id="totalPrice" value="${order.totalPrice.toFixed(2)}" class="inputClass form-control-lg" disabled>
                <label class="form-label" for="moment">Momento</label>
                <input type="text" id="moment" value="${formattedDate}" class="inputClass form-control-lg" disabled>
                <label class="form-label" for="message">Status do pedido</label>
                <input type="text" id="message" value="${order.orderMessage}" class="inputClass form-control-lg" disabled>

                </div>
                <div class="buttonDiv">
                <button class="btn btn-success w-50">Confirmar compra</button>
                </div>
            </div>`
    
        mainConteiner.innerHTML += firstPartConteiner + divConteiner.outerHTML + secondPartConteiner
    })
   
}
