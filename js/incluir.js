console.log("incluir.js está rodando...");

document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header-placeholder", "header.html", setupHeaderFeatures); 
    loadHTML("footer-placeholder", "footer.html");
});

function loadHTML(id, url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error loading ${url}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); 
        })
        .catch(error => console.error(error));
}

function setupHeaderFeatures() {
    // 1. Detectar página atual e o link
    const allLinks = document.querySelectorAll('.nav-list .nav-link');
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html'; 

    allLinks.forEach(link => {
        link.classList.remove('active');
        const linkFile = link.getAttribute('href');
        if (linkFile === currentFile) {
            link.classList.add('active');
        }
    });

    // 2. LÓGICA DA LOGO para esconder somente no Index
    const logo = document.querySelector('.header-logo');
    const headerElement = document.querySelector('.app-header');

    // Verifica se está na Home
    if (currentFile === 'index.html' || currentFile === '') {
        if (logo) logo.style.display = 'none';
        if (headerElement) headerElement.classList.add('is-index');
    } else {
        if (logo) logo.style.display = 'block';
        if (headerElement) headerElement.classList.remove('is-index');
    }

    // 3. Lógica do Toggler (Mobile)
    const toggler = document.querySelector('.header-toggler');
    const navElement = document.querySelector('.header-nav'); 

    if (toggler && navElement) {
        toggler.addEventListener('click', () => {
            const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
            toggler.setAttribute('aria-expanded', !isExpanded);
            navElement.style.display = isExpanded ? 'none' : 'flex'; 
        });
        
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault(); 
                    const menu = toggle.nextElementSibling;
                    if (menu && menu.classList.contains('dropdown-menu')) {
                        document.querySelectorAll('.dropdown-menu').forEach(m => {
                            if (m !== menu) m.style.display = 'none';
                        });
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                    }
                }
            });
        });
    }
}