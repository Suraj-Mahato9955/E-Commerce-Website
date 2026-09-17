// ===============================
// CART DATA
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// SAVE CART
// ===============================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    cartCount.textContent = cart.length;
}


// ===============================
// ADD TO CART
// ===============================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cart.push({
            name: name,
            price: price
        });

        saveCart();

        updateCartCount();

        alert(name + " added to cart!");

    });

});


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const cartContainer = document.getElementById("cart-container");

    if (!cartContainer) {
        return;
    }

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart.</p>
                <a href="shop.html">Continue Shopping</a>
            </div>
        `;

        updateCartTotal();

        return;
    }


    cartContainer.innerHTML = "";


    cart.forEach(function (item, index) {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;


        cartContainer.appendChild(cartItem);

    });


    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            saveCart();

            updateCartCount();

            displayCart();

        });

    });


    updateCartTotal();
}


// ===============================
// CART TOTAL
// ===============================

function updateCartTotal() {

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const shippingElement =
        document.getElementById("cart-shipping");

    const totalElement =
        document.getElementById("cart-total");


    if (!subtotalElement) {
        return;
    }


    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal += item.price;

    });


    const shipping = subtotal === 0 ? 0 : 50;

    const total = subtotal + shipping;


    subtotalElement.textContent =
        "₹" + subtotal.toLocaleString("en-IN");

    shippingElement.textContent =
        "₹" + shipping.toLocaleString("en-IN");

    totalElement.textContent =
        "₹" + total.toLocaleString("en-IN");
}


// ===============================
// CHECKOUT
// ===============================

const checkoutButton =
    document.getElementById("checkout-btn");


if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        alert(
            "Checkout feature will be added soon!"
        );

    });

}


// ===============================
// INITIAL LOAD
// ===============================

updateCartCount();

displayCart();
