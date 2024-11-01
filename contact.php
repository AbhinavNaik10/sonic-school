<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection
    $servername = "localhost"; // Change as needed
    $username = "root"; // Change as needed
    $password = ""; // Change as needed
    $dbname = "db"; // Change as needed

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phoneNo = $_POST['phoneNo'];
    $message = $_POST['message'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO contact (name, email, phoneNo, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phoneNo, $message);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Message sent successfully!";
        // Optionally redirect or display a success message
         header("Location: gavinHome.html");
        // exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
