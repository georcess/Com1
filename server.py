"""
Mr. Boy SpecialTea — Flask Backend Server

Replaces the PHP backend with Python + Flask + SQLite.
Provides the same API endpoints so the frontend JS works unchanged.

Usage:
    python server.py

Then open: http://localhost:5000
"""

import os
import sqlite3
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, send_file, session
from werkzeug.security import generate_password_hash, check_password_hash

# ── App Configuration ──────────────────────────────────────────

app = Flask(__name__, static_folder=None)
app.secret_key = os.environ.get('SECRET_KEY', 'mr_boy_specialtea_secret_key_2026_dev')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH  = os.path.join(BASE_DIR, 'database', 'mr_boy.db')


# ── Database Helpers ───────────────────────────────────────────

def get_db():
    """Get a database connection with row factory."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create tables if they don't exist and seed default admin."""
    os.makedirs(os.path.join(BASE_DIR, 'database'), exist_ok=True)
    conn = get_db()
    conn.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            fullname TEXT NOT NULL,
            role TEXT DEFAULT 'customer',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            order_details TEXT NOT NULL,
            total_price REAL NOT NULL,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            contact TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ''')

    # Seed default admin if missing
    admin = conn.execute("SELECT id FROM users WHERE username = 'admin'").fetchone()
    if not admin:
        hashed_pw = generate_password_hash('admin123')
        conn.execute(
            "INSERT INTO users (username, email, password, fullname, role) VALUES (?, ?, ?, ?, ?)",
            ('admin', 'admin@mrboyspecialtea.com', hashed_pw, 'System Administrator', 'admin')
        )
        print("[OK] Seeded default admin account (username: admin / password: admin123)")

    conn.commit()
    conn.close()
    print(f"[OK] Database ready at: {DB_PATH}")


# ── Static File Serving ───────────────────────────────────────

DIST_DIR = os.path.join(BASE_DIR, 'frontend', 'dist')

@app.route('/')
def index():
    """Serve modern React + shadcn frontend if built, or fallback to root index.html."""
    if os.path.exists(os.path.join(DIST_DIR, 'index.html')):
        return send_file(os.path.join(DIST_DIR, 'index.html'))
    return send_file(os.path.join(BASE_DIR, 'index.html'))


@app.route('/assets/<path:filename>')
def serve_dist_assets(filename):
    """Serve compiled Vite React assets."""
    return send_from_directory(os.path.join(DIST_DIR, 'assets'), filename)


@app.route('/public/<path:filename>')
def serve_public(filename):
    """Serve static media assets (images, team photos, etc.)."""
    return send_from_directory(os.path.join(BASE_DIR, 'public'), filename)


# ── API: Auth (Register / Login / Logout / Current User) ───────

@app.route('/api/register.php', methods=['POST'])
@app.route('/api/register', methods=['POST'])
def register():
    """Register a new customer account."""
    data = request.get_json()
    if not data:
        return jsonify({'status': 'error', 'message': 'No data received.'}), 400

    username = data.get('username', '').strip()
    fullname = data.get('fullname', '').strip()
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not username or not fullname or not email or not password:
        return jsonify({'status': 'error', 'message': 'All fields are required.'}), 400

    if len(password) < 6:
        return jsonify({'status': 'error', 'message': 'Password must be at least 6 characters.'}), 400

    if '@' not in email or '.' not in email:
        return jsonify({'status': 'error', 'message': 'Please enter a valid email address.'}), 400

    conn = get_db()
    existing = conn.execute(
        "SELECT id FROM users WHERE username = ? OR email = ?",
        (username, email)
    ).fetchone()

    if existing:
        conn.close()
        return jsonify({'status': 'error', 'message': 'Username or Email is already taken.'}), 400

    hashed_pw = generate_password_hash(password)
    cur = conn.execute(
        "INSERT INTO users (username, email, password, fullname, role) VALUES (?, ?, ?, ?, 'customer')",
        (username, email, hashed_pw, fullname)
    )
    user_id = cur.lastrowid
    conn.commit()
    conn.close()

    user_data = {
        'id': user_id,
        'username': username,
        'email': email,
        'fullname': fullname,
        'role': 'customer'
    }
    session['user'] = user_data

    return jsonify({
        'status': 'success',
        'message': 'Registration successful! Welcome to Mr. Boy SpecialTea.',
        'user': user_data
    })


@app.route('/api/login.php', methods=['POST'])
@app.route('/api/login', methods=['POST'])
def login():
    """Login with username or email."""
    data = request.get_json()
    if not data:
        return jsonify({'status': 'error', 'message': 'No data received.'}), 400

    login_identifier = data.get('username', '').strip()
    password         = data.get('password', '')

    if not login_identifier or not password:
        return jsonify({'status': 'error', 'message': 'Username/Email and Password are required.'}), 400

    conn = get_db()
    user = conn.execute(
        "SELECT id, username, email, password, fullname, role FROM users WHERE username = ? OR email = ?",
        (login_identifier, login_identifier.lower())
    ).fetchone()
    conn.close()

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'status': 'error', 'message': 'Invalid username/email or password.'}), 401

    user_data = {
        'id': user['id'],
        'username': user['username'],
        'email': user['email'],
        'fullname': user['fullname'],
        'role': user['role']
    }
    session['user'] = user_data

    return jsonify({
        'status': 'success',
        'message': f'Welcome back, {user["fullname"]}!',
        'user': user_data
    })


@app.route('/api/logout.php', methods=['POST', 'GET'])
@app.route('/api/logout', methods=['POST', 'GET'])
def logout():
    """Log out current user."""
    session.pop('user', None)
    return jsonify({'status': 'success', 'message': 'Logged out successfully.'})


@app.route('/api/current_user.php', methods=['GET'])
@app.route('/api/current_user', methods=['GET'])
def current_user():
    """Get current session user."""
    user = session.get('user')
    if user:
        return jsonify({'logged_in': True, 'user': user})
    return jsonify({'logged_in': False, 'user': None})


# ── API: Orders ───────────────────────────────────────────────

@app.route('/api/submit_order.php', methods=['POST'])
@app.route('/api/submit_order', methods=['POST'])
def submit_order():
    """Create a new order. Requires authenticated user."""
    data = request.get_json()
    if not data:
        return jsonify({'status': 'error', 'message': 'No data received.'}), 400

    # Verify user authentication via session or provided user_id
    session_user = session.get('user')
    user_id = data.get('user_id')

    conn = get_db()

    authenticated_user = None
    if session_user and session_user.get('id'):
        authenticated_user = session_user
    elif user_id:
        user_row = conn.execute("SELECT id, fullname, username, role FROM users WHERE id = ?", (user_id,)).fetchone()
        if user_row:
            authenticated_user = dict(user_row)

    if not authenticated_user:
        conn.close()
        return jsonify({
            'status': 'error',
            'message': 'You must be logged in to submit an order.',
            'require_auth': True
        }), 401

    customer_name = data.get('customer_name', '').strip() or authenticated_user.get('fullname', '')
    order_details = data.get('order_details', '').strip()
    total_price   = data.get('total_price', 0)

    if not customer_name or not order_details:
        conn.close()
        return jsonify({'status': 'error', 'message': 'Missing required fields.'}), 400

    conn.execute(
        'INSERT INTO orders (customer_name, order_details, total_price) VALUES (?, ?, ?)',
        (customer_name, order_details, total_price)
    )
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Order saved to database.'})


@app.route('/api/fetch_orders.php', methods=['GET'])
def fetch_orders():
    """Fetch all orders, newest first."""
    conn = get_db()
    rows = conn.execute('SELECT * FROM orders ORDER BY order_date DESC').fetchall()
    conn.close()

    orders = []
    for row in rows:
        orders.append({
            'id': row['id'],
            'customer_name': row['customer_name'],
            'order_details': row['order_details'],
            'total_price': row['total_price'],
            'order_date': row['order_date'],
        })

    return jsonify(orders)


@app.route('/api/delete_order.php', methods=['POST'])
def delete_order():
    """Delete a single order by ID."""
    data = request.get_json()
    order_id = data.get('id', 0) if data else 0

    if not order_id:
        return jsonify({'status': 'error', 'message': 'Invalid order ID.'}), 400

    conn = get_db()
    conn.execute('DELETE FROM orders WHERE id = ?', (order_id,))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Order deleted.'})


@app.route('/api/clear_orders.php', methods=['POST'])
def clear_orders():
    """Delete all orders."""
    conn = get_db()
    conn.execute('DELETE FROM orders')
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'All orders cleared.'})


# ── API: Contact ──────────────────────────────────────────────

@app.route('/api/save_contact.php', methods=['POST'])
def save_contact():
    """Save a contact form message."""
    name    = request.form.get('name', '').strip()
    email   = request.form.get('email', '').strip()
    contact = request.form.get('contact', '').strip()
    message = request.form.get('message', '').strip()

    if not name or not email or not message:
        return '''<script>
            alert("Please fill in all required fields.");
            window.history.back();
        </script>'''

    conn = get_db()
    conn.execute(
        'INSERT INTO contact_messages (name, email, contact, message) VALUES (?, ?, ?, ?)',
        (name, email, contact, message)
    )
    conn.commit()
    conn.close()

    return '''<script>
        alert("Thank you! Your message has been sent.");
        window.location.href="/";
    </script>'''


# ── API: Sales Summary ────────────────────────────────────────

@app.route('/views/admin/sales_summary.php')
def sales_summary():
    """Sales summary page."""
    conn = get_db()

    today = conn.execute(
        "SELECT COALESCE(SUM(total_price), 0) as total FROM orders WHERE DATE(order_date) = DATE('now')"
    ).fetchone()['total']

    month = conn.execute(
        "SELECT COALESCE(SUM(total_price), 0) as total FROM orders "
        "WHERE strftime('%m', order_date) = strftime('%m', 'now') "
        "AND strftime('%Y', order_date) = strftime('%Y', 'now')"
    ).fetchone()['total']

    year = conn.execute(
        "SELECT COALESCE(SUM(total_price), 0) as total FROM orders "
        "WHERE strftime('%Y', order_date) = strftime('%Y', 'now')"
    ).fetchone()['total']

    conn.close()

    return f'''<!DOCTYPE html>
    <html>
    <head><title>Mr. Boy Sales Report</title>
    <style>
        body {{ font-family: sans-serif; background: #f6f1ec; padding: 50px; text-align: center; }}
        .box {{ background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: inline-block; }}
        h1 {{ color: #4b2e2e; }}
        .price {{ font-size: 24px; color: #e04300; font-weight: bold; }}
    </style>
    </head>
    <body>
        <div class="box">
            <h1>Sales Report 📊</h1>
            <p>Today's Sales: <span class="price">₱{today:,.2f}</span></p><hr>
            <p>This Month: <span class="price">₱{month:,.2f}</span></p><hr>
            <p>This Year: <span class="price">₱{year:,.2f}</span></p>
        </div>
    </body></html>'''


# ── Main ──────────────────────────────────────────────────────

if __name__ == '__main__':
    init_db()
    print()
    print("== Mr. Boy SpecialTea Server ==")
    print("   http://localhost:5000")
    print("   Press Ctrl+C to stop")
    print()
    app.run(debug=True, port=5000)
