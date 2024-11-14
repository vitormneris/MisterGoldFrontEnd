const urlParams = new URLSearchParams(window.location.search);
const clientEmail = urlParams.get('email');

document.getElementById("button").addEventListener("click", function(e) {
    e.preventDefault()

    const code = document.getElementById("code").value
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value


    if (password1 === password2) {
        recovery = {
            "code": code,
            "password": password1
        }
    
        fetch('http://localhost:8084/clientes/' + clientEmail + '/recuperacao/codigo', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(recovery)
        })
        .then(response => {        
            if (response.status == 200) {
                showData("Senha trocada com sucesso!", "green")
            } else {
                response.json().then(error => {
                    showData(error.message, "red")
                })
            }
        })
        .catch(error => {
            console.log(error)
        });
        
    } else [
        showData("As senha digitadas não são iguais", "red")

    ]


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

