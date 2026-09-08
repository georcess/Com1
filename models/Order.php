<?php
/**
 * Order Model
 * 
 * Handles all database operations related to orders.
 */

require_once __DIR__ . '/../config/database.php';

class Order {
    
    /**
     * Create a new order.
     *
     * @param string $customerName
     * @param string $orderDetails
     * @param float  $totalPrice
     * @return array Response with status and message.
     */
    public static function create($customerName, $orderDetails, $totalPrice) {
        $conn = getConnection();

        $stmt = $conn->prepare(
            "INSERT INTO orders (customer_name, order_details, total_price) VALUES (?, ?, ?)"
        );
        $stmt->bind_param('ssd', $customerName, $orderDetails, $totalPrice);

        if ($stmt->execute()) {
            $result = ['status' => 'success', 'message' => 'Order saved to database.'];
        } else {
            $result = ['status' => 'error', 'message' => 'SQL Error: ' . $stmt->error];
        }

        $stmt->close();
        $conn->close();
        return $result;
    }

    /**
     * Fetch all orders, newest first.
     *
     * @return array List of order records.
     */
    public static function getAll() {
        $conn = getConnection();

        $sql    = "SELECT * FROM orders ORDER BY order_date DESC";
        $result = $conn->query($sql);
        $orders = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }
        }

        $conn->close();
        return $orders;
    }

    /**
     * Delete an order by ID.
     *
     * @param int $id
     * @return bool
     */
    public static function delete($id) {
        $conn = getConnection();

        $stmt = $conn->prepare("DELETE FROM orders WHERE id = ?");
        $stmt->bind_param('i', $id);
        $success = $stmt->execute();

        $stmt->close();
        $conn->close();
        return $success;
    }

    /**
     * Delete all orders.
     *
     * @return bool
     */
    public static function deleteAll() {
        $conn    = getConnection();
        $success = $conn->query("DELETE FROM orders");
        $conn->close();
        return $success;
    }

    /**
     * Get sales summary (today, this month, this year).
     *
     * @return array Associative array with 'today', 'month', 'year' totals.
     */
    public static function getSalesSummary() {
        $conn = getConnection();

        $today = $conn->query(
            "SELECT SUM(total_price) as total FROM orders WHERE DATE(order_date) = CURDATE()"
        )->fetch_assoc()['total'] ?? 0;

        $month = $conn->query(
            "SELECT SUM(total_price) as total FROM orders 
             WHERE MONTH(order_date) = MONTH(CURDATE()) 
             AND YEAR(order_date) = YEAR(CURDATE())"
        )->fetch_assoc()['total'] ?? 0;

        $year = $conn->query(
            "SELECT SUM(total_price) as total FROM orders 
             WHERE YEAR(order_date) = YEAR(CURDATE())"
        )->fetch_assoc()['total'] ?? 0;

        $conn->close();
        return [
            'today' => $today,
            'month' => $month,
            'year'  => $year,
        ];
    }
}
