// navigation.js
document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbarContainer");
    if (navbarContainer) {
        // Determina la ruta base correcta para llegar a navbar.html
        const path = window.location.pathname;
        const depth = path.split('/').length - 2; // Calcula cuántos niveles de profundidad
        const basePath = '../'.repeat(depth > 0 ? depth : 0);

        fetch(`${basePath}navbar.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                navbarContainer.innerHTML = html;
                // No es necesario llamar a highlightLink aquí si los estilos se manejan con CSS
            })
            .catch(error => {
                console.error('Hubo un problema con la operación de fetch:', error);
                navbarContainer.innerHTML = "<p>Error al cargar la barra de navegación.</p>";
            });
    }
});
function highlightLink(navbarContainer, currentPage) {
    const menuItems = navbarContainer.querySelectorAll('.nav-menu-item');

    menuItems.forEach(function (item) {
        const link = item.querySelector('.nav-menu-link');
        if (!link) return; // Evita error si no hay link

        let linkHref = link.getAttribute('href');
        linkHref = replaceLink(linkHref);

        let pageWithoutExtension = replaceLink(currentPage);
        pageWithoutExtension = '/' + pageWithoutExtension;

        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function replaceLink(str) {
    if (str.endsWith('.html')) {
        return str.replace('.html', '');
    }
    return str;
}