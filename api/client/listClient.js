import { validationAdm } from "../validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {
    fetch('http://localhost:8084/clientes?page=0&pageSize=10&isActive=true', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        method: "GET"
        
    }).then(
        response => {
            if (response.status === 200) return response.json()
    }).then(data => {
        showData(data)
    }).catch(error => {
        console.log(error)
    })

    function showData(data) {
        const divConteiner = document.getElementById("container")

        data.content.forEach(contents => {

            const cardClients = `
                            <tr>
                            <td>${contents.name}</td>
                            <td>${contents.email}</td>
                            <td>${contents.phone}</td>
                            <td>${contents.address.state}/${contents.address.city}</td>
                            </tr>`

            divConteiner.innerHTML += cardClients
        })
    }
}).catch(error => {
    console.log(error)
})