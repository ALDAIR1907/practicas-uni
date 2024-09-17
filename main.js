function loadContent(file) {
    const contentPlaceholder = document.getElementById('content-placeholder');
    

    contentPlaceholder.innerHTML = 'Cargando...';
    contentPlaceholder.style.display = 'block';


    fetch(file)
        .then(response => response.text())
        .then(data => {
            contentPlaceholder.innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
            contentPlaceholder.innerHTML = '<p>Error al cargar el contenido.</p>';
        });
}

function showContent(id) {
    const allContents = document.querySelectorAll('#content-placeholder > div');
    allContents.forEach(content => {
        content.style.display = 'none';
    });

    const contentToShow = document.getElementById(id);
    if (contentToShow) {
        contentToShow.style.display = 'block';
    }
}

function toggleSubmenu(menuId) {
    var submenu = document.getElementById('submenu' + menuId);
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
    } else {
        submenu.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadContent('bienvenida.html');
});


function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContainer = document.querySelector('.main-container');


    sidebar.classList.toggle('open');
    

    mainContainer.classList.toggle('shift');
}


document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);