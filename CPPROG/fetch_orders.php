<?php
header("Content-Type: application/json");

$servername = "sql205.infinityfree.com";
$username = "if0_41204291";
$password = "CPPROG123";
$dbname = "if0_41204291_mr_boy_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$sql = "SELECT * FROM orders ORDER BY order_date DESC";
$result = $conn->query($sql);

$orders = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode($orders);
$conn->close();
?>