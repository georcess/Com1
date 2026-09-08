<?php
// Koneksyon sa iyong InfinityFree Database
$servername = "sql205.infinityfree.com";
$username = "if0_41204291"; 
$password = "CPPROG123";
$dbname = "if0_41204291_mr_boy_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// I-check kung may error sa koneksyon
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Kinukuha ang data mula sa HTML 'name' attributes
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $contact = mysqli_real_escape_string($conn, $_POST['contact']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);

    $sql = "INSERT INTO contact_messages (name, email, contact, message) 
            VALUES ('$name', '$email', '$contact', '$message')";

    if ($conn->query($sql) === TRUE) {
        // Magpapakita ng alert at babalik sa main page
        echo "<script>
                alert('Thank you! Your message has been sent.');
                window.location.href='index.php'; 
              </script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>