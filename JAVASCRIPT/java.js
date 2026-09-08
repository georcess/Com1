document.addEventListener("DOMContentLoaded", () => {
    const home = document.getElementById('home');
    if (home) {
        home.style.opacity = 0;
        home.style.display = 'block';
        home.style.transition = 'opacity 1s ease';
        requestAnimationFrame(() => {
            home.style.opacity = 1;
        });
    }
    
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
});

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

            if (sectionId === 'cart') {
                renderCart();
                updatePearlButton();
                updateGenerateButton();
            }
        } else {
            section.classList.remove('active');
            section.style.opacity = 0;
            section.style.display = 'none';
        }
    });
}

let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item: item, price: price, addons: [] });
    total += price;
    renderCart();
    updatePearlButton();
    updateGenerateButton();
    showSection('cart');
}

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

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${cartItem.item}</strong> - ₱${cartItem.price}`;
        if (cartItem.addons.length > 0) {
            const addonList = document.createElement('ul');
            cartItem.addons.forEach(addon => {
                const addonLi = document.createElement('li');
                addonLi.textContent = `+ ${addon.name} (₱${addon.price})`;
                addonList.appendChild(addonLi);
            });
            li.appendChild(addonList);
        }
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = "❌";
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.onclick = () => removeItem(index);
        li.appendChild(cancelBtn);
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total;
}

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

    fetch('submit_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customer_name: name,
            order_details: cart.map(item => item.item).join(", "),
            total_price: total
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "success") {
            alert("Success! Order saved to database.");
            
            const receiptItems = document.getElementById('receipt-items');
            if (receiptItems) {
                receiptItems.innerHTML = '';
                cart.forEach(cartItem => {
                    const li = document.createElement('li');
                    li.textContent = `${cartItem.item} - ₱${cartItem.price}`;
                    receiptItems.appendChild(li);
                });
            }
            
            const rName = document.getElementById('receipt-name');
            const rTotal = document.getElementById('receipt-total');
            const rDiv = document.getElementById('receipt');

            if (rName) rName.textContent = name;
            if (rTotal) rTotal.textContent = total;
            if (rDiv) rDiv.style.display = 'block';

        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Failed to connect to server. Check Console (F12).");
    });
}


function updateGenerateButton() {
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.disabled = (cart.length === 0);
    }
}

function updatePearlButton() {
    const pearlBtn = document.getElementById('pearl-btn');
    if (pearlBtn) {
        pearlBtn.disabled = (cart.length === 0);
    }
}

function clearCart() {
    cart = [];
    total = 0;
    renderCart();
    updatePearlButton();
    updateGenerateButton();
    const receipt = document.getElementById('receipt');
    if (receipt) receipt.style.display = 'none';
}
function loadOrders() {
    const tableBody = document.querySelector('.admin-section table tbody');
    if (!tableBody) return;

    fetch('get_orders.php')
    .then(res => res.json())
    .then(orders => {
        tableBody.innerHTML = '';
        orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${order.order_date}</td>
                <td>${order.customer_name}</td>
                <td>${order.order_details}</td>
                <td>₱${order.total_price}</td>
                <td><button onclick="deleteOrder(${order.id})">Done</button></td>
            `;
            tableBody.appendChild(tr);
        });
    });
}

document.addEventListener('DOMContentLoaded', loadOrders);

function loadOrders() {
    const tableBody = document.querySelector(".admin-section table tbody") || 
                     document.querySelector("table tbody");
    if (!tableBody) return;

    fetch('fetch_orders.php')
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";
            
            data.forEach(order => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${order.order_date}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.order_details}</td>
                    <td>₱${order.total_price}</td>
                    <td><button onclick="deleteOrder(${order.id})">Done</button></td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    const adminBtn = document.querySelector("button[name='admin']"); 
    if(adminBtn) {
        adminBtn.onclick = loadOrders;
    }
    
    loadOrders(); 
});