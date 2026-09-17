// =========================
// CART
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}


// =========================
// ADD PRODUCT TO CART
// =========================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        const product = {
            name: productName,
            price: productPrice
        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert(productName + " added to cart!");
    });

});


// =========================
// CART LINK
// =========================

const cartLink = document.getElementById("cart-link");

if (cartLink) {

    cartLink.addEventListener("click", function (event) {

        event.preventDefault();

        alert("Cart items: " + cart.length);
    });

}


// =========================
// NEWSLETTER
// =========================

const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;

        if (email.trim() !== "") {

            alert("Thank you for subscribing!");

            newsletterForm.reset();
        }

    });

}


// =========================
// INITIALIZE
// =========================

updateCartCount();