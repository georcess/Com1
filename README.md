# ☕ Mr. Boy SpecialTea — Online Ordering System

> A web-based ordering system for **Mr. Boy SpecialTea**, a milk tea, coffee, and snack shop located at Dela Costa V, Burgos Montalban, Rodriguez, Rizal, Philippines.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Menu Categories](#menu-categories)
- [Tech Stack](#tech-stack)
- [Architecture (MVC)](#architecture-mvc)
- [Project Structure](#project-structure)
- [Quick Start (Python + SQLite — No XAMPP Needed)](#-quick-start-python--sqlite--no-xampp-needed)
- [Alternative Setup (PHP + XAMPP / MySQL)](#-alternative-setup-php--xampp--mysql)
- [Database Configuration](#-database-configuration)
- [API Endpoints](#-api-endpoints)
- [Team](#-team)
- [Contact](#-contact)
- [License](#-license)

---

## 📖 About

**Mr. Boy SpecialTea** is a local tea and coffee shop that offers affordable beverages and snacks. This project is an online ordering system that allows customers to:

- Browse the full menu with product images
- Add items to a shopping cart with add-ons (e.g., pearl)
- Generate a receipt for their order
- Submit orders directly to a database

An **Admin Dashboard** is included for the shop owner to view, manage, and clear orders, along with a **Sales Summary** page for daily/monthly/yearly reporting.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Home Page** | Hero banner with shop logo and branding |
| 📜 **Menu** | Full menu with 6 categories and product images |
| 🛒 **Cart & Ordering** | Add items, add-ons (Pearl ₱9), view totals, generate receipt |
| 🧾 **Receipt Generation** | On-screen receipt with customer name and itemized list |
| 📊 **Admin Dashboard** | View all orders with date, customer, items, and totals |
| 📈 **Sales Summary** | Daily, monthly, and yearly sales reports |
| 📬 **Contact Form** | Customers can send messages saved to the database |
| 🎨 **Responsive Design** | Mobile-friendly layout with smooth fade transitions |

---

## 🍹 Menu Categories

| Category | Items | Price Range |
|---|---|---|
| 🧋 **Milktea** | 19 flavors (Taro, Matcha, Okinawa, Wintermelon, etc.) | ₱29 (16oz) / ₱39 (22oz) |
| ☕ **Iced Coffee** | 6 variants (Americano, Mocha, Latte, etc.) | ₱29 (16oz) / ₱39 (22oz) |
| 🍹 **Fruit Tea** | 7 flavors (Lychee, Passion Fruit, Kiwi, etc.) | ₱29 (16oz) / ₱39 (22oz) |
| 🧋 **Frappé** | 5 flavors (Blueberry Burst, Matcha, Red Velvet, etc.) | ₱29 (16oz) / ₱39 (22oz) |
| ☕ **Hot Cups** | 6 hot beverages (Coffee, Latte, Mocha, etc.) | ₱35 (12oz) |
| 🍟 **Snacks** | French Fries | ₱29 (Medium) / ₱49 (Large) |

**Add-On:** Pearl — ₱9

---

## 🛠 Tech Stack

| Layer | Options |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend Option 1 (Recommended / Quick)** | Python 3 + Flask + SQLite (Zero config, no XAMPP needed) |
| **Backend Option 2** | PHP 7+ + MySQL / Apache (XAMPP / InfinityFree) |
| **Architecture** | MVC (Model–View–Controller) |
| **Fonts** | Google Fonts (Lilita One, Playfair Display) |

---

## 🏗 Architecture (MVC)

This project follows the **Model–View–Controller** pattern:

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                    │
│          app.js handles SPA navigation & cart           │
└──────────────┬──────────────────────────┬───────────────┘
               │ Page Load               │ API Calls
               ▼                         ▼
         ┌───────────┐           ┌──────────────┐
         │ index.php │           │  api/*.php   │
         │  or Flask │           │ (Endpoints)  │
         └─────┬─────┘           └──────┬───────┘
               │ includes                │ delegates
               ▼                         ▼
        ┌─────────────┐         ┌────────────────┐
        │  views/*.php │         │ controllers/   │
        │  (Templates) │         │  *Controller   │
        └─────────────┘         └───────┬────────┘
                                        │ calls
                                        ▼
                                ┌────────────────┐
                                │   models/      │
                                │  Order / DB    │
                                └───────┬────────┘
                                        │ queries
                                        ▼
                                ┌────────────────┐
                                │ SQLite / MySQL │
                                └────────────────┘
```

---

## 📁 Project Structure

```
comission/
├── .htaccess                         # Apache DirectoryIndex config
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
├── server.py                         # 🚀 Python + Flask + SQLite backend (Zero XAMPP)
├── index.html                        # Main frontend HTML
├── index.php                         # PHP front controller
│
├── config/
│   └── database.php                  # PHP DB config (local/production toggle)
│
├── models/
│   ├── Order.php                     # PHP Order model (CRUD + sales summary)
│   └── Contact.php                   # PHP Contact model
│
├── controllers/
│   ├── OrderController.php           # Order API logic
│   └── ContactController.php         # Contact form logic
│
├── views/
│   ├── layouts/
│   │   ├── header.php                # HTML head, meta, CSS link
│   │   └── footer.php                # Footer, JS script tag
│   ├── home.php                      # Hero, approach cards, CTA
│   ├── menu.php                      # All menu categories & items
│   ├── cart.php                      # Shopping cart & receipt
│   ├── about.php                     # About us section
│   ├── contact.php                   # Contact form
│   └── admin/
│       ├── dashboard.php             # Admin order table
│       └── sales_summary.php         # Sales report (daily/monthly/yearly)
│
├── public/
│   ├── css/
│   │   └── style.css                 # All styles (organized by component)
│   ├── js/
│   │   └── app.js                    # All client-side logic
│   └── images/                       # Product & branding images (52 files)
│
├── api/
│   ├── submit_order.php              # POST  — Create new order
│   ├── fetch_orders.php              # GET   — List all orders
│   ├── delete_order.php              # POST  — Delete single order
│   ├── clear_orders.php              # POST  — Delete all orders
│   └── save_contact.php              # POST  — Save contact message
│
└── team/                             # Team member photos (10 members)
```

---

## ⚡ Quick Start (Python + SQLite — No XAMPP Needed)

The fastest and easiest way to run the entire website with full database functionality without installing XAMPP or setting up MySQL.

### 1. Install Flask

```bash
pip install flask
```

### 2. Start the Server

```bash
python server.py
```

### 3. Open in Browser

Go to: **[http://localhost:5000](http://localhost:5000)**

- Database table creation (`database/mr_boy.db`) is **100% automated on first launch**.
- Cart ordering, order submission, receipt generation, admin table, and sales summary all work immediately.

---

## 🐘 Alternative Setup (PHP + XAMPP / MySQL)

If you prefer or are required to use PHP & MySQL:

### 1. Copy Files to `htdocs`

Copy the `comission` folder to:
```
C:\xampp\htdocs\comission\
```

### 2. Database Setup in phpMyAdmin

Open `http://localhost/phpmyadmin` and execute:

```sql
CREATE DATABASE IF NOT EXISTS mr_boy_db;
USE mr_boy_db;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    order_details TEXT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Open in Browser

```
http://localhost/comission/
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/submit_order.php` | Submit a new order (JSON body) |
| `GET` | `/api/fetch_orders.php` | Fetch all orders |
| `POST` | `/api/delete_order.php` | Delete a single order by ID |
| `POST` | `/api/clear_orders.php` | Clear all order records |
| `POST` | `/api/save_contact.php` | Save a contact form message |
| `GET` | `/views/admin/sales_summary.php` | Sales report (today, month, year) |

---

## 👥 Team

**BREWCODE — Group 4**

| Member |
|---|
| Apolonio |
| Apuyan |
| Cañete |
| Jerez, Ayiza |
| Obosa |
| Refalpa, Jona Mae |
| Ricafranca |
| Rogel |
| Toledo |
| Vargas |

---

## 📞 Contact

- **Address:** Blk 14 Lot 4 Phase 1, Dela Costa Homes V, Burgos, Rodriguez, Rizal, Philippines 1860
- **Phone:** 0917 888 4737
- **Email:** mrboyspecialteadelacosta@gmail.com
- **Facebook:** [Mr. Boy SpecialTea](https://www.facebook.com/mrboyspecialteadelacostav)
- **Instagram:** [@mrboyspecialtea](https://instagram.com/mrboyspecialtea)

---

## 📄 License

This project was created as a school/group commission project by **BREWCODE Group 4**.

© Mr. Boy SpecialTea 2026. All rights reserved.
