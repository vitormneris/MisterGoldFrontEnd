import { validationClient } from "../validationClient.js"

const token = localStorage.getItem("token")

validationClient(token).then(id => {
    fetch('http://3.15.223.242:8081/clientes/' + id + '/id', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json()
        } else if (response.status === 404) {
            window.location.href = "/html/login.html"
        } else {
            window.location.href = "/index.html"
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
    if (client == null) window.location.href = "/index.html"

    const tdEmail = document.getElementById("email")
    tdEmail.value = client.email
    tdEmail.focus()

    const tdState = document.getElementById("state")
    tdState.value = client.address.state
    tdState.focus()

    const tdCity = document.getElementById("city")
    tdCity.value = client.address.city
    tdCity.focus()

    const tdPhone = document.getElementById("phone")
    tdPhone.value = client.phone
    tdPhone.focus()

    const tdNeighborhood = document.getElementById("neighborhood")
    tdNeighborhood.value = client.address.neighborhood
    tdNeighborhood.focus()

    const tdStreet = document.getElementById("street")
    tdStreet.value = client.address.street
    tdStreet.focus()

    const tdPostalCode = document.getElementById("postalCode")
    tdPostalCode.value = client.address.postalCode
    tdPostalCode.focus()

    const tdNumber = document.getElementById("number")
    tdNumber.value = client.address.number
    tdNumber.focus()

    const tdComplement = document.getElementById("complement")
    tdComplement.value = client.address.complement
    tdComplement.focus()

    const tdName = document.getElementById("name")
    tdName.value = client.name
    tdName.focus()
}
