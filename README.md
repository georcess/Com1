# ☕ Mr. Boy SpecialTea — Online Ordering System

> A full-stack web ordering system built with **React, Tailwind CSS & shadcn/ui**, featuring User Authentication, Product Search, Shopping Cart, Receipt Generation, and Protected Admin Order Management for **Mr. Boy SpecialTea** (Dela Costa V, Burgos Montalban, Rodriguez, Rizal, Philippines).

---

## 📋 Table of Contents

- [About](#about)
- [Modern Frontend with shadcn/ui](#-modern-frontend-with-shadcnui)
- [Features](#features)
- [Authentication & Roles](#-authentication--roles)
- [Menu Categories](#menu-categories)
- [Tech Stack](#tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#project-structure)
- [Quick Start (Python + SQLite + shadcn Frontend)](#-quick-start-python--sqlite--shadcn-frontend)
- [Frontend Development Mode](#-frontend-development-mode)
- [Alternative Setup (PHP + XAMPP / MySQL)](#-alternative-setup-php--xampp--mysql)
- [API Endpoints](#-api-endpoints)
- [Development Team](#-development-team)
- [Contact](#-contact)
- [License](#-license)

---

## 📖 About

**Mr. Boy SpecialTea** is a beloved local tea and coffee shop offering premium handcrafted drinks at affordable everyday prices. This project delivers a high-performance, responsive web application where:

- Customers can **register accounts**, **log in**, **search flavors live**, add items with customized sizes & add-ons to their cart, and generate formatted printable receipts.
- Store administrators can **log in securely**, view incoming customer orders in real time, mark orders as done, clear records, and monitor revenue analytics.

---

## 🎨 Modern Frontend with shadcn/ui

The frontend has been rebuilt from the ground up using **shadcn/ui** and **Tailwind CSS**:

- 💎 **shadcn UI Components:** Cards, Dialogs, Buttons, Tabs, Inputs, Badges, and Tables built on accessible Radix UI primitives.
- 🔍 **Live Search:** Instant filtering across all 45+ flavors and categories.
- ⚡ **Toast Notifications:** Instant feedback when items are added to the cart.
- 👥 **Team Showcase:** Dedicated section honoring the 10 student creators from BREWCODE Group 4 with their actual photos.
- 📱 **Fully Responsive:** Seamless layout across mobile phones, tablets, laptops, and wide screens.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **shadcn/ui Design** | Premium component design with warm coffee & tea brand palette |
| 🔍 **Live Menu Search** | Real-time search across Milktea, Coffee, Fruit Tea, Frappe, Hot Cups, and Snacks |
| 🔐 **User Authentication** | Tabbed Login & Register modal with password hashing & session management |
| 👤 **User Profiles & Roles** | Automatic distinction between Customers and Administrators |
| 🏠 **Interactive Hero** | Modern banner with drink badges, logo, and "Our Approach" grid |
| 🛒 **Cart & Stepper** | Add items, pearl add-ons (₱9), auto-fill customer name, view totals |
| 🧾 **Receipt Generation** | On-screen official receipt popup with itemized list & print support |
| 🔒 **Admin Dashboard** | Order table with live KPIs, completion action, and clear-all records |
| 👥 **Team Showcase** | Dedicated profile cards with photos for BREWCODE Group 4 |
| 📬 **Contact Form** | Customer inquiry form with input validation and feedback |

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

| Layer | Technology |
|---|---|
| **Frontend Framework** | **React 19 + TypeScript + Vite** |
| **UI Components** | **shadcn/ui** (Radix UI Primitives) |
| **Styling** | **Tailwind CSS + Lucide React Icons** |
| **Backend Option 1 (Recommended)** | **Python 3 + Flask + SQLite** (Zero config, no XAMPP required) |
| **Backend Option 2** | **PHP 7+ + MySQL / Apache** (XAMPP / InfinityFree) |
| **Architecture** | MVC / Component-Driven Architecture |

---

## 📁 Project Structure

```
comission/
├── .htaccess                         # Apache DirectoryIndex config
├── .gitignore                        # Git ignore rules (node_modules, db, etc.)
├── README.md                         # Project documentation
├── server.py                         # 🚀 Python + Flask + SQLite backend
│
├── frontend/                         # ⚛️ React + TypeScript + shadcn/ui App
│   ├── index.html                    # Single Page App root
│   ├── package.json                  # React, Radix UI, Tailwind, Lucide dependencies
│   ├── vite.config.ts                # Vite config with path aliases & API proxy
│   ├── tailwind.config.js            # Tailwind config with shadcn design tokens
│   └── src/
│       ├── types.ts                  # TypeScript definitions
│       ├── lib/utils.ts              # shadcn clsx/tailwind-merge utility
│       ├── data/menu.ts              # Complete 45+ drink & snack data
│       ├── components/
│       │   ├── ui/                   # shadcn primitives (Button, Card, Dialog, Tabs, etc.)
│       │   ├── Navbar.tsx            # Sticky header with cart badge & auth profile
│       │   ├── Hero.tsx              # Modern hero banner & Approach grid
│       │   ├── Menu.tsx              # Live search, category pills, product cards
│       │   ├── Cart.tsx              # Cart review, add-ons, name autofill
│       │   ├── ReceiptModal.tsx      # Printable receipt dialog
│       │   ├── Team.tsx              # BREWCODE Group 4 showcase
│       │   ├── About.tsx             # Mission & store location
│       │   ├── Contact.tsx           # Contact message form
│       │   ├── AdminDashboard.tsx    # Role-protected order manager & KPIs
│       │   └── AuthModal.tsx         # Login / Register tabbed dialog
│       ├── App.tsx                   # Main state & view coordinator
│       └── main.tsx                  # React DOM mount
│
├── config/
│   └── database.php                  # PHP DB config (local/production toggle)
├── models/                           # PHP MVC models (User, Order, Contact)
├── controllers/                      # PHP MVC controllers (AuthController, OrderController)
├── views/                            # PHP MVC view partials
├── api/                              # REST API endpoints (PHP)
│   ├── register.php
│   ├── login.php
│   ├── logout.php
│   ├── current_user.php
│   ├── submit_order.php
│   ├── fetch_orders.php
│   ├── delete_order.php
│   ├── clear_orders.php
│   └── save_contact.php
│
├── public/
│   ├── images/                       # Product & branding pictures (52 files)
│   └── team/                         # Team member photos (10 members)
└── team/                             # Original team photos
```

---

## ⚡ Quick Start (Python + SQLite + shadcn Frontend)

The fastest way to run the application with the modern shadcn frontend and database:

### 1. Install Python Flask

```bash
pip install flask
```

### 2. Start the Server

```bash
python server.py
```

### 3. Open in Browser

Go to: **[http://localhost:5000](http://localhost:5000)**

- The SQLite database (`database/mr_boy.db`) and admin credentials are set up **automatically**.
- The compiled **React + shadcn/ui** interface is served directly.

---

## 💻 Frontend Development Mode

If you want to run Vite with Hot Module Replacement (HMR):

```bash
cd frontend
npm install
npm run dev
```

Open: **[http://localhost:5173](http://localhost:5173)** (Proxy points to Flask on port 5000).

---

## 🐘 Alternative Setup (PHP + XAMPP / MySQL)

If running in a PHP/XAMPP environment:

1. Copy the `comission` folder to `C:\xampp\htdocs\comission\`
2. Create database `mr_boy_db` in phpMyAdmin (`http://localhost/phpmyadmin`)
3. Open `http://localhost/comission/`

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

## 👥 Development Team

**BREWCODE — Group 4**

| Member | Role |
|---|---|
| **Apolonio** | Project Developer |
| **Apuyan** | Full Stack & UI |
| **Cañete** | Frontend Specialist |
| **Jerez, Ayiza** | System Architect |
| **Obosa** | Database Engineer |
| **Refalpa, Jona Mae** | UI/UX Designer |
| **Ricafranca** | Quality Assurance |
| **Rogel** | Backend Developer |
| **Toledo** | System Documentation |
| **Vargas** | Lead Developer |

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
