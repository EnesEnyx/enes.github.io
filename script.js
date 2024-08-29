// script.js

let currentCategory = 'calisma'; // Varsayılan kategori
loadTasks();

document.getElementById('addTaskButton').addEventListener('click', addTask);

document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.getAttribute('data-category');
        document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadTasks();
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Lütfen bir görev girin.');
        return;
    }

    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    saveTasksToStorage(tasks);
    taskInput.value = '';
    loadTasks();
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasksFromStorage();

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
        });

        listItem.appendChild(deleteButton);
        listItem.addEventListener('click', () => {
            toggleTaskCompletion(index);
        });

        if (task.completed) {
            listItem.classList.add('completed');
        }

        taskList.appendChild(listItem);
    });
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem(currentCategory);
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem(currentCategory, JSON.stringify(tasks));
}

function deleteTask(index) {
    const tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    loadTasks();
}

function toggleTaskCompletion(index) {
    const tasks = getTasksFromStorage();
    tasks[index].completed = !tasks[index].completed;
    saveTasksToStorage(tasks);
    loadTasks();
}
