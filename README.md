# ☕ Mr. Boy SpecialTea — Online Ordering System

> A web-based ordering system with User Authentication and Admin Management for **Mr. Boy SpecialTea**, located at Dela Costa V, Burgos Montalban, Rodriguez, Rizal, Philippines.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Authentication & Roles](#-authentication--roles)
- [Menu Categories](#menu-categories)
- [Tech Stack](#tech-stack)
- [Architecture (MVC)](#architecture-mvc)
- [Project Structure](#project-structure)
- [Quick Start (Python + SQLite — No XAMPP Needed)](#-quick-start-python--sqlite--no-xampp-needed)
- [Alternative Setup (PHP + XAMPP / MySQL)](#-alternative-setup-php--xampp--mysql)
- [Database Configuration & Schema](#-database-configuration--schema)
- [API Endpoints](#-api-endpoints)
- [Team](#-team)
- [Contact](#-contact)
- [License](#-license)

---

## 📖 About

**Mr. Boy SpecialTea** is a local tea and coffee shop that offers affordable beverages and snacks. This project is a full-featured online ordering system that allows:

- Customers to **register accounts**, **log in**, browse the menu, add items to cart, and generate receipts with automatic customer name filling.
- Store administrators to **log in securely**, view incoming customer orders in real time, mark orders as done, clear records, and inspect sales revenue summaries.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Tabbed Login & Register popup modal with password hashing |
| 👤 **User Profiles & Roles** | Automatic distinction between Customers and Administrators |
| 🏠 **Home Page** | Hero banner with shop logo and branding |
| 📜 **Menu** | Full menu with 6 categories and product images |
| 🛒 **Cart & Ordering** | Add items, add-ons (Pearl ₱9), auto-fill customer name, view totals |
| 🧾 **Receipt Generation** | On-screen receipt with customer name and itemized list |
| 🔒 **Protected Admin Dashboard** | Restricted to admin users with order management & table actions |
| 📈 **Sales Summary** | Daily, monthly, and yearly sales reports |
| 📬 **Contact Form** | Customers can send messages saved to the database |
| 🎨 **Responsive Design** | Mobile-friendly layout with smooth fade transitions |

---

## 🔐 Authentication & Roles

### Default Admin Account

The system automatically seeds a default administrator account on first run:

| Field | Value |
|---|---|
| **Username** | `admin` |
| **Password** | `admin123` |
| **Role** | `admin` |

### Customer Registration

- Visitors can click **"🔑 Login / Register"** in the navigation bar to register with their Full Name, Username, Email, and Password (min. 6 characters).
- Once logged in, their name is pre-filled when placing orders in the Cart.

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
| **Security** | Password Hashing (Werkzeug in Python / `password_hash` in PHP) |
| **Fonts** | Google Fonts (Lilita One, Playfair Display) |

---

## 🏗 Architecture (MVC)

This project follows the **Model–View–Controller** pattern:

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                    │
│     app.js handles Auth state, Navigation, & Cart       │
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
        │  (Templates) │         │ *Controller.php│
        └─────────────┘         └───────┬────────┘
                                        │ calls
                                        ▼
                                ┌────────────────┐
                                │   models/      │
                                │ User/Order/Cont│
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
│   ├── User.php                      # User authentication & registration model
│   ├── Order.php                     # Order CRUD + sales summary model
│   └── Contact.php                   # Contact message model
│
├── controllers/
│   ├── AuthController.php            # Login, Register, Logout, Current User logic
│   ├── OrderController.php           # Order API logic
│   └── ContactController.php         # Contact form logic
│
├── views/
│   ├── layouts/
│   │   ├── header.php                # HTML head, meta, CSS link
│   │   └── footer.php                # Footer, JS script tag
│   ├── auth/
│   │   └── modal.php                 # Login / Register tabbed popup modal
│   ├── home.php                      # Hero, approach cards, CTA
│   ├── menu.php                      # All menu categories & items
│   ├── cart.php                      # Shopping cart & receipt
│   ├── about.php                     # About us section
│   ├── contact.php                   # Contact form
│   └── admin/
│       ├── dashboard.php             # Admin order table (role protected)
│       └── sales_summary.php         # Sales report (daily/monthly/yearly)
│
├── public/
│   ├── css/
│   │   └── style.css                 # All styles (organized by component + Auth)
│   ├── js/
│   │   └── app.js                    # All client-side logic & Auth management
│   └── images/                       # Product & branding images (52 files)
│
├── api/
│   ├── register.php                  # POST — Register new user
│   ├── login.php                     # POST — Log in user
│   ├── logout.php                    # POST — Log out user
│   ├── current_user.php              # GET  — Get current session user
│   ├── submit_order.php              # POST — Create new order
│   ├── fetch_orders.php              # GET  — List all orders
│   ├── delete_order.php              # POST — Delete single order
│   ├── clear_orders.php              # POST — Delete all orders
│   └── save_contact.php              # POST — Save contact message
│
└── team/                             # Team member photos (10 members)
```

---

## ⚡ Quick Start (Python + SQLite — No XAMPP Needed)

The fastest and easiest way to run the entire website with full database functionality without installing XAMPP.

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

- The SQLite database (`database/mr_boy.db`) and tables (`users`, `orders`, `contact_messages`) are **automatically created**.
- Default administrator account (`admin` / `admin123`) is seeded automatically.

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

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(150) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
| `POST` | `/api/register.php` | Register new customer account (`username`, `email`, `password`, `fullname`) |
| `POST` | `/api/login.php` | Authenticate user (`username` or `email`, `password`) |
| `POST` | `/api/logout.php` | Terminate user session |
| `GET` | `/api/current_user.php` | Retrieve current authenticated user |
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
