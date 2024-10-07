document.addEventListener('DOMContentLoaded', function() {
    const containerProducts = document.getElementById('card-container');
    const containerCategories = document.getElementById('categories_container');
    const cardProducts = `
        <div class="col-lg-4 col-md-12 mb-6 mb-lg-3">
            <div class="card">
                <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                    <img src="/images/anel.jpg" class="img-fluid" /> 
                    <a href="#!">
                        <div class="mask degrade"></div>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and make
                        up the bulk of the card's content.
                    </p>
                    <a href="#!" class="btn btn-primary">Button</a>
                </div>
            </div>
        </div>
    `;

    const cardCategories = ` 
                <div class="category"><a href="https://youtu.be/xvFZjo5PgG0">
                    <img src="/images/anel.jpg" class="category-img-top" alt="Sunset Over the Sea"/>
                    <div class="category-body">
                      <p class="category-text">Anéis</p>
                      <div class="category_line" align="center"></a></div>
              `;

    // Número de colunas que você deseja replicar
    const numberOfProducts = 9;
    const numberOfCategories = 6;

    for (let i = 0; i < numberOfProducts; i++) {
        containerProducts.insertAdjacentHTML('beforeend', cardProducts);
    }
    for (let i = 0; i < numberOfCategories; i++) {
        containerCategories.insertAdjacentHTML('beforeend', cardCategories);
    }
});