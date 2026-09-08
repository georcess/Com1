<?php
/**
 * Mr. Boy SpecialTea — Main Entry Point
 * 
 * This is the front controller that assembles all view partials.
 * It follows the MVC pattern: views are in /views, logic in /controllers,
 * and data access in /models.
 */
?>
<?php include 'views/layouts/header.php'; ?>

<div class="page-wrapper">

  <nav>
    <button onclick="showSection('home')">Home</button>
    <button onclick="showSection('menu')">Menu</button>
    <button onclick="showSection('cart')">Order</button>
    <button onclick="showSection('about')">About</button>
    <button onclick="showSection('contact')">Contact</button>
    <button onclick="showSection('admin')" style="background-color: #3b2f2f; color: white;">Admin</button>
  </nav>

  <?php include 'views/home.php'; ?>
  <?php include 'views/menu.php'; ?>
  <?php include 'views/cart.php'; ?>
  <?php include 'views/about.php'; ?>
  <?php include 'views/contact.php'; ?>
  <?php include 'views/admin/dashboard.php'; ?>

</div>

<?php include 'views/layouts/footer.php'; ?>
