document.getElementById("button").addEventListener("click", function(event) {
    event.preventDefault()

    const login = document.getElementById("email").value
    const password = document.getElementById("password").value

    userAuth = {
        "email": login,
        "password": password
    }

    console.log(userAuth)

    fetch('http://localhost:8084/autorizacao/login', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userAuth)
    })
    .then(response => {
        if (response.status === 200) {
            return response.json()
        }
        return null
    })
    .then(data => {
        if (data) {
            localStorage.setItem("token", data.token)
            showData("Login sucessido", "green")
        } else {
            showData("E-mail ou senha não encontrados!", "red")
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