<?php
$conn = new mysqli("localhost", "root", "", "mr_boy_db");
$result = $conn->query("SELECT * FROM orders ORDER BY order_date DESC");
$orders = [];
while($row = $result->fetch_assoc()) {
    $orders[] = $row;
}
echo json_encode($orders);
$conn->close();
?>