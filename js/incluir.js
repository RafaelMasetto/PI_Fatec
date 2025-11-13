console.log("incluir. esta rodando...");

document.addEventListener("DOMContentLoaded", () => {
    // 1. Carrega o Header e Footer
    // Passamos 'setupHeaderFeatures' como função de callback para garantir que a lógica só rode após a injeção do HTML
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
            // Se o callback for fornecido (apenas para o header), ele é executado aqui
            if (callback) {
                callback(); 
            }
        })
        .catch(error => console.error(error));
}

// Função dedicada a configurar TODAS as funcionalidades do header
function setupHeaderFeatures() {
    
    // --- 1. Lógica para definir o Link Ativo (Página Atual) ---
    const allLinks = document.querySelectorAll('.nav-list .nav-link');
    const currentPath = window.location.pathname;
    
    // Pega o nome do arquivo atual (ex: "/caminho/index.html" -> "index.html")
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html'; 

    allLinks.forEach(link => {
        // Remove a classe 'active' de todos (para limpeza)
        link.classList.remove('active');

        // Pega o nome do arquivo do link
        const linkFile = link.getAttribute('href');

        // Compara o nome do arquivo atual com o link e aplica a classe
        if (linkFile === currentFile) {
            link.classList.add('active');
        }
    });


    // --- 2. Lógica do Toggler (Menu Sanduíche) ---
    const toggler = document.querySelector('.header-toggler');
    const nav = document.querySelector('.header-nav');

    if (toggler && nav) {
        toggler.addEventListener('click', () => {
            const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
            toggler.setAttribute('aria-expanded', !isExpanded);
            nav.style.display = isExpanded ? 'none' : 'flex'; 
        });
        
        // --- 3. Lógica do Dropdown (em Mobile) ---
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault(); 
                    const menu = toggle.nextElementSibling;
                    if (menu && menu.classList.contains('dropdown-menu')) {
                        // Fecha outros dropdowns abertos antes de abrir o atual
                        document.querySelectorAll('.dropdown-menu').forEach(m => {
                            if (m !== menu) m.style.display = 'none';
                        });
                        // Alterna a visibilidade
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                    }
                }
            });
        });
    }
}