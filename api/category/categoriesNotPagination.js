document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault()

    fetch('http://3.138.179.81:8084/categorias?page=0&pageSize=10&isActive=true', {
        method: "GET"
    })
    .then(response => {
        if (response.status === 200) 
            return response.json();
    })
    .then(data => {
        if (data) {
            showData(data);
        } 
    })
    .catch(error => {
        console.log(error);
    });
    
    
    function showData(data) {
        const divContainer = document.getElementById("containerCategories");
        divContainer.innerHTML = ""
    

        const h1 = document.getElementById("status1")

        if (data.content.length == 0) {
            h1.style.color = "red"
            h1.innerText =  "Não há categorias cadastradas!"
        } else {
            document.getElementById("divStatus1").style.display = "none"
        }

        data.content.forEach(contents => {
            const cardCategories = `
                <div class="category" onclick="redirectToCategoryPage('${contents.id}')">
                    <img src="${contents.imageUrl}" class="category-img-top" alt="${contents.name}" />
                    <div class="category-body">
                        <p class="category-text">${contents.name}</p>
                        <div class="category_line" align="center"></div>
                    </div>
                </div>`;
            divContainer.innerHTML += cardCategories;
        })
    }
})


