const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskList = document.getElementById('taskList');

// Feladat hozzáadása dátum nélkül
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return; // Ha nincs szöveg, kilép

    const listItem = createTaskElement(taskText, null);
    taskList.appendChild(listItem); // Új feladat hozzáadása a listához

    clearInputs();
}

// Feladat hozzáadása dátummal
function addTaskWithDate() {
    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;

    if (!taskText || !taskDateValue) return; // Ha nincs szöveg vagy dátum, kilép

    const listItem = createTaskElement(taskText, taskDateValue);
    taskList.appendChild(listItem); // Új feladat hozzáadása a listához

    clearInputs();
}

// Feladat elem létrehozása
function createTaskElement(text, date) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${text} ${date ? `<em>(${date})</em>` : ''}</span>
        <div class="actions">
            <button class="complete" onclick="completeTask(this)">Complete</button>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    return listItem;
}

// Feladat kész állapotának kezelése
function completeTask(button) {
    const listItem = button.parentElement.parentElement;
    listItem.classList.toggle('completed');
}

// Feladat szerkesztése
function editTask(button) {
    const listItem = button.parentElement.parentElement;
    const taskText = listItem.querySelector('span');
    const currentText = taskText.textContent.split(' (')[0]; // Csak a szöveget emeli ki, a dátum nélkül
    const newTask = prompt('Edit your task:', currentText);

    if (newTask) {
        const dateMatch = taskText.innerHTML.match(/<em>\((.*?)\)<\/em>/); // Ellenőrzi, van-e dátum
        const existingDate = dateMatch ? dateMatch[1] : null;
        taskText.innerHTML = `${newTask} ${existingDate ? `<em>(${existingDate})</em>` : ''}`;
    }
}

// Feladat törlése
function deleteTask(button) {
    const listItem = button.parentElement.parentElement;
    taskList.removeChild(listItem);
}

// Input mezők ürítése
function clearInputs() {
    taskInput.value = '';
    taskDate.value = '';
}
