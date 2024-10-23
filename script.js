const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('#filter-buttons button');

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);

    saveTaskToLocalStorage(taskText);

    taskInput.value = '';
});

taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('complete-btn')) {
        const taskItem = e.target.closest('li');
        taskItem.classList.toggle('completed');
        updateTaskCompletionInLocalStorage(taskItem);
    } else if (e.target.classList.contains('delete-btn')) {
        const taskItem = e.target.closest('li');
        removeTaskFromLocalStorage(taskItem);
        taskItem.remove();
    }
});

// Filtros de tareas
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        filterTasks(this.getAttribute('data-filter'));
    });
});

