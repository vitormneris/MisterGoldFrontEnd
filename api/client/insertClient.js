document.getElementById("button").addEventListener("click", function (event) {
    event.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password_first = document.getElementById("password_first").value
    const password_second = document.getElementById("password_second").value
    const phone = document.getElementById("phone").value
    const state = document.getElementById("state").value
    const city = document.getElementById("city").value
    const neighborhood = document.getElementById("neighborhood").value
    const street = document.getElementById("street").value
    const postalCode = document.getElementById("postalCode").value
    const number = document.getElementById("number").value
    const complement = document.getElementById("complement").value


    client = {
        "name": name,
        "email": email,
        "password": password_first,
        "phone": phone,
        "address": {
            "state": state,
            "city": city,
            "neighborhood": neighborhood,
            "street": street,
            "postalCode": postalCode,
            "number": number,
            "complement": complement
        }
    }

    if (password_first == password_second) {

        fetch('http://localhost:8084/clientes/salvar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
            .then(response => {
                return [response.json(), response.status]
            })
            .then(data => {

                if (data[1] == 201) {
                    showData("Criado com sucesso!", "green")
                } if (data[1] == 403) {
                    showData("Não autorizado", "red")
                } else {
                    data[0].then(error => {
                        console.log(error)
                        let name_fields = []
                        error.fields.forEach(field => {
                            name_fields.push(" " + field.description)
                        });

                        showData(error.message + name_fields + ".", "red")

                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        } else showData("As senhas digitadas não são iguais", "red")

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