document.addEventListener('DOMContentLoaded', function() {
    try {
        const containerSidebar = document.getElementById('sidebar');
        const sidebarContent = ` 
        <div class="sidebar-container">
            <h2>Joias</h2>
            <hr class="hr" />
            <ul>
                <li><a href="/html/categories.html">Todas as categorias</a></li>
                <li><a href="/html/products.html">Todos os produtos</a></li>
                <li><a href="/html/order.html">Ver seus pedidos</a></li>
                <li><a href="/html/contact.html">Entre em contato conosco</a></li>
            </ul>
        </div>
                  `;
                  containerSidebar.insertAdjacentHTML('beforeend', sidebarContent);
    } catch (error) {
        console.log("Não foi possivel carregar a sidebar!")
    }

    
    try {
        const containerNavbar = document.getElementById('navbar');
        const navbarContent = ` 
         <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                <div class="container-fluid justify-content-between">
                    <div class="d-flex">
                        <button class="btn-sidebar" id="btn-toggle-sidebar">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                        <div class="logo">
                            <a class="navbar-brand me-2 mb-1 d-flex align-items-center" href="/index.html"><img src="/images/logo.png"
                                    loading="lazy" alt="Logo" /></a>
                            <a class="navbar-brand me-2 mb-1 d-flex align-items-center" href="/index.html">Mistergold</a>
                        </div>
                    </div>
                    <div id="searchDiv" class="d-flex search-bar-container align-items-center">
                        <form class="input-group w-auto my-auto d-none d-sm-flex">
                            <input id="searchName" type="search" class="form-control rounded" placeholder="Buscar produtos.." />
                            <span id="searchSend" class="input-group-text border-0 d-none d-lg-flex">
                                <i class="fas fa-search"></i>
                            </span>
                        </form>
                    </div>
                    <div class="icons d-flex align-items-center">
                        <button aria-label="Carrinho"  id="buttonCart" onclick="abrirModal()">
                            <i class="fa-solid fa-cart-shopping"></i><span>Carrinho</span>
                        </button>
                        <button aria-label="Conta" id="btn-account-page">
                            <i class="fa-solid fa-user"></i><span>Conta</span>
                        </button>
                    </div>
                </div>
            </nav>
                  `;
        containerNavbar.insertAdjacentHTML('beforeend', navbarContent);
    } catch (error) {
        console.log("Não foi possivel carregar a navbar!")
    }

    document.getElementById('btn-toggle-sidebar').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    });

    document.getElementById('btn-account-page').addEventListener('click', function() {
        window.location.href = "/html/account.html";
    });
   
});