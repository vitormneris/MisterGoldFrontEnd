import { validationAdm } from "../validationAdm.js"

const token = localStorage.getItem("token")

validationAdm(token).then(id => {

    document.getElementById("buttonUpdate").addEventListener("click", function(event) {
        event.preventDefault()

        const name = document.getElementById("name").value
        const email = document.getElementById("email").value

        let administrator = {
            "name": name,
            "email": email,
            "password": "no_password"        
        }

        fetch('http://localhost:8084/administradores/' + id + '/atualizar', {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            method: "PUT",
            body: JSON.stringify(administrator)
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