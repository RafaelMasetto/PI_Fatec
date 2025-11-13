console.log("incluir. esta rodando...");

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
            if (callback) {
                callback(); 
            }
        })
        .catch(error => console.error(error));
}

function setupHeaderFeatures() {
    
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

    const toggler = document.querySelector('.header-toggler');
    const nav = document.querySelector('.header-nav');

    if (toggler && nav) {
        toggler.addEventListener('click', () => {
            const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
            toggler.setAttribute('aria-expanded', !isExpanded);
            nav.style.display = isExpanded ? 'none' : 'flex'; 
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