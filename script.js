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

function filterTasks(filter) {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex'; 
                break;
            case 'pending':
                if (task.classList.contains('completed')) {
                    task.style.display = 'none'; 
                } else {
                    task.style.display = 'flex'; 
                }
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex'; 
                } else {
                    task.style.display = 'none'; 
                }
                break;
        }
    });
}

function createTaskItem(taskText, isCompleted = false) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2');
    if (isCompleted) taskItem.classList.add('completed');

    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete-btn btn btn-success me-2">✓</button>
            <button class="delete-btn btn btn-danger">✕</button>
        </div>
    `;
    return taskItem;
}

function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskItem(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}

function updateTaskCompletionInLocalStorage(taskItem) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = taskItem.querySelector('span').textContent;

    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = taskItem.classList.contains('completed');
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = taskItem.querySelector('span').textContent;

    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}