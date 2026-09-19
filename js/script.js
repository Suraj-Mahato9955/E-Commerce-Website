// =========================
// PRODUCT DATA
// =========================

const products = {

    "Classic Watch": {
        category: "Accessories",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
        description: "A stylish classic watch designed for everyday use. Its simple and elegant design makes it perfect for both casual and formal occasions."
    },

    "Fashion T-Shirt": {
        category: "Clothing",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        description: "A comfortable and stylish fashion T-shirt made for everyday wear. Perfect for creating a simple and modern look."
    },

    "Running Shoes": {
        category: "Footwear",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable running shoes designed to provide support during workouts, running and everyday activities."
    },

    "Wireless Headphones": {
        category: "Electronics",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "Enjoy your music with comfortable wireless headphones featuring a modern design and immersive sound."
    },

    "Premium Coffee Mug": {
        category: "Home",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
        description: "A premium coffee mug with a clean and elegant design. Perfect for coffee, tea and your daily beverages."
    },

    "Leather Bag": {
        category: "Bags",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        description: "A stylish leather bag with a practical design. Perfect for carrying your everyday essentials."
    }

};


// =========================
// SHOPPING CART
// =========================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// WISHLIST
// =========================

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent =
            cart.length;

    }

}


// =========================
// ADD TO CART
// =========================

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const name =
                button.getAttribute(
                    "data-name"
                );

            const price =
                Number(
                    button.getAttribute(
                        "data-price"
                    )
                );


            cart.push({
                name: name,
                price: price
            });


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            updateCartCount();


            alert(
                name + " added to cart!"
            );

        }
    );

});


// =========================
// WISHLIST
// =========================

const wishlistButtons =
    document.querySelectorAll(
        ".wishlist-btn"
    );


wishlistButtons.forEach(
    function(button) {

        const productName =
            button.getAttribute(
                "data-name"
            );


        if (
            wishlist.includes(
                productName
            )
        ) {

            button.classList.add(
                "active"
            );

            button.innerHTML =
                '<i class="fa-solid fa-heart"></i>';

        }


        button.addEventListener(
            "click",
            function() {

                const index =
                    wishlist.indexOf(
                        productName
                    );


                if (index !== -1) {

                    wishlist.splice(
                        index,
                        1
                    );

                    button.classList.remove(
                        "active"
                    );

                    button.innerHTML =
                        '<i class="fa-regular fa-heart"></i>';

                } else {

                    wishlist.push(
                        productName
                    );

                    button.classList.add(
                        "active"
                    );

                    button.innerHTML =
                        '<i class="fa-solid fa-heart"></i>';

                }


                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(
                        wishlist
                    )
                );

            }
        );

    }
);


// =========================
// PRODUCT SEARCH FILTER SORT
// =========================

const productSearch =
    document.getElementById(
        "product-search"
    );

const categoryFilter =
    document.getElementById(
        "category-filter"
    );

const sortProducts =
    document.getElementById(
        "sort-products"
    );


if (
    productSearch &&
    categoryFilter &&
    sortProducts
) {

    const productsGrid =
        document.querySelector(
            ".products-grid"
        );


    const productCards =
        Array.from(
            document.querySelectorAll(
                ".product-card"
            )
        );


    function updateProducts() {

        const searchText =
            productSearch.value
                .trim()
                .toLowerCase();


        const selectedCategory =
            categoryFilter.value;


        const sortValue =
            sortProducts.value;


        let filteredProducts =
            productCards.filter(
                function(card) {

                    const productName =
                        card.querySelector(
                            "h3"
                        )
                        .textContent
                        .trim()
                        .toLowerCase();


                    const productCategory =
                        card.querySelector(
                            ".product-category"
                        )
                        .textContent
                        .trim();


                    const nameMatch =
                        productName.includes(
                            searchText
                        );


                    const categoryMatch =
                        selectedCategory ===
                            "all" ||
                        productCategory ===
                            selectedCategory;


                    return (
                        nameMatch &&
                        categoryMatch
                    );

                }
            );


        filteredProducts.sort(
            function(a, b) {

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
                        a.querySelector(
                            ".price"
                        )
                        .textContent
                        .replace("$", "")
                    );


                const priceB =
                    Number(
                        b.querySelector(
                            ".price"
                        )
                        .textContent
                        .replace("$", "")
                    );


                if (
                    sortValue ===
                    "price-low"
                ) {

                    return priceA - priceB;

                }


                if (
                    sortValue ===
                    "price-high"
                ) {

                    return priceB - priceA;

                }


                if (
                    sortValue ===
                    "name-az"
                ) {

                    return nameA.localeCompare(
                        nameB
                    );

                }


                if (
                    sortValue ===
                    "name-za"
                ) {

                    return nameB.localeCompare(
                        nameA
                    );

                }


                return 0;

            }
        );


        productCards.forEach(
            function(card) {

                card.style.display =
                    "none";

            }
        );


        filteredProducts.forEach(
            function(card) {

                card.style.display =
                    "block";

                productsGrid.appendChild(
                    card
                );

            }
        );

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


// =========================
// PRODUCT DETAILS PAGE
// =========================

const productDetails =
    document.getElementById(
        "product-details"
    );


if (productDetails) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productName =
        params.get("product");


    const product =
        products[productName];


    if (product) {

        const isWishlisted =
            wishlist.includes(
                productName
            );


        productDetails.innerHTML = `

            <div class="product-details-image">

                <img
                    src="${product.image}"
                    alt="${productName}"
                >

            </div>


            <div class="product-details-info">

                <span class="details-category">
                    ${product.category}
                </span>


                <h1>
                    ${productName}
                </h1>


                <div class="details-rating">
                    ★★★★★
                </div>


                <div class="details-price">
                    $${product.price.toFixed(2)}
                </div>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="details-actions">

                    <button
                        class="details-cart-btn"
                        id="details-add-cart"
                    >
                        <i class="fa-solid fa-cart-shopping"></i>
                        Add to Cart
                    </button>


                    <button
                        class="details-wishlist-btn ${
                            isWishlisted
                                ? "active"
                                : ""
                        }"
                        id="details-wishlist"
                    >

                        <i class="${
                            isWishlisted
                                ? "fa-solid"
                                : "fa-regular"
                        } fa-heart"></i>

                    </button>

                </div>

            </div>

        `;


        // ADD TO CART

        const detailsAddCart =
            document.getElementById(
                "details-add-cart"
            );


        detailsAddCart.addEventListener(
            "click",
            function() {

                cart.push({
                    name: productName,
                    price: product.price
                });


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                updateCartCount();


                alert(
                    productName +
                    " added to cart!"
                );

            }
        );


        // WISHLIST

        const detailsWishlist =
            document.getElementById(
                "details-wishlist"
            );


        detailsWishlist.addEventListener(
            "click",
            function() {

                const index =
                    wishlist.indexOf(
                        productName
                    );


                if (index !== -1) {

                    wishlist.splice(
                        index,
                        1
                    );

                    detailsWishlist.classList
                        .remove(
                            "active"
                        );

                    detailsWishlist.innerHTML =
                        '<i class="fa-regular fa-heart"></i>';

                } else {

                    wishlist.push(
                        productName
                    );

                    detailsWishlist.classList
                        .add(
                            "active"
                        );

                    detailsWishlist.innerHTML =
                        '<i class="fa-solid fa-heart"></i>';

                }


                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(
                        wishlist
                    )
                );

            }
        );

    } else {

        productDetails.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Product Not Found
                </h2>

                <p>
                    The requested product does not exist.
                </p>

                <a
                    href="shop.html"
                    class="btn"
                >
                    Back to Shop
                </a>

            </div>

        `;

    }

}


// =========================
// CART PAGE
// =========================

const cartContainer =
    document.getElementById(
        "cart-container"
    );


if (cartContainer) {

    function renderCart() {

        cartContainer.innerHTML = "";


        if (cart.length === 0) {

            cartContainer.innerHTML = `
                <div class="empty-cart">

                    <i class="fa-solid fa-cart-shopping"></i>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add some products to your cart.
                    </p>

                    <a
                        href="shop.html"
                        class="btn"
                    >
                        Continue Shopping
                    </a>

                </div>
            `;


            updateCartTotals();

            return;

        }


        cart.forEach(
            function(item, index) {

                const cartItem =
                    document.createElement(
                        "div"
                    );


                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            $${item.price.toFixed(2)}
                        </p>

                    </div>


                    <button
                        class="remove-cart"
                        data-index="${index}"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                `;


                cartContainer.appendChild(
                    cartItem
                );

            }
        );


        const removeButtons =
            document.querySelectorAll(
                ".remove-cart"
            );


        removeButtons.forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const index =
                            Number(
                                button.getAttribute(
                                    "data-index"
                                )
                            );


                        cart.splice(
                            index,
                            1
                        );


                        localStorage.setItem(
                            "cart",
                            JSON.stringify(
                                cart
                            )
                        );


                        updateCartCount();

                        renderCart();

                    }
                );

            }
        );


        updateCartTotals();

    }


    function updateCartTotals() {

        const subtotal =
            cart.reduce(
                function(total, item) {

                    return total + item.price;

                },
                0
            );


        const shipping =
            cart.length > 0 ? 5 : 0;


        const total =
            subtotal + shipping;


        const subtotalElement =
            document.getElementById(
                "cart-subtotal"
            );


        const shippingElement =
            document.getElementById(
                "cart-shipping"
            );


        const totalElement =
            document.getElementById(
                "cart-total"
            );


        if (subtotalElement) {

            subtotalElement.textContent =
                "$" + subtotal.toFixed(2);

        }


        if (shippingElement) {

            shippingElement.textContent =
                "$" + shipping.toFixed(2);

        }


        if (totalElement) {

            totalElement.textContent =
                "$" + total.toFixed(2);

        }

    }


    renderCart();

}


// =========================
// CHECKOUT PAGE
// =========================

const checkoutItems =
    document.getElementById(
        "checkout-items"
    );


if (checkoutItems) {

    function renderCheckout() {

        checkoutItems.innerHTML = "";


        if (cart.length === 0) {

            checkoutItems.innerHTML =
                "<p>Your cart is empty.</p>";

            return;

        }


        cart.forEach(
            function(item) {

                const itemElement =
                    document.createElement(
                        "div"
                    );


                itemElement.className =
                    "checkout-item";


                itemElement.innerHTML = `

                    <span>
                        ${item.name}
                    </span>

                    <span>
                        $${item.price.toFixed(2)}
                    </span>

                `;


                checkoutItems.appendChild(
                    itemElement
                );

            }
        );


        const subtotal =
            cart.reduce(
                function(total, item) {

                    return total + item.price;

                },
                0
            );


        const shipping =
            cart.length > 0 ? 5 : 0;


        const total =
            subtotal + shipping;


        const checkoutSubtotal =
            document.getElementById(
                "checkout-subtotal"
            );


        const checkoutTotal =
            document.getElementById(
                "checkout-total"
            );


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                "$" + subtotal.toFixed(2);

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                "$" + total.toFixed(2);

        }

    }


    renderCheckout();


    const checkoutForm =
        document.getElementById(
            "checkout-form"
        );


    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                if (cart.length === 0) {

                    alert(
                        "Your cart is empty!"
                    );

                    return;

                }


                alert(
                    "Order placed successfully! 🎉"
                );


                cart = [];


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                updateCartCount();


                window.location.href =
                    "index.html";

            }
        );

    }

}


// =========================
// CONTACT FORM
// =========================

const contactForm =
    document.getElementById(
        "contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            alert(
                "Thank you! Your message has been sent."
            );


            contactForm.reset();

        }
    );

}


// =========================
// NEWSLETTER
// =========================

const newsletterForm =
    document.getElementById(
        "newsletter-form"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            alert(
                "Thank you for subscribing!"
            );


            newsletterForm.reset();

        }
    );

}


// =========================
// INITIAL CART COUNT
// =========================

updateCartCount();
