
document.addEventListener("DOMContentLoaded", function () {

    fetch('http://localhost:8084/categorias?page=0&pageSize=10&isActive=true', {
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
        const divConteiner = document.getElementById("containerCategories")

        data.content.forEach(contents => {

            const cardCategories = `
            <div class="category" onclick="redirectToProductPage('${contents.id}')">
                <img src="/images/anel.jpg" class="category-img-top" alt="Sunset Over the Sea"/>
                <div class="category-body">
                    <p class="category-text">${contents.name}</p>
                    <div class="category_line" align="center">
                </div>
            </div>`

            divConteiner.innerHTML += cardCategories
        })
    }
})