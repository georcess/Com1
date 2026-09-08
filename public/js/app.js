/**
 * Mr. Boy SpecialTea — Application JavaScript
 *
 * Handles: section navigation, cart management, add-ons,
 *          receipt generation, and admin order loading.
 */

/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    // Fade-in home section on load
    const home = document.getElementById('home');
    if (home) {
        home.style.opacity = 0;
        home.style.display = 'block';
        home.style.transition = 'opacity 1s ease';
        requestAnimationFrame(() => {
            home.style.opacity = 1;
        });
    }

    // "Start Ordering" button → navigate to menu
    const startBtn = document.getElementById('start-ordering');
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const current = document.querySelector('.section.active');
            if (current) {
                current.style.opacity = 0;
                setTimeout(() => {
                    showSection('menu');
                }, 500);
            } else {
                showSection('menu');
            }
        });
    }

    // Load admin orders on page load
    loadOrders();
});


/* ============================================================
   SECTION NAVIGATION
   ============================================================ */

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
            section.style.display = 'block';
            section.style.opacity = 0;
            section.style.transition = 'opacity 0.5s ease';
            requestAnimationFrame(() => {
                section.style.opacity = 1;
            });

            // Refresh cart UI when switching to cart
            if (sectionId === 'cart') {
                renderCart();
                updatePearlButton();
                updateGenerateButton();
            }

            // Refresh admin table when switching to admin
            if (sectionId === 'admin') {
                loadOrders();
            }
        } else {
            section.classList.remove('active');
            section.style.opacity = 0;
            section.style.display = 'none';
        }
    });
}


/* ============================================================
   CART MANAGEMENT
   ============================================================ */

let cart = [];
let total = 0;

/**
 * Add an item to the cart and switch to cart view.
 */
function addToCart(item, price) {
    cart.push({ item: item, price: price, addons: [] });
    total += price;
    renderCart();
    updatePearlButton();
    updateGenerateButton();
    showSection('cart');
}

/**
 * Add an add-on to the last item in the cart.
 */
function addAddonToLastItem(addonName, addonPrice) {
    if (cart.length === 0) {
        alert("Please order a drink first.");
        return;
    }
    const lastItem = cart[cart.length - 1];
    lastItem.addons.push({ name: addonName, price: addonPrice });
    total += addonPrice;
    renderCart();
}

/**
 * Render the cart items list and total.
 */
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${cartItem.item}</strong> - ₱${cartItem.price}`;

        // Render add-ons
        if (cartItem.addons.length > 0) {
            const addonList = document.createElement('ul');
            cartItem.addons.forEach(addon => {
                const addonLi = document.createElement('li');
                addonLi.textContent = `+ ${addon.name} (₱${addon.price})`;
                addonList.appendChild(addonLi);
            });
            li.appendChild(addonList);
        }

        // Cancel button per item
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = "❌";
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.onclick = () => removeItem(index);
        li.appendChild(cancelBtn);

        cartItems.appendChild(li);
    });

    cartTotal.textContent = total;
}

/**
 * Remove an item from the cart by index.
 */
function removeItem(index) {
    const item = cart[index];
    if (!item) return;
    total -= item.price;
    item.addons.forEach(addon => total -= addon.price);
    cart.splice(index, 1);
    renderCart();
    updatePearlButton();
    updateGenerateButton();
}

/**
 * Clear the entire cart.
 */
function clearCart() {
    cart = [];
    total = 0;
    renderCart();
    updatePearlButton();
    updateGenerateButton();
    const receipt = document.getElementById('receipt');
    if (receipt) receipt.style.display = 'none';
}

/**
 * Enable/disable the Pearl add-on button based on cart state.
 */
function updatePearlButton() {
    const pearlBtn = document.getElementById('pearl-btn');
    if (pearlBtn) {
        pearlBtn.disabled = (cart.length === 0);
    }
}

/**
 * Enable/disable the Generate Receipt button based on cart state.
 */
function updateGenerateButton() {
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.disabled = (cart.length === 0);
    }
}


/* ============================================================
   RECEIPT GENERATION & ORDER SUBMISSION
   ============================================================ */

function generateReceipt() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const nameInput = document.getElementById('customer-name');
    const name = nameInput ? nameInput.value.trim() : "";

    if (!name) {
        alert("Please enter your name before generating receipt.");
        return;
    }

    fetch('api/submit_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            customer_name: name,
            order_details: cart.map(item => item.item).join(", "),
            total_price: total
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Success! Order saved to database.");

            // Populate receipt
            const receiptItems = document.getElementById('receipt-items');
            if (receiptItems) {
                receiptItems.innerHTML = '';
                cart.forEach(cartItem => {
                    const li = document.createElement('li');
                    li.textContent = `${cartItem.item} - ₱${cartItem.price}`;
                    receiptItems.appendChild(li);
                });
            }

            const rName  = document.getElementById('receipt-name');
            const rTotal = document.getElementById('receipt-total');
            const rDiv   = document.getElementById('receipt');

            if (rName)  rName.textContent  = name;
            if (rTotal) rTotal.textContent = total;
            if (rDiv)   rDiv.style.display = 'block';
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Failed to connect to server. Check Console (F12).");
    });
}


/* ============================================================
   ADMIN — ORDER MANAGEMENT
   ============================================================ */

/**
 * Load all orders into the admin dashboard table.
 */
function loadOrders() {
    const tableBody = document.getElementById('admin-order-list') ||
                      document.querySelector("table tbody");
    if (!tableBody) return;

    fetch('api/fetch_orders.php')
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";

            data.forEach(order => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td style="padding:8px; border:1px solid #ddd;">${order.order_date}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${order.customer_name}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${order.order_details}</td>
                    <td style="padding:8px; border:1px solid #ddd;">₱${order.total_price}</td>
                    <td style="padding:8px; border:1px solid #ddd;">
                        <button onclick="deleteOrder(${order.id})">Done</button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
}

/**
 * Delete a single order and refresh the table.
 */
function deleteOrder(id) {
    fetch('api/delete_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            loadOrders();
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(err => console.error('Delete error:', err));
}

/**
 * Clear all order records.
 */
function clearAllOrders() {
    if (!confirm("Are you sure you want to clear ALL order records?")) return;

    fetch('api/clear_orders.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            alert("All records cleared.");
            loadOrders();
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(err => console.error('Clear error:', err));
}
