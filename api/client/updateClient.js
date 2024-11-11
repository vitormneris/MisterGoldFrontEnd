import { validationClient } from "../validationClient.js"

const token = localStorage.getItem("token")

validationClient(token).then(id => {

    document.getElementById("buttonUpdate").addEventListener("click", function(event) {
        event.preventDefault()

        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const state = document.getElementById("state").value
        const city = document.getElementById("city").value
        const neighborhood = document.getElementById("neighborhood").value
        const street = document.getElementById("street").value
        const postalCode = document.getElementById("postalCode").value
        const number = document.getElementById("number").value
    
        let client = {
            "name": name,
            "email": email,
            "password": "no_password",       
            "phone": phone,
            "address": {
                "state": state,
                "city": city,
                "neighborhood": neighborhood,
                "street": street,
                "postalCode": postalCode,
                "number": number
            }
        }

        fetch('http://localhost:8084/clientes/' + id + '/atualizar', {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            method: "PUT",
            body: JSON.stringify(client)
        })
        .then(response => {
            if (response.status === 200) return response.json()
            return null
        })
        .then(data => {
            if (data) showData("Atualizado com sucesso!", "green")
            else showData("Problema ao atualizar!", "red")
            
        })
        .catch(error => {
            console.log(error)
        })

        function showData(text, cl) {
            const divStatus = document.getElementById("status")

            if (divStatus.querySelector("p")) divStatus.querySelector("p").remove()

            const parag = document.createElement("p")
            parag.textContent = text
            parag.style.color = cl
            parag.style.textAlign = "center"

            divStatus.appendChild(parag)
        }
    })

}).catch(error => {
    console.log(error)
})