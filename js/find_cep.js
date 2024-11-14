function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '')
    if (cep != "") {
        var validacep = /^[0-9]{8}$/
        if (validacep.test(cep)) {
            const street = document.getElementById('street')
            street.value = "..."
            street.focus()
            const neighborhood = document.getElementById('neighborhood')
            neighborhood.value = "..."
            neighborhood.focus()
            const city = document.getElementById('city')
            city.value = "..."
            city.focus()
            const state = document.getElementById('state')
            state.value = "..."
            state.focus()

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch("https://viacep.com.br/ws/" + cep + "/json/", requestOptions)
                .then(response => response.json())
                .then(data => callback(data))
                .catch(error => console.log('error', error))
        }
        else {
            clean_form()
            showData("Formato de CEP inválido", "red")
        }
    }
    else {
        clean_form();
    }
}

function clean_form() {
    document.getElementById('street').value = ("")
    document.getElementById('neighborhood').value = ("")
    document.getElementById('city').value = ("")
    document.getElementById('state').value = ("")
}

function callback(content) {
    if (!("erro" in content)) {
        const street = document.getElementById('street')
        street.value = (content.logradouro)
        street.focus()
        const neighborhood = document.getElementById('neighborhood')
        neighborhood.value = (content.bairro)
        neighborhood.focus()
        const city = document.getElementById('city')
        city.value = (content.localidade)
        city.focus()
        const state = document.getElementById('state')
        state.value = (content.uf)
        state.focus()

        showData("", "green")
    }
    else {
        clean_form();
        showData("CEP não encontrado", "red")
    }
}

function showData(text, cl) {
    const divStatus = document.getElementById("status")

    if (divStatus.querySelector("p")) divStatus.querySelector("p").remove()

    const parag = document.createElement("p")
    parag.textContent = text
    parag.style.color = cl
    parag.style.textAlign = "center"

    divStatus.appendChild(parag)
}

