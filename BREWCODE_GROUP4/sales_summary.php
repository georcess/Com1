<?php
$servername = "sql205.infinityfree.com";
$username = "if0_41204291"; 
$password = "CPPROG123"; 
$dbname = "if0_41204291_mr_boy_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 1. Total Sales Today
$sql_today = "SELECT SUM(total_price) as total FROM orders WHERE DATE(order_date) = CURDATE()";
$res_today = $conn->query($sql_today);
$today = $res_today->fetch_assoc()['total'] ?? 0;

// 2. Total Sales This Month
$sql_month = "SELECT SUM(total_price) as total FROM orders WHERE MONTH(order_date) = MONTH(CURDATE()) AND YEAR(order_date) = YEAR(CURDATE())";
$res_month = $conn->query($sql_month);
$month = $res_month->fetch_assoc()['total'] ?? 0;

// 3. Total Sales This Year
$sql_year = "SELECT SUM(total_price) as total FROM orders WHERE YEAR(order_date) = YEAR(CURDATE())";
$res_year = $conn->query($sql_year);
$year = $res_year->fetch_assoc()['total'] ?? 0;
?>

<!DOCTYPE html>
<html>
<head>
    <title>Mr. Boy Sales Report</title>
    <style>
        body { font-family: sans-serif; background: #f6f1ec; padding: 50px; text-align: center; }
        .box { background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: inline-block; }
        h1 { color: #4b2e2e; }
        .price { font-size: 24px; color: #e04300; font-weight: bold; }
    </style>
</head>
<body>
    <div class="box">
        <h1>Sales Report 📊</h1>
        <p>Today's Sales: <span class="price">₱<?php echo number_format($today, 2); ?></span></p>
        <hr>
        <p>This Month: <span class="price">₱<?php echo number_format($month, 2); ?></span></p>
        <hr>
        <p>This Year: <span class="price">₱<?php echo number_format($year, 2); ?></span></p>
    </div>
</body>
</html>