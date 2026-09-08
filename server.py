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
from flask import Flask, request, jsonify, send_from_directory, send_file

# ── App Configuration ──────────────────────────────────────────

app = Flask(__name__, static_folder=None)  # We handle static files manually

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH  = os.path.join(BASE_DIR, 'database', 'mr_boy.db')


# ── Database Helpers ───────────────────────────────────────────

def get_db():
    """Get a database connection with row factory."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create tables if they don't exist."""
    os.makedirs(os.path.join(BASE_DIR, 'database'), exist_ok=True)
    conn = get_db()
    conn.executescript('''
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
    conn.commit()
    conn.close()
    print(f"[OK] Database ready at: {DB_PATH}")


# ── Static File Serving ───────────────────────────────────────

@app.route('/')
def index():
    """Serve the main page (index.html for static, or rendered index.php)."""
    # Serve index.html which is a static version of the site
    return send_file(os.path.join(BASE_DIR, 'index.html'))


@app.route('/public/<path:filename>')
def serve_public(filename):
    """Serve static assets (CSS, JS, images)."""
    return send_from_directory(os.path.join(BASE_DIR, 'public'), filename)


# ── API: Orders ───────────────────────────────────────────────

@app.route('/api/submit_order.php', methods=['POST'])
def submit_order():
    """Create a new order."""
    data = request.get_json()
    if not data:
        return jsonify({'status': 'error', 'message': 'No data received.'}), 400

    customer_name = data.get('customer_name', '').strip()
    order_details = data.get('order_details', '').strip()
    total_price   = data.get('total_price', 0)

    if not customer_name or not order_details:
        return jsonify({'status': 'error', 'message': 'Missing required fields.'}), 400

    conn = get_db()
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
