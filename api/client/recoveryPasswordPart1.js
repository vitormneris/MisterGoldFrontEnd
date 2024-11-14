
document.getElementById("button").addEventListener("click", function(e) {
    e.preventDefault()

    const email = document.getElementById("email").value

    showData("Aguade enquanto fazemos o envio!", "yellow")
    fetch('http://localhost:8084/clientes/' + email + '/recuperacao', {
        method: 'GET'
    })
    .then(response => {
        return [ response.json(), response.status ]
    })
    .then(data => {        

        if (data[1] == 200) {
            window.location.href = "/html/setPasswordPart2.html?email=" + email
        } else {
            data[0].then(error => showData(error.message, "red"))
        }
    })
    .catch(error => {
        console.log(error)
    });
    

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

