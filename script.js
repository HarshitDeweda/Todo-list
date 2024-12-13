document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Fetch tasks
    function fetchTasks() {
        fetch("api.php?action=list")
            .then((response) => response.json())
            .then((tasks) => {
                taskList.innerHTML = "";
                tasks.forEach((task) => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <label>
                        <input type="checkbox" onchange="toggleStatus(${task.id}, '${task.status}')" 
                        ${task.status === 'Completed' ? 'checked' : ''}>
                        <span style="text-decoration: ${
                            task.status === 'Completed' ? 'line-through' : 'none'
                        };">${task.task_name}</span>
                    </label>
                        <button onclick="editTask(${task.id}, '${task.task_name}')">Update Task</button>
                        <button onclick="deleteTask(${task.id})">Delete Task</button>
                    `;
                    taskList.appendChild(li);
                });
            });
    }
    
    

    // Add task
    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (!taskName) {
            alert("Task cannot be empty!");
            return;
        }

        fetch("api.php?action=add", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `task_name=${encodeURIComponent(taskName)}`,
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                fetchTasks();
                taskInput.value = "";
            });
    });

    // Delete task
    window.deleteTask = function (id) {
        fetch("api.php?action=delete", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`,
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                fetchTasks();
            });
    };

    // Toggle task status
    window.toggleStatus = function (id, status) {
        fetch("api.php?action=toggle_status", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}&status=${status}`,
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                fetchTasks();
            });
    };
    
    // Edit Task
   // let currentlyEditing = null; // Track the task being edited

    window.editTask=function (id, currentTaskName) {
    // Prevent multiple tasks from being edited simultaneously
  

   // currentlyEditing = id; // Set the current task being edited

    // Find the task element
    const taskElement = document.querySelector(`li button[onclick="editTask(${id}, '${currentTaskName}')"]`).parentNode;

    // Save the current task name in case of cancellation
    const originalTaskName = currentTaskName;

    // Replace task name and buttons with input and save/cancel buttons
    taskElement.innerHTML = `
        <input type="text" id="editTaskInput" value="${currentTaskName}">
        <button onclick="saveTask(${id})">Save</button>
        <button onclick="cancelEdit(${id}, '${originalTaskName}')">Cancel</button>
    `;
}

    
    window.saveTask = function (id) {
        const updatedTaskName = document.querySelector("#editTaskInput").value;
    
        fetch("api.php?action=update", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}&task_name=${encodeURIComponent(updatedTaskName)}`,
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                fetchTasks(); // Refresh task list
            });
    };
    
    window.cancelEdit= function (id, originalTaskName) {
        currentlyEditing = null; // Reset the currently editing task
        fetchTasks();
    
        const taskElement = document.querySelector(`li input#editTaskInput`).parentNode;
    
        // Restore the original task name and buttons
        taskElement.innerHTML = `
            <span>${originalTaskName}</span>
            <button onclick="editTask(${id}, '${originalTaskName}')">Update Task</button>
            <button onclick="deleteTask(${id})">Delete Task</button>
        `;
    }
    

    // Initial fetch
    fetchTasks();
});
