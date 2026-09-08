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
}
