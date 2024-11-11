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
    console.log(data)
    
    const tdName = document.getElementById("name")
    tdName.innerText = data.name

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
