# ☕ Mr. Boy SpecialTea — Online Ordering System

> A web-based ordering system for **Mr. Boy SpecialTea**, a milk tea, coffee, and snack shop located at Dela Costa V, Burgos Montalban, Rodriguez, Rizal, Philippines.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Menu Categories](#menu-categories)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Database Setup](#database-setup)
- [Running the Website](#running-the-website)
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
| **Database** | MySQL (via MySQLi) |
| **Fonts** | Google Fonts (Lilita One, Playfair Display) |
| **Hosting** | InfinityFree (production) / XAMPP (local development) |

---

## 📁 Project Structure

```
comission/
├── README.md                    # This file
├── BREWCODE_GROUP4/             # Production-ready version (PHP)
│   ├── .htaccess                # Apache config (DirectoryIndex, rewrites)
│   ├── BREWCODE_GROUP4.php      # Main application (PHP version)
│   ├── BREWCODE_GROUP4.css      # Stylesheet
│   ├── BREWCODE_GROUP4.js       # Client-side JavaScript
│   ├── submit_order.php         # API: Submit new order to DB
│   ├── fetch_orders.php         # API: Fetch all orders from DB
│   ├── get_orders.php           # API: Get orders (alt endpoint)
│   ├── save_contact.php         # API: Save contact form messages
│   ├── sales_summary.php        # Sales report page (daily/monthly/yearly)
│   ├── index2.html              # Alternate landing page
│   └── pictures/                # Product images for this version
├── HTML/
│   └── html.html                # Standalone HTML version (with Admin panel)
├── CSS/
│   └── ccs.css                  # Stylesheet (standalone version)
├── JAVASCRIPT/
│   └── java.js                  # JavaScript (standalone version)
├── PHPDATABASE/
│   ├── submit_order.php         # Order submission (localhost version)
│   ├── fetch_orders.php         # Fetch orders (localhost version)
│   └── get_orders.php           # Get orders (localhost version)
├── CPPROG/                      # Full-stack version (PHP + separated assets)
│   ├── index.php                # Main PHP page
│   ├── ccs.css                  # Stylesheet
│   ├── java.js                  # JavaScript
│   ├── fetch_orders.php         # Fetch orders
│   ├── get_orders.php           # Get orders
│   ├── submit_order.php         # Submit order
│   ├── save_contact.php         # Save contact messages
│   ├── sales_summary.php        # Sales report
│   └── pictures/                # Product images
├── pictures/                    # Shared product & branding images (52 files)
└── TEAM PROFILE/                # Team member photos (10 members)
```

---

## 📋 Prerequisites

### For Local Development (Full PHP + MySQL)

1. **[XAMPP](https://www.apachefriends.org/)** (includes Apache, PHP, MySQL, phpMyAdmin)
   - Or any PHP 7+ environment with MySQL support

2. **Web Browser** (Chrome, Firefox, Edge, etc.)

### For Static Preview (HTML only, no database)

1. **Python 3** (for simple HTTP server) — or just open `html.html` directly in a browser.

---

## 🚀 Setup & Installation

### Option 1: Quick Static Preview (No PHP/Database)

```bash
# Clone or download the project
cd comission

# Serve with Python
python -m http.server 8000 --directory HTML

# Open in browser
# http://localhost:8000/html.html
```

> ⚠️ **Note:** Cart/ordering works (client-side), but submitting orders to the database will fail without a PHP server.

### Option 2: Full Setup with XAMPP

1. **Install XAMPP** from [apachefriends.org](https://www.apachefriends.org/)

2. **Copy the project** to XAMPP's web root:
   ```
   C:\xampp\htdocs\comission\
   ```
   Copy the entire contents of the `BREWCODE_GROUP4/` folder (or `CPPROG/` folder) into this directory.

3. **Start XAMPP** — Launch Apache and MySQL from the XAMPP Control Panel.

4. **Set up the database** (see [Database Setup](#database-setup) below).

5. **Open in browser:**
   ```
   http://localhost/comission/
   ```

---

## 🗄 Database Setup

### 1. Create the Database

Open **phpMyAdmin** (`http://localhost/phpmyadmin`) and run:

```sql
CREATE DATABASE IF NOT EXISTS mr_boy_db;
USE mr_boy_db;
```

### 2. Create the `orders` Table

```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    order_details TEXT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Create the `contact_messages` Table

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

### 4. Update Database Credentials

For **local development**, edit the PHP files and set:

```php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mr_boy_db";
```

> The `PHPDATABASE/` folder already uses localhost credentials. The `BREWCODE_GROUP4/` folder uses InfinityFree production credentials.

---

## ▶️ Running the Website

### Static HTML (Quick Test)

```bash
# From the project root
python -m http.server 8000 --directory HTML
```

Then open: **http://localhost:8000/html.html**

### With XAMPP (Full Features)

1. Start **Apache** and **MySQL** in XAMPP Control Panel
2. Navigate to: **http://localhost/comission/BREWCODE_GROUP4.php**
3. Or if using CPPROG version: **http://localhost/comission/index.php**

---

## 👥 Team

**BREWCODE — Group 4**

| Member | Photo |
|---|---|
| Apolonio | `TEAM PROFILE/APOLONIO.jpeg` |
| Apuyan | `TEAM PROFILE/Apuyan.png` |
| Cañete | `TEAM PROFILE/CAÑETE.jpeg` |
| Jerez, Ayiza | `TEAM PROFILE/JEREZ, AYIZA.jpg` |
| Obosa | `TEAM PROFILE/OBOSA.jpeg` |
| Refalpa, Jona Mae | `TEAM PROFILE/Refalpa, Jona Mae_.jpg` |
| Ricafranca | `TEAM PROFILE/RICAFRANCA_.jpg` |
| Rogel | `TEAM PROFILE/ROGEL.jpg` |
| Toledo | `TEAM PROFILE/TOLEDO.jpg` |
| Vargas | `TEAM PROFILE/VARGAS.png` |

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
