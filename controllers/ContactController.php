<?php
/**
 * ContactController
 * 
 * Processes contact form submissions
 * and delegates to the Contact model.
 */

require_once __DIR__ . '/../models/Contact.php';

class ContactController {

    /**
     * Handle contact form submission (POST form data).
     */
    public static function submit() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Location: ../index.php');
            exit();
        }

        $name    = $_POST['name']    ?? '';
        $email   = $_POST['email']   ?? '';
        $contact = $_POST['contact'] ?? '';
        $message = $_POST['message'] ?? '';

        if (empty($name) || empty($email) || empty($message)) {
            echo "<script>
                    alert('Please fill in all required fields.');
                    window.history.back();
                  </script>";
            return;
        }

        $result = Contact::create($name, $email, $contact, $message);

        if ($result['status'] === 'success') {
            echo "<script>
                    alert('Thank you! Your message has been sent.');
                    window.location.href='../index.php';
                  </script>";
        } else {
            echo "<script>
                    alert('Error: " . addslashes($result['message']) . "');
                    window.history.back();
                  </script>";
        }
    }

    /**
     * Fetch all contacts as JSON.
     */
    public static function fetchContacts() {
        header('Content-Type: application/json');
        $messages = Contact::fetchAll();
        echo json_encode($messages);
    }

    /**
     * Delete contact message (POST JSON).
     */
    public static function deleteContact() {
        header('Content-Type: application/json');
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $id = $data['id'] ?? 0;

        if (!$id) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid message ID.']);
            return;
        }

        $result = Contact::delete((int)$id);
        echo json_encode($result);
    }

    /**
     * Mark message as read/unread (POST JSON).
     */
    public static function markRead() {
        header('Content-Type: application/json');
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (!empty($data['mark_all'])) {
            $result = Contact::markAllRead();
            echo json_encode($result);
            return;
        }

        $id = $data['id'] ?? 0;
        $isRead = isset($data['is_read']) ? (bool)$data['is_read'] : true;

        if (!$id) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid message ID.']);
            return;
        }

        $result = Contact::markRead((int)$id, $isRead);
        echo json_encode($result);
    }
}
