document.getElementById("button").addEventListener("click", function(event) {
    event.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const text = document.getElementById("text").value


    let message = {
        "senderName": name,
        "senderEmail": email,
        "text": text
    }

    fetch('http://18.227.48.211:8081/mensagens/salvar', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        return [ response.json(), response.status ]
    })
    .then(data => {        

        if (data[1] == 201) {
            showData("Mensagem enviada com sucesso!", "green")
        } if (data[1] == 403) {
            showData("Não autorizado", "red")
        } else {
            data[0].then(error => {
                console.log(error)
                let name_fields = []
                error.fields.forEach(field => {
                    name_fields.push(" " +field.description)
                });

                showData(error.message +  name_fields + ".", "red")

            })
        }
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