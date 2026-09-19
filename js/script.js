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

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// WISHLIST
// =========================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce(function(total, item) {

        return total + (Number(item.quantity) || 1);

    }, 0);

    cartCount.textContent = totalItems;

}


// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.querySelector("#header nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function() {

        mainNav.classList.toggle("mobile-open");

        const isOpen =
            mainNav.classList.contains("mobile-open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        if (isOpen) {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });


    // Close mobile menu after clicking a link

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(function(link) {

        link.addEventListener("click", function() {

            mainNav.classList.remove("mobile-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

}


// =========================
// ACTIVE NAVBAR LINK
// =========================

function setActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const navLinks =
        document.querySelectorAll("#header nav a");

    navLinks.forEach(function(link) {

        const href =
            link.getAttribute("href");

        if (!href || href.startsWith("#")) {
            return;
        }

        link.classList.remove("active");

        let linkPage =
            href.split("/").pop();

        if (!linkPage) {
            linkPage = "index.html";
        }

        // Product page belongs to Shop
        if (
            currentPage === "product.html" &&
            linkPage === "shop.html"
        ) {
            link.classList.add("active");
        }

        // Cart and checkout belong to Cart
        else if (
            (
                currentPage === "cart.html" ||
                currentPage === "checkout.html"
            ) &&
            linkPage === "cart.html"
        ) {
            link.classList.add("active");
        }

        else if (
            currentPage === linkPage
        ) {
            link.classList.add("active");
        }

    });

}

setActiveNavigation();


// =========================
// ADD TO CART FUNCTION
// =========================

function addProductToCart(name, price) {

    const existingItem =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existingItem) {

        existingItem.quantity =
            (Number(existingItem.quantity) || 1) + 1;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}


// =========================
// ADD TO CART BUTTONS
// =========================

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name =
            button.getAttribute("data-name");

        const price =
            Number(
                button.getAttribute("data-price")
            );


        addProductToCart(name, price);


        alert(
            name + " added to cart!"
        );

    });

});


// =========================
// WISHLIST BUTTONS
// =========================

function updateWishlistButton(button, productName) {

    if (wishlist.includes(productName)) {

        button.classList.add("active");

        button.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

    } else {

        button.classList.remove("active");

        button.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

    }

}


function toggleWishlist(productName) {

    const index =
        wishlist.indexOf(productName);


    if (index !== -1) {

        wishlist.splice(index, 1);

    } else {

        wishlist.push(productName);

    }


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}


const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");


wishlistButtons.forEach(function(button) {

    const productName =
        button.getAttribute("data-name");


    updateWishlistButton(
        button,
        productName
    );


    button.addEventListener(
        "click",
        function() {

            toggleWishlist(productName);

            updateWishlistButton(
                button,
                productName
            );

        }
    );

});


// =========================
// SHOP SEARCH / FILTER / SORT
// =========================

const productSearch =
    document.getElementById("product-search");

const categoryFilter =
    document.getElementById("category-filter");

const sortProducts =
    document.getElementById("sort-products");


if (
    productSearch &&
    categoryFilter &&
    sortProducts
) {

    const productsGrid =
        document.querySelector(".products-grid");


    const productCards =
        Array.from(
            document.querySelectorAll(
                ".product-card"
            )
        );


    function getProductPrice(card) {

        const priceElement =
            card.querySelector(
                ".price, .product-price"
            );


        if (!priceElement) {
            return 0;
        }


        return Number(
            priceElement.textContent
                .replace(/[^0-9.]/g, "")
        );

    }


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
            productCards.filter(function(card) {

                const nameElement =
                    card.querySelector(
                        "h3, .product-name"
                    );


                const categoryElement =
                    card.querySelector(
                        ".product-category"
                    );


                const productName =
                    nameElement
                        ? nameElement.textContent
                            .trim()
                            .toLowerCase()
                        : "";


                const productCategory =
                    categoryElement
                        ? categoryElement.textContent
                            .trim()
                        : "";


                return (

                    productName.includes(
                        searchText
                    )

                    &&

                    (
                        selectedCategory === "all" ||

                        productCategory ===
                        selectedCategory
                    )

                );

            });


        // Sort

        filteredProducts.sort(function(a, b) {

            const nameA =
                a.querySelector(
                    "h3, .product-name"
                )
                    ?.textContent
                    .trim()
                    .toLowerCase() || "";


            const nameB =
                b.querySelector(
                    "h3, .product-name"
                )
                    ?.textContent
                    .trim()
                    .toLowerCase() || "";


            const priceA =
                getProductPrice(a);


            const priceB =
                getProductPrice(b);


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


        // Hide all cards

        productCards.forEach(function(card) {

            card.style.display = "none";

        });


        // Show filtered cards

        filteredProducts.forEach(function(card) {

            card.style.display = "block";

            if (productsGrid) {

                productsGrid.appendChild(card);

            }

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
            wishlist.includes(productName);


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
                            isWishlisted ? "active" : ""
                        }"
                        id="details-wishlist"
                        aria-label="Add to wishlist"
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


        const detailsAddCart =
            document.getElementById(
                "details-add-cart"
            );


        if (detailsAddCart) {

            detailsAddCart.addEventListener(
                "click",
                function() {

                    addProductToCart(
                        productName,
                        product.price
                    );


                    alert(
                        productName +
                        " added to cart!"
                    );

                }
            );

        }


        const detailsWishlist =
            document.getElementById(
                "details-wishlist"
            );


        if (detailsWishlist) {

            detailsWishlist.addEventListener(
                "click",
                function() {

                    toggleWishlist(
                        productName
                    );


                    const active =
                        wishlist.includes(
                            productName
                        );


                    detailsWishlist.classList.toggle(
                        "active",
                        active
                    );


                    detailsWishlist.innerHTML =
                        active
                            ? '<i class="fa-solid fa-heart"></i>'
                            : '<i class="fa-regular fa-heart"></i>';

                }
            );

        }

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


        cart.forEach(function(item, index) {

            const quantity =
                Number(item.quantity) || 1;


            const itemTotal =
                Number(item.price) * quantity;


            const cartItem =
                document.createElement("div");


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        $${Number(item.price).toFixed(2)} each
                    </p>

                </div>


                <div class="cart-quantity">

                    <button
                        class="quantity-btn decrease"
                        data-index="${index}"
                    >
                        -
                    </button>

                    <span class="quantity-value">
                        ${quantity}
                    </span>

                    <button
                        class="quantity-btn increase"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>


                <div class="cart-item-total">

                    $${itemTotal.toFixed(2)}

                </div>


                <button
                    class="remove-cart"
                    data-index="${index}"
                    aria-label="Remove item"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            `;


            cartContainer.appendChild(
                cartItem
            );

        });


        // Increase quantity

        const increaseButtons =
            document.querySelectorAll(
                ".increase"
            );


        increaseButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    cart[index].quantity =
                        (Number(cart[index].quantity) || 1) + 1;


                    saveCart();

                }
            );

        });


        // Decrease quantity

        const decreaseButtons =
            document.querySelectorAll(
                ".decrease"
            );


        decreaseButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    const quantity =
                        Number(
                            cart[index].quantity
                        ) || 1;


                    if (quantity > 1) {

                        cart[index].quantity =
                            quantity - 1;

                    } else {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    saveCart();

                }
            );

        });


        // Remove item

        const removeButtons =
            document.querySelectorAll(
                ".remove-cart"
            );


        removeButtons.forEach(function(button) {

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


                    saveCart();

                }
            );

        });


        updateCartTotals();

    }


    function saveCart() {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        updateCartCount();

        renderCart();

    }


    function updateCartTotals() {

        const subtotal =
            cart.reduce(function(total, item) {

                return total +
                    (
                        Number(item.price) *
                        (Number(item.quantity) || 1)
                    );

            }, 0);


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


    const checkoutLink =
        document.getElementById(
            "checkout-link"
        );


    if (checkoutLink) {

        checkoutLink.addEventListener(
            "click",
            function(event) {

                if (cart.length === 0) {

                    event.preventDefault();

                    alert(
                        "Your cart is empty!"
                    );

                }

            }
        );

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


        cart.forEach(function(item) {

            const quantity =
                Number(item.quantity) || 1;


            const itemTotal =
                Number(item.price) * quantity;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "checkout-item";


            itemElement.innerHTML = `

                <span>
                    ${item.name} × ${quantity}
                </span>

                <span>
                    $${itemTotal.toFixed(2)}
                </span>

            `;


            checkoutItems.appendChild(
                itemElement
            );

        });


        const subtotal =
            cart.reduce(function(total, item) {

                return total +
                    (
                        Number(item.price) *
                        (Number(item.quantity) || 1)
                    );

            }, 0);


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
// INITIALIZE
// =========================

updateCartCount();
