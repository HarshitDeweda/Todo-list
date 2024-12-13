<?php
$host = 'localhost';
$dbname = 'todo_list';
$username = 'root';
$password = '';

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $status = $_GET['status'];

    if ($status === 'completed') {
        $stmt = $conn->prepare("UPDATE todos SET status = 'completed' WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    }
}

header('Location: index.php');
exit;
?>
