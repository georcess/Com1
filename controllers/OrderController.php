<?php
/**
 * OrderController
 * 
 * Processes incoming order-related API requests
 * and delegates to the Order model.
 */

require_once __DIR__ . '/../models/Order.php';

class OrderController {

    /**
     * Handle order submission (POST JSON).
     */
    public static function submit() {
        header('Content-Type: application/json');

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (!$data) {
            echo json_encode(['status' => 'error', 'message' => 'No data received.']);
            return;
        }

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user']) && empty($data['user_id'])) {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Please log in before submitting your order.', 'require_auth' => true]);
            return;
        }

        $customerName = $data['customer_name'] ?? ($_SESSION['user']['fullname'] ?? '');
        $orderDetails = $data['order_details'] ?? '';
        $totalPrice   = $data['total_price']   ?? 0;

        if (empty($customerName) || empty($orderDetails)) {
            echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
            return;
        }

        $result = Order::create($customerName, $orderDetails, $totalPrice);
        echo json_encode($result);
    }

    /**
     * Fetch all orders (GET → JSON).
     */
    public static function fetchAll() {
        header('Content-Type: application/json');
        echo json_encode(Order::getAll());
    }

    /**
     * Delete a single order by ID (POST JSON).
     */
    public static function delete() {
        header('Content-Type: application/json');

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $id   = intval($data['id'] ?? 0);

        if ($id <= 0) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid order ID.']);
            return;
        }

        $success = Order::delete($id);
        echo json_encode([
            'status'  => $success ? 'success' : 'error',
            'message' => $success ? 'Order deleted.' : 'Failed to delete order.',
        ]);
    }

    /**
     * Delete all orders (POST).
     */
    public static function deleteAll() {
        header('Content-Type: application/json');

        $success = Order::deleteAll();
        echo json_encode([
            'status'  => $success ? 'success' : 'error',
            'message' => $success ? 'All orders cleared.' : 'Failed to clear orders.',
        ]);
    }
}
