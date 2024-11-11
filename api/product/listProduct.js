import { validationAdm } from "../validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {
    fetch('http://localhost:8084/produtos?page=0&pageSize=10&isActive=true', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        method: "GET"
        
    }).then(
        response => {
            if (response.status === 200) {
                return response.json()
            }
    }).then(data => {
        showData(data)
    }).catch(error => {
        console.log(error)
    })

    function showData(data) {
        const divConteiner = document.getElementById("container")

        data.content.forEach(contents => {

            const cardProducts = `
                            <tr>
                                <td>${contents.name}</td>
                                <td>${contents.price}</td>
                                <td>${contents.description}</td>
                                <td>${contents.material}</td>
                                <td>${contents.size}</td>
                                <td>${contents.weight}</td>
                                <td>${contents.color}</td>
                                <td>${contents.quantity}</td>
                                <td><a onclick="redirectToProductPage('${contents.id}')" class="btn btn-primary"> Editar </a></td>
                            </tr>`

            divConteiner.innerHTML += cardProducts
        })
    }
}).catch(error => {
    console.log(error)
})