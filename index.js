
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${task}
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button> `;
        list.prepend(li);
    });
}
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") return;

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    let newText = prompt("Edit your task:", tasks[index]);
    if (newText === null || newText.trim() === "") return;
    tasks[index] = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function filters(status) {
    if (status === "completed") {
        return "Task is completed";
    } else if (status === "pending") {
        return "Task is pending";
    } else {
        return "All tasks";
    }
}