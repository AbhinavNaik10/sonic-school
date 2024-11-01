<?php
// Database configuration
$servername = "localhost"; // Change this if your server is different
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "db"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the JSON data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Check if data is not empty
if (empty($data)) {
    echo json_encode(["status" => "error", "message" => "No data received."]);
    exit();
}

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO services (service_name, price, quantity) VALUES (?, ?, ?)");

// Loop through the received services
foreach ($data as $service) {
    $serviceName = $conn->real_escape_string($service['name']);
    $price = floatval($service['price']);
    $quantity = 1; // Set a default quantity if not provided

    // Bind parameters
    $stmt->bind_param("sdi", $serviceName, $price, $quantity);

    // Execute the statement
    if (!$stmt->execute()) {
        echo json_encode(["status" => "error", "message" => "Error storing service: " . $stmt->error]);
        exit();
    }
}

$stmt->close();
$conn->close();
echo json_encode(["status" => "success", "message" => "Services stored successfully!"]);
?>
