<?php
$conn = mysqli_connect('localhost','root','','db');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>