document.addEventListener('DOMContentLoaded', function() {
    try {
        const containerProducts = document.getElementById('card-container');
        const cardProducts = `
        <div class="col-lg-4 col-md-12 mb-6 mb-lg-3">
                        <div class="card">

                            <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                              <a href="/html/product.html">
                                <img src="/images/anel.jpg" class="img-fluid"> 
                              
                                </a>
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Anel Pedra Oval Em Ouro 18K Com Esmeralda E Diamante 0,174Ct</h5>
                                <div class="category_line_alt"></div>
                                <p class="card-text product-price-cash">
                                    R$ 11.691,00 à vista
                                </p>
                                <p class="card-text product-price-card">
                                    R$ 12.599,00 no cartão
                                </p>
                                <a href="#!" class="btn btn-primary"><i class="fa-solid fa-cart-shopping"></i>+</a>
                            </div>

                        </div>
                    </div>
    `;
    const numberOfProducts = 9;
    for (let i = 0; i < numberOfProducts; i++) {
        containerProducts.insertAdjacentHTML('beforeend', cardProducts);
    }
    } catch (error) {
        console.log("Não foi encontrado um container para os cards de produtos!")
    }


   try {
    const containerCategories = document.getElementById('categories_container');
    const cardCategories = ` 
                <div class="category"><a href="/html/products.html">
                    <img src="/images/anel.jpg" class="category-img-top" alt="Sunset Over the Sea"/>
                    <div class="category-body">
                      <p class="category-text">Anéis</p>
                      <div class="category_line" align="center"></a></div>
              `;
    const numberOfCategories = 12;

    for (let i = 0; i < numberOfCategories; i++) {
        containerCategories.insertAdjacentHTML('beforeend', cardCategories);
    }
   } catch (error) {
    console.log("Não foi encontrado um container para os cards de categorias!")
   }
   
});