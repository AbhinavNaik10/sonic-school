<?php
session_start();
header('Content-Type: application/json');

// Database connection
$servername = "localhost"; // Change as needed
$username = "root"; // Change as needed
$password = ""; // Change as needed
$dbname = "db"; // Change as needed

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// Get form data
$email = $_POST['email'];
$password = $_POST['password'];

// Query to check if the user exists
$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // User found, valid credentials
    echo json_encode(['success' => true]);
    // Redirect to gavinHome.html
    header("Location: gavinHome.html");
    exit();
} else {
    // Invalid credentials
    echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
}

$conn->close();
?>
