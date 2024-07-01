document.addEventListener('DOMContentLoaded', function () {
    // Menüfunktion umschalten
    const menuToggle = document.querySelector('.menu-icon');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('open');
        menu.classList.toggle('closed');
    });

    // Smooth Scroll für Ankerlinks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cookie-Management-Tool
    const cookieBanner = document.createElement('div');
    cookieBanner.classList.add('cookie-banner');
    cookieBanner.innerHTML = `
        <p>Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. <a href="#datenschutz">Mehr erfahren</a></p>
        <button class="cookie-accept">Akzeptieren</button>
    `;
    document.body.appendChild(cookieBanner);

    const cookieAcceptButton = document.querySelector('.cookie-accept');
    if (cookieAcceptButton) {
        cookieAcceptButton.addEventListener('click', () => {
            cookieBanner.remove();
            localStorage.setItem('cookieAccepted', 'true');
        });
    }

    // Überprüfen, ob Cookies akzeptiert wurden
    if (localStorage.getItem('cookieAccepted')) {
        cookieBanner.style.display = 'none';
    }

    // **Cart Management (Needs implementation)**
    let cartItems = []; // Array to store cart items

    // Hinzufügen zum Warenkorb-Funktion
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseFloat(button.getAttribute('data-product-price')); // Assuming price is available as an attribute

            // Add the product to the cart array
            cartItems.push({
                name: productName,
                price: productPrice
            });

            alert(`${productName} wurde zum Warenkorb hinzugefügt`);
            updateCartTotal(); // Update cart total display
        });
    });

    // Entfernen eines Elements aus dem Warenkorb
    const cartItemsContainer = document.querySelector('.cart-items-container'); // Assuming this element exists to hold cart items
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            const removeButton = event.target.closest('.remove-item');
            if (removeButton) {
                const cartItem = removeButton.parentNode; // Assuming cart items have a parent element
                const productName = cartItem.querySelector('.product-name').textContent;

                // Find the product to remove from the cart array
                const index = cartItems.findIndex(item => item.name === productName);
                if (index !== -1) {
                    cartItems.splice(index, 1);
                    cartItem.remove(); // Remove the cart item element from the DOM
                    updateCartTotal(); // Update cart total display
                }
            }
        });
    }

    // Zur Kasse gehen
    const checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const cartItems = document.querySelectorAll('.cart-item');
            if (cartItems.length > 0) {
                // Implement checkout logic here, e.g., redirect to checkout page
                alert('Weiter zur Kasse');
            } else {
                alert('Ihr Warenkorb ist leer.');
            }
        });
    }

    // Funktion zum Aktualisieren der Gesamtsumme im Warenkorb
    function updateCartTotal() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
        });
        const totalElement = document.querySelector('.cart-total');
        if (totalElement) {
            totalElement.textContent = `Gesamt: ${total.toFixed(2)} €`;
        }
    }
});
