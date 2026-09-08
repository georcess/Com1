<?php
$conn = new mysqli("sql205.infinityfree.com", "if0_41204291", "CPPROG123", "if0_41204291_mr_boy_db");
$result = $conn->query("SELECT * FROM orders ORDER BY order_date DESC");
$orders = [];
while($row = $result->fetch_assoc()) {
    $orders[] = $row;
}
echo json_encode($orders);
$conn->close();
?>