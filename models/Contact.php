<?php
/**
 * Contact Model
 * 
 * Handles all database operations related to contact messages.
 */

require_once __DIR__ . '/../config/database.php';

class Contact {

    /**
     * Save a contact form message.
     *
     * @param string $name
     * @param string $email
     * @param string $contact
     * @param string $message
     * @return array Response with status and message.
     */
    public static function create($name, $email, $contact, $message) {
        $conn = getConnection();

        $stmt = $conn->prepare(
            "INSERT INTO contact_messages (name, email, contact, message) VALUES (?, ?, ?, ?)"
        );
        $stmt->bind_param('ssss', $name, $email, $contact, $message);

        if ($stmt->execute()) {
            $result = ['status' => 'success', 'message' => 'Message sent successfully.'];
        } else {
            $result = ['status' => 'error', 'message' => 'Error: ' . $stmt->error];
        }

        $stmt->close();
        $conn->close();
        return $result;
    }
}
