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
// Contact Form
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Thank you! Your message has been sent.");

        contactForm.reset();
    });
}
// =========================
// CHECKOUT
// =========================

const checkoutItems = document.getElementById("checkout-items");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

if (checkoutItems) {

    let subtotal = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="empty-checkout">
                Your cart is empty.
            </p>
        `;

        checkoutSubtotal.textContent = "$0.00";
        checkoutTotal.textContent = "$0.00";

    } else {

        checkoutItems.innerHTML = "";

        cart.forEach((item) => {

            subtotal += Number(item.price);

            const itemElement = document.createElement("div");

            itemElement.className = "checkout-item";

            itemElement.innerHTML = `
                <span class="checkout-item-name">
                    ${item.name}
                </span>

                <span class="checkout-item-price">
                    $${Number(item.price).toFixed(2)}
                </span>
            `;

            checkoutItems.appendChild(itemElement);

        });

        const shipping = 5;
        const total = subtotal + shipping;

        checkoutSubtotal.textContent =
            `$${subtotal.toFixed(2)}`;

        checkoutTotal.textContent =
            `$${total.toFixed(2)}`;
    }
}


// Place Order

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert(
            "Order placed successfully! Thank you for shopping with ShopEase."
        );

        localStorage.removeItem("cart");

        window.location.href = "index.html";
    });
}

// =========================
// PRODUCT SEARCH & FILTER
// =========================

// =========================
// PRODUCT SEARCH, FILTER & SORT
// =========================

const productSearch = document.getElementById("product-search");
const categoryFilter = document.getElementById("category-filter");
const sortProducts = document.getElementById("sort-products");

if (productSearch && categoryFilter && sortProducts) {

    const productsGrid = document.querySelector(".products-grid");
    const productCards = Array.from(
        document.querySelectorAll(".product-card")
    );

    function updateProducts() {

        const searchText =
            productSearch.value.trim().toLowerCase();

        const selectedCategory =
            categoryFilter.value;

        const sortValue =
            sortProducts.value;

        let filteredProducts = productCards.filter(function (card) {

            const productName =
                card.querySelector("h3")
                    .textContent
                    .trim()
                    .toLowerCase();

            const productCategory =
                card.querySelector(".product-category")
                    .textContent
                    .trim();

            const nameMatch =
                productName.includes(searchText);

            const categoryMatch =
                selectedCategory === "all" ||
                productCategory === selectedCategory;

            return nameMatch && categoryMatch;
        });


        // Sorting

        filteredProducts.sort(function (a, b) {

            const nameA =
                a.querySelector("h3")
                    .textContent
                    .trim()
                    .toLowerCase();

            const nameB =
                b.querySelector("h3")
                    .textContent
                    .trim()
                    .toLowerCase();

            const priceA =
                Number(
                    a.querySelector(".price")
                        .textContent
                        .replace("$", "")
                );

            const priceB =
                Number(
                    b.querySelector(".price")
                        .textContent
                        .replace("$", "")
                );


            if (sortValue === "price-low") {
                return priceA - priceB;
            }

            if (sortValue === "price-high") {
                return priceB - priceA;
            }

            if (sortValue === "name-az") {
                return nameA.localeCompare(nameB);
            }

            if (sortValue === "name-za") {
                return nameB.localeCompare(nameA);
            }

            return 0;
        });


        // Display products

        productCards.forEach(function (card) {
            card.style.display = "none";
        });

        filteredProducts.forEach(function (card) {
            card.style.display = "block";
            productsGrid.appendChild(card);
        });
    }


    productSearch.addEventListener(
        "input",
        updateProducts
    );

    categoryFilter.addEventListener(
        "change",
        updateProducts
    );

    sortProducts.addEventListener(
        "change",
        updateProducts
    );
}
