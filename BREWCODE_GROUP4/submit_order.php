<?php
header("Content-Type: application/json");

// 1. Database Connection
$servername = "sql205.infinityfree.com";
$username = "if0_41204291";
$password = "CPPROG123";
$dbname = "if0_41204291_mr_boy_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// 2. Kunin ang JSON data mula sa Fetch body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    // Kunin ang mga values mula sa JSON
    $customer_name = $conn->real_escape_string($data['customer_name']);
    $order_details = $conn->real_escape_string($data['order_details']);
    $total_price = $conn->real_escape_string($data['total_price']);

    // 3. I-insert sa table
    // Tandaan: customer_name ang gamit natin base sa latest screenshot mo
    $sql = "INSERT INTO orders (customer_name, order_details, total_price) 
            VALUES ('$customer_name', '$order_details', '$total_price')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Order saved to database."]);
    } else {
        echo json_encode(["status" => "error", "message" => "SQL Error: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No data received."]);
}

$conn->close();
?>