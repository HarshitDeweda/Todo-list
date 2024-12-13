<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>

        <!-- Add Task Form -->
        <form id="taskForm">
            <input type="text" id="taskInput" placeholder="Enter a task" required>
            <button type="submit">Add Task</button>
        </form>

        <!-- Task List -->
        <ul id="taskList"></ul>
    </div>

    <script src="script.js"></script>
</body>
</html>
