document.addEventListener('DOMContentLoaded', () => {
    // Carrito
    const loadCart = () => JSON.parse(localStorage.getItem('cart')) || [];
    const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

    const updateCartDisplay = () => {
        const cart = loadCart();
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const totalPriceElement = document.getElementById('total-price');
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'dropdown-item d-flex justify-content-between align-items-center';
            itemElement.innerHTML = `
                <img src="${item.image}" style="height: 50px; width: auto;">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="btn btn-sm btn-danger ml-2" onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price;
        });

        cartCount.textContent = cart.length;
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    };

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            const size = document.getElementById("size") ? document.getElementById("size").value : '';
            const cart = loadCart();
            cart.push({ name, price, image, size });
            saveCart(cart);
            updateCartDisplay();
        });
    });

    window.removeFromCart = (index) => {
        let cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
        updateCartDisplay();
    };

    updateCartDisplay();

    // Autenticación y Menú de Usuario
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userDropdown = document.getElementById('userDropdown');
    const userNameElement = document.getElementById('user-name');
    const userBtnContainer = document.getElementById('userDropdown');
    const loginBtnContainer = document.getElementById('loginBtnContainer');
    const registerBtnContainer = document.getElementById('registerBtnContainer');

    // Chequeo de sesión del usuario
    const checkUserSession = () => {
        const user = localStorage.getItem('user');
        if (user) {
            userNameElement.textContent = user;
            userBtnContainer.style.display = 'block';  // Muestra el menú de usuario
            loginBtnContainer.style.display = 'none';  // Oculta los botones de Login
            registerBtnContainer.style.display = 'none';  // Oculta los botones de Registro
        } else {
            userBtnContainer.style.display = 'none';  // Oculta el menú de usuario
            loginBtnContainer.style.display = 'block';  // Muestra los botones de Login
            registerBtnContainer.style.display = 'block';  // Muestra los botones de Registro
        }
    };

    // Llamar a checkUserSession para verificar si el usuario está logueado
    checkUserSession();

    // Manejo de formulario de Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Verificación simple del login (esto debería ir acompañado de una verificación real en un servidor)
        if (username && password) {
            localStorage.setItem('user', username);
            checkUserSession(); // Actualiza el estado del menú
            $('#loginModal').modal('hide');  // Cierra el modal de login
        }
    });

    // Manejo de formulario de Registro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        // Verificación simple del registro
        if (username && password) {
            // Aquí se podría guardar el usuario de alguna forma (en un servidor o base de datos)
            alert("Usuario registrado exitosamente!");
            $('#registerModal').modal('hide');  // Cierra el modal de registro
        }
    });

    // Manejo de Cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');  // Elimina al usuario de la sesión
            checkUserSession();  // Actualiza el estado del menú
        });
    }
});
