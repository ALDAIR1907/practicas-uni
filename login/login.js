document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;

    if (userId === 'admin' && password === 'admin') {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = '../index.html'; // Redirige a la página principal fuera de la carpeta login
    } else {
        alert('ID o Contraseña incorrectos');
    }
});

// Opcional: Manejo del botón "Olvidó su contraseña"
document.getElementById('forgot-password').addEventListener('click', function() {
    alert('Por favor, contacte al administrador para restablecer su contraseña.');
});

