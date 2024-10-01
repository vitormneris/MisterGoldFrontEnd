document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('card-container');
    const cardHTML = `
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

    // Número de colunas que você deseja replicar
    const numberOfCards = 9;

    for (let i = 0; i < numberOfCards; i++) {
        container.insertAdjacentHTML('beforeend', cardHTML);
    }
});