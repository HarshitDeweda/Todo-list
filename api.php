<?php
include 'db.php';

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

if ($action == 'add') {
    $task_name = $_POST['task_name'];
    if (empty($task_name)) {
        echo json_encode(['error' => 'Task name cannot be empty']);
        exit;
    }
    $sql = "INSERT INTO tasks (task_name) VALUES ('$task_name')";
    $conn->query($sql);
    echo json_encode(['message' => 'Task added successfully']);
}

if ($action == 'list') {
    $sql = "SELECT * FROM tasks ORDER BY 
            CASE WHEN status = 'Pending' THEN 1 ELSE 2 END, 
            created_at ASC";
    $result = $conn->query($sql);
    $tasks = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($tasks);
}


if ($action == 'update') {
    $id = $_POST['id'];
    $task_name = $_POST['task_name'];
    $sql = "UPDATE tasks SET task_name = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $task_name, $id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Task updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update task']);
    }
}

if ($action == 'delete') {
    $id = $_POST['id'];
    $sql = "DELETE FROM tasks WHERE id = $id";
    $conn->query($sql);
    echo json_encode(['message' => 'Task deleted successfully']);
}

if ($action == 'toggle_status') {
    $id = $_POST['id'];
    $current_status = $_POST['status'];
    $new_status = $current_status === 'Pending' ? 'Completed' : 'Pending';
    $sql = "UPDATE tasks SET status = '$new_status' WHERE id = $id";
    $conn->query($sql);
    echo json_encode(['message' => 'Task status updated successfully']);
}

?>
