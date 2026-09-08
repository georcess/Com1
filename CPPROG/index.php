<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mr.Boy SpecialTea</title>
<link rel="stylesheet" href="ccs.css">
<link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet">
<link rel="icon" sizes="48x48" href="pictures/IMG_2476.jpeg">
<body>

<div class="page-wrapper">

  <nav>
    <button onclick="showSection('home')">Home</button>
    <button onclick="showSection('menu')">Menu</button>
    <button onclick="showSection('cart')">Order</button>
    <button onclick="showSection('about')">About</button>
    <button onclick="showSection('contact')">Contact</button>
  </nav>

  <div id="home" class="section active">
  <header class="hero">
    <div class="hero-text">
      <div class="hero h1"></div>
    </div>
    <section class="logo">
      <img src="pictures/IMG_2476.jpeg" alt="" />
      <h2>Mr. Boy SpecialTea</h2>
      <p>Dela Costa V, Burgos Montalban</p>
    </section>
  </header>

  <section class="light">
    <h2>Our Approach</h2>
    <p>Here's how we make it better.</p>

    <div class="card-grid">
      <div class="card small">
        <h3>Simple Flavors</h3>
        <p>Easy, balanced blends.</p>
      </div>

      <div class="card small">
        <h3>Clean Labels</h3>
        <p>Clear, honest ingredients.</p>
      </div>

      <div class="card small">
        <h3>Ethically Sourced</h3>
        <p>Fair & sustainable farms.</p>
      </div>

      <div class="card small">
        <h3>Balanced Sweetness</h3>
        <p>Naturally brewed, lightly sweetened.</p>
      </div>
    </div>
  </section>

  <section class="cta">
    <p>“Welcome to Mr.Boy SpecialTea. Enjoy the taste of our drinks at an affordable price! From Milk Tea, Fruit Tea, and Coffee!”</p>
    <button id="start-ordering">Start Ordering</button>
  </section>
</div>

<section id="menu" class="section">
  <h2>Menu – Order Now!</h2>

  <div class="categories">
    <button onclick="document.getElementById('milktea-sec').scrollIntoView({behavior: 'smooth'})">MILKTEA 🧋</button>
    <button onclick="document.getElementById('coffee-sec').scrollIntoView({behavior: 'smooth'})">ICED COFFEE</button>
    <button onclick="document.getElementById('fruit-sec').scrollIntoView({behavior: 'smooth'})">FRUIT TEA 🍹</button>
    <button onclick="document.getElementById('frappe-sec').scrollIntoView({behavior: 'smooth'})">FRAPPE 🧋</button>
    <button onclick="document.getElementById('hot-sec').scrollIntoView({behavior: 'smooth'})">HOT CUPS ☕</button>
    <button onclick="document.getElementById('snack-sec').scrollIntoView({behavior: 'smooth'})">SNACKS</button>
  </div>

  <h3 id="milktea-sec" class="menu-title">MILKTEA 🧋</h3>
  <div class="menu-category-grid">
    <div class="menu-item">
      <h3>CreamCheese Purple Taro</h3>
      <img src="pictures/Taro.jpeg" alt="">
      <button onclick="addToCart('CreamCheese Purple Taro 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('CreamCheese Purple Taro 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Matcha</h3>
      <img src="pictures/matcha.jpeg" alt="">
      <button onclick="addToCart('Matcha 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Matcha 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Wintermelon</h3>
      <img src="pictures/wintermelon.jpg" alt="">
      <button onclick="addToCart('Wintermelon 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Wintermelon 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Okinawa</h3>
      <img src="pictures/okinawa.jpg" alt="">
      <button onclick="addToCart('Okinawa 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Okinawa 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Classic Milk Tea</h3>
      <img src="pictures/classicmilkteaa.jpg" alt="">
      <button onclick="addToCart('Classic Milk Tea 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Classic Milk Tea 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Dark Chocolate</h3>
      <img src="pictures/dark choco.jpg" alt="">
      <button onclick="addToCart('Dark Chocolate 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Dark Chocolate 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Salted Caramel</h3>
      <img src="pictures/saltedcaramel.jpg" alt="">
      <button onclick="addToCart('Salted Caramel 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Salted Caramel 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Hokkaido</h3>
      <img src="pictures/hokkaido.jpg" alt="">
      <button onclick="addToCart('Hokkaido 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Hokkaido 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Chocolate Mousse</h3>
      <img src="pictures/chocomousse.jpg" alt="">
      <button onclick="addToCart('Chocolate Mousse 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Chocolate Mousse 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Red Velvet</h3>
      <img src="pictures/redvelvet.jpg" alt="">
      <button onclick="addToCart('Red Velvet 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Red Velvet 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Cookies and Cream</h3>
      <img src="pictures/cookiesandcream.jpg" alt="">
      <button onclick="addToCart('Cookies and Cream 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Cookies and Cream 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Cheesecake</h3>
      <img src="pictures/cheesecake.jpg" alt="">
      <button onclick="addToCart('Cheesecake 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Cheesecake 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Vanilla</h3>
      <img src="pictures/vanilla.jpg" alt="">
      <button onclick="addToCart('Vanilla 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Vanilla 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Thai</h3>
      <img src="pictures/thai.jpg" alt="">
      <button onclick="addToCart('Thai 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Thai 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Strawberry Oreo</h3>
      <img src="pictures/strawberryoreo.jpg" alt="">
      <button onclick="addToCart('Strawberry Oreo 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Strawberry Oreo 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Mango Graham</h3>
      <img src="pictures/manggraham.jpg" alt="">
      <button onclick="addToCart('Mango Graham 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Mango Graham 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Buko Pandan</h3>
      <img src="pictures/bukopandan.jpg" alt="">
      <button onclick="addToCart('Buko Pandan 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Buko Pandan 22oz',39)">22oz ₱39</button>
    </div>
      <div class="menu-item">
      <h3>Avocado</h3>
      <img src="pictures/avocado.jpg" alt="">
      <button onclick="addToCart('Avocado 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Avocado 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Melon</h3>
      <img src="pictures/melon.jpg" alt="">
      <button onclick="addToCart('Melon 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Melon 22oz',39)">22oz ₱39</button>
    </div>
  </div>

  <h2 id="coffee-sec" class="menu-title">ICED COFFEE</h2>
  <div class="menu-category-grid">
    <div class="menu-item">
      <h3>Java Coffee Shot</h3>
      <img src="pictures/coffee.jpeg" alt="">
      <button onclick="addToCart('Java Coffee Shot 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Java Coffee Shot 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Iced Americano</h3>
      <img src="pictures/icedamerano.jpg" alt="">
      <button onclick="addToCart('Iced Americano 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Iced Americano 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Dark Mocha</h3>
      <img src="pictures/darkmocha.jpg" alt="">
      <button onclick="addToCart('Dark Mocha 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Dark Mocha 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Caramel Macchiato</h3>
      <img src="pictures/caramelmacchiato.jpg" alt="">
      <button onclick="addToCart('Caramel Macchiato 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Caramel Macchiato 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>French Vanilla</h3>
      <img src="pictures/frenchvanilla.jpg" alt="">
      <button onclick="addToCart('French Vanilla 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('French Vanilla 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Cafe Latte</h3>
      <img src="pictures/cafelatte.jpg" alt="">
      <button onclick="addToCart('Cafe Latte 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Cafe Latte 22oz',39)">22oz ₱39</button>
    </div>
  </div>

  <h2 id="fruit-sec" class="menu-title">FRUIT TEA 🍹</h2>
  <div class="menu-category-grid">
    <div class="menu-item">
      <h3>Lychee</h3>
      <img src="pictures/lychee.jpeg" alt="">
      <button onclick="addToCart('Lychee 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Lychee 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Passion Fruit</h3>
      <img src="pictures/passionfruit.jpg" alt="">
      <button onclick="addToCart('Passion Fruit 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Passion Fruit 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Strawberry</h3>
      <img src="pictures/strawberry.jpg" alt="">
      <button onclick="addToCart('Strawberry 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Strawberry 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Kiwi</h3>
      <img src="pictures/kiwi.jpg" alt="">
      <button onclick="addToCart('Kiwi 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Kiwi 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Green Apple</h3>
      <img src="pictures/greenapple.jpg" alt="">
      <button onclick="addToCart('Green Apple 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Green Apple 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Grapes</h3>
      <img src="pictures/grapes.jpg" alt="">
      <button onclick="addToCart('Grapes 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Grapes 22oz',39)">22oz ₱39</button>
    </div>
    <div class="menu-item">
      <h3>Blueberries</h3>
      <img src="pictures/blueberries.jpg" alt="">
      <button onclick="addToCart('Blueberries 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Blueberries 22oz',39)">22oz ₱39</button>
    </div>
  </div>

  <h2 id="frappe-sec" class="menu-title">FRAPPE W/ WHIPPED (CREAM-BASED) 🧋</h2>
  <div class="menu-category-grid">
     <div class="menu-item">
      <h3>Blueberry Burst</h3>
      <img src="pictures/blueberryburstfrappee.jpg" alt="">
      <button onclick="addToCart('Blueberry Burst 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Blueberry Burst 22oz',39)">22oz ₱39</button>
    </div>
       <div class="menu-item">
      <h3>Peach Paradise</h3>
      <img src="pictures/peachparadisefrappe.jpg" alt="">
      <button onclick="addToCart('Peach Paradise 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Peach Paradise 22oz',39)">22oz ₱39</button>
    </div>
       <div class="menu-item">
      <h3>Matcha Green Tea</h3>
      <img src="pictures/matchagreenteafrappe.jpg" alt="">
      <button onclick="addToCart('Matcha Green Tea 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Matcha Green Tea 22oz',39)">22oz ₱39</button>
    </div>
     <div class="menu-item">
      <h3>Red Velvet</h3>
      <img src="pictures/redvelvetfrappe.jpg" alt="">
      <button onclick="addToCart('Red Velvet 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Red Velvet 22oz',39)">22oz ₱39</button>
    </div>
     <div class="menu-item">
      <h3>Mango Cheesecake</h3>
      <img src="pictures/mangocheesecake.jpg" alt="">
      <button onclick="addToCart('Mango Cheesecake 16oz',29)">16oz ₱29</button>
      <button onclick="addToCart('Mango Cheesecake 22oz',39)">22oz ₱39</button>
    </div>
  </div>

  <h2 id="hot-sec" class="menu-title">HOT CUPS ☕</h2>
  <div class="menu-category-grid">
    <div class="menu-item">
      <h3>Hot Coffee</h3>
      <img src="pictures/Hotcoffee.jpeg" alt="">
      <button onclick="addToCart('Hot Coffee 12oz',35)">12oz ₱35</button>
    </div>
    <div class="menu-item">
      <h3>Hot Caffe Latte</h3>
      <img src="pictures/hotcafelatte.jpg" alt="">
      <button onclick="addToCart('Hot Caffe Latte 12oz',35)">12oz ₱35</button>
    </div>
    <div class="menu-item">
      <h3>Hot Americano</h3>
      <img src="pictures/hotamericano.jpg" alt="">
      <button onclick="addToCart('Hot Americano 12oz',35)">12oz ₱35</button>
    </div>
    <div class="menu-item">
      <h3>Hot Mocha</h3>
      <img src="pictures/hotmocha.jpg" alt="">
      <button onclick="addToCart('Hot Mocha 12oz',35)">12oz ₱35</button>
    </div>
    <div class="menu-item">
      <h3>Hot French Vanilla</h3>
      <img src="pictures/hotfrenchvanilla.jpg" alt="">
      <button onclick="addToCart('Hot French Vanilla 12oz',35)">12oz ₱35</button>
    </div>
    <div class="menu-item">
      <h3>Hot Caramel Macchiato</h3>
      <img src="pictures/hotcaramelmacchiato.jpg" alt="">
      <button onclick="addToCart('Hot Caramel Macchiato 12oz',35)">12oz ₱35</button>
    </div>
    <div class="menu-item">
      <h3>Hot French Vanilla</h3>
      <img src="pictures/hotfrenchvanilla.jpg" alt="">
      <button onclick="addToCart('Hot French Vanilla 12oz',35)">12oz ₱35</button>
    </div>
  </div>
  <h2 id="snack-sec" class="menu-title">SNACKS</h2>
  <div class="menu-category-grid">
    <div class="menu-item">
      <h3>French Fries</h3>
      <img src="pictures/fries.jpeg" alt="">
      <button onclick="addToCart('French Fries Medium',29)">Medium ₱29</button>
      <button onclick="addToCart('French Fries Large',49)">Large ₱49</button>
    </div>
  </div>
</section>

<style>
  .menu-title {
    color: red;
    padding-top: 70px;
    text-align: center;
    width: 100%;
    display: block;
    clear: both;
  }
  
  .menu-category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px;
    justify-items: center;
  }
</style>

  <section id="cart" class="section">
    <h2>Your Cart 🛒</h2>
    <label for="customer-name"><strong>Customer Name:</strong></label>
    <input type="text" id="customer-name" placeholder="Enter your name">
    <ul id="cart-items"></ul>
    <p><strong>Total:</strong> ₱<span id="cart-total">0</span></p>

    <h3>Add-Ons (Optional)</h3>
    <button id="pearl-btn" onclick="addAddonToLastItem('Pearl', 9)" disabled>Add Pearl ₱9</button>

    <button onclick="showSection('menu')">➕ Add More Items</button>
    <button id="generate-btn" onclick="generateReceipt()" disabled>Generate Receipt</button>
    <button onclick="clearCart()">Cancel Order</button>

    <div id="receipt" style="margin-top:20px; border:1px solid #ccc; padding:10px; display:none;">
      <h3>Receipt 🧾</h3>
      <p><strong>Customer:</strong> <span id="receipt-name"></span></p>
      <ul id="receipt-items"></ul>
      <p><strong>Total:</strong> ₱<span id="receipt-total"></span></p>
      <hr>
      <p style="font-style: italic; text-align:center;">"Mr. Boy SpecialTea"</p>
      <h4 style="text-align:center; color:green;">✅ Thank you for your order! We appreciate your support.</h4>
    </div>
  </section>

  <section id="about" class="section">
    <h2>About Us</h2>
    <p><strong>Our Goal:</strong> To provide high-quality coffee while delivering fast, efficient, and satisfying service.</p>
    <h3>Follow Us</h3>
    <ul>
      <li>Facebook: www.facebook.com/mrboyspecialteadelacostav</li>
      <li>Instagram: @mrboyspecialtea</li>
      <li>Email: mrboyspecialteadelacosta@gmail.com</li>
    </ul>
  </section>

  <section id="contact" class="section">
    <h2>Contact Us</h2>
    <p><strong>Address:</strong> Blk 14 Lot 4 Phase 1 Dela Costa Homes V Burgos Rodriguez Rizal , Rodriguez, Philippines, 1860</p>
    <p><strong>Phone:</strong> 0917 888 4737</p>
    <p><strong>Email:</strong> mrboyspecialteadelacosta@gmail.com</p>
 <form action="save_contact.php" method="POST" class="contact-form">
  <input type="text" name="name" placeholder="Your name" class="form-input" required>
  <input type="email" name="email" placeholder="Your email" class="form-input" required>
  <input type="text" name="contact" placeholder="Your contact" class="form-input" required>
  <textarea name="message" placeholder="Your message" class="form-input" required></textarea>
  <button type="submit" class="submit-button">Submit</button>
</form>
  </section>
</div> ```

<footer>
  <p>© Mr. Boy SpecialTea 2026</p>
</footer>
<script src="java.js"></script>
</body>
</html>