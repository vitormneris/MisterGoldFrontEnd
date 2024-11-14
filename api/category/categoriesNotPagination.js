document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault()

    fetch('http://localhost:8084/categorias?page=0&pageSize=10&isActive=true', {
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


