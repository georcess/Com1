<?php
/**
 * API: Toggle Product Availability
 */
require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$productId = trim($data['product_id'] ?? '');
$isAvailable = isset($data['is_available']) ? (bool)$data['is_available'] : true;

if (empty($productId)) {
    echo json_encode(['status' => 'error', 'message' => 'Product ID is required.']);
    exit();
}

$conn = getConnection();
$sql = "CREATE TABLE IF NOT EXISTS product_availability (
    product_id VARCHAR(100) PRIMARY KEY,
    is_available TINYINT(1) DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
$conn->query($sql);

$intVal = $isAvailable ? 1 : 0;
$stmt = $conn->prepare("INSERT INTO product_availability (product_id, is_available) VALUES (?, ?) ON DUPLICATE KEY UPDATE is_available = ?");
$stmt->bind_param('sii', $productId, $intVal, $intVal);
$res = $stmt->execute();
$stmt->close();
$conn->close();

if ($res) {
    $statusText = $isAvailable ? 'available' : 'sold out / unavailable';
    echo json_encode([
        'status' => 'success',
        'message' => "Product '$productId' is now marked as $statusText.",
        'product_id' => $productId,
        'is_available' => $isAvailable
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update product availability.']);
}
