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
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Database Setup](#database-setup)
- [Running the Website](#running-the-website)
- [API Endpoints](#api-endpoints)
- [Team](#team)
- [Contact](#contact)
- [License](#license)

---

## 📖 About

**Mr. Boy SpecialTea** is a local tea and coffee shop that offers affordable beverages and snacks. This project is an online ordering system that allows customers to:

- Browse the full menu with product images
- Add items to a shopping cart with add-ons (e.g., pearl)
- Generate a receipt for their order
- Submit orders directly to a MySQL database

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

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend** | PHP 7+ |
| **Database** | MySQL (via MySQLi with Prepared Statements) |
| **Fonts** | Google Fonts (Lilita One, Playfair Display) |
| **Architecture** | MVC (Model–View–Controller) |
| **Hosting** | InfinityFree (production) / XAMPP (local development) |

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
         │  (Router) │           │ (Endpoints)  │
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
                                │  Order.php     │
                                │  Contact.php   │
                                └───────┬────────┘
                                        │ queries
                                        ▼
                                ┌────────────────┐
                                │    MySQL DB    │
                                │  (mr_boy_db)   │
                                └────────────────┘
```

- **Models** (`models/`) — Data access layer. Each model encapsulates all SQL queries for its entity using prepared statements.
- **Views** (`views/`) — Presentation layer. Broken into reusable partials (header, footer, home, menu, cart, etc.).
- **Controllers** (`controllers/`) — Business logic. Validates input, calls models, and returns responses.
- **API** (`api/`) — Thin endpoint files that route HTTP requests to the appropriate controller method.
- **Public** (`public/`) — Static assets (CSS, JS, images) served directly to the browser.

---

## 📁 Project Structure

```
comission/
├── .htaccess                         # Apache DirectoryIndex config
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
├── index.php                         # 🎯 Main entry point (front controller)
│
├── config/
│   └── database.php                  # DB connection (local/production toggle)
│
├── models/
│   ├── Order.php                     # Order CRUD + sales summary
│   └── Contact.php                   # Contact message creation
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

## 📋 Prerequisites

1. **[XAMPP](https://www.apachefriends.org/)** (includes Apache, PHP, MySQL, phpMyAdmin)
   - Or any PHP 7+ environment with MySQL support
2. **Web Browser** (Chrome, Firefox, Edge, etc.)

---

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Kiro2-3/Comission1.git
cd Comission1
```

### 2. Copy to XAMPP Web Root

```
C:\xampp\htdocs\comission\
```

Copy all project files into this directory.

### 3. Configure Database Connection

Edit `config/database.php` and set the environment:

```php
// For local development:
define('ENVIRONMENT', 'local');

// For InfinityFree production:
define('ENVIRONMENT', 'production');
```

### 4. Start XAMPP

Launch **Apache** and **MySQL** from the XAMPP Control Panel.

### 5. Set Up the Database

See [Database Setup](#database-setup) below.

### 6. Open in Browser

```
http://localhost/comission/
```

---

## 🗄 Database Setup

Open **phpMyAdmin** (`http://localhost/phpmyadmin`) and run:

### Create Database

```sql
CREATE DATABASE IF NOT EXISTS mr_boy_db;
USE mr_boy_db;
```

### Create `orders` Table

```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    order_details TEXT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Create `contact_messages` Table

```sql
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ▶️ Running the Website

```bash
# Start XAMPP (Apache + MySQL)
# Then open:
http://localhost/comission/
```

For the sales summary report, navigate to:
```
http://localhost/comission/views/admin/sales_summary.php
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

### Example: Submit Order

```bash
curl -X POST http://localhost/comission/api/submit_order.php \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"Juan","order_details":"Matcha 16oz, Okinawa 22oz","total_price":68}'
```

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
