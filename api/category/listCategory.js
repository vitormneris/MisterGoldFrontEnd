import { validationAdm } from "../validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {

    fetch('http://localhost:8084/categorias?page=0&pageSize=10&isActive=true', {
        headers: {
            "Content-Type": "application/json",
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
    
            const cardClients = `
                            <tr>
                            <td>${contents.name}</td>
                            <td>${contents.imageUrl}</td>   
                            <td><a onclick="redirectToProductPage('${contents.id}')" class="btn btn-primary">Editar</a></td>                         
                            </tr>`
    
            divConteiner.innerHTML += cardClients
        })
    }
}).catch(error => {
    console.log(error)
})


