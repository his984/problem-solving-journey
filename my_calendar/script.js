"use strict";

// --- 1. DOM Elements ---
const inputTaskName = document.getElementById("input-task-name");
const inputTaskDate = document.getElementById("input-task-date");
const tasksList = document.getElementById("tasks-list");
const createTaskBtn = document.querySelector(".btn-create-task");

// --- 2. State Variables ---
let tasks = [];
let currentEditingIndex = null;

// --- 3. Initialization ---
// Load tasks from localStorage when the app starts
function loadTasks() {
  const savedTasksJSON = localStorage.getItem("tasks");
  if (savedTasksJSON !== null) {
    tasks = JSON.parse(savedTasksJSON);
  }
  renderTasks();
}

// --- 4. State Modification Functions ---

function addTask(name, date) {
  if (!name || !date) {
    alert("Task name and date cannot be empty.");
    return;
  }
  // Add the new property for the reminder state
  tasks.push({ taskName: name, taskDate: date, isReminderSet: false });
  clearInputsAndResetButton();
}

function updateTask(index, name, date) {
  if (!name || !date || index === null) return;
  const task = tasks[index];
  task.taskName = name;
  task.taskDate = date;
  // Note: We don't reset isReminderSet here, so it persists through edits.
  clearInputsAndResetButton();
  currentEditingIndex = null;
}

function deleteTask(index) {
  tasks.splice(index, 1);
}

// --- 5. UI & State Helper Functions ---

function renderTasks() {
  tasksList.innerHTML = "";
  let tasksHTML = "";
  tasks.forEach((task, index) => {
    // Check the reminder state to add the 'active' class conditionally
    const reminderActiveClass = task.isReminderSet ? "active" : "";
    tasksHTML += `
      <div class="task" data-index="${index}">
        <div class="task-info">
          <p class="task-title">${task.taskName}</p>
          <span class="task-date">${new Date(
            task.taskDate
          ).toLocaleString()}</span>
        </div>
        <div class="actions-btns">
          <button class="btn btn-delete-task" data-action="delete">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
          <button class="btn btn-edit-task" data-action="edit">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
          <button class="btn btn-remind-task ${reminderActiveClass}" data-action="remind">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"/></svg>
          </button>
        </div>
      </div>`;
  });
  tasksList.innerHTML = tasksHTML;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function initEditMode(index) {
  currentEditingIndex = index;
  inputTaskName.value = tasks[index].taskName;
  inputTaskDate.value = tasks[index].taskDate;
  createTaskBtn.textContent = "Update Task";
  createTaskBtn.style.background = "green";
}

function setReminder(index) {
  const task = tasks[index];
  if (!task.taskDate) {
    alert("Please set a date and time for the task first.");
    return;
  }
  const taskDateAndTime = new Date(task.taskDate);
  const now = new Date();
  const diffMs = taskDateAndTime - now;

  if (diffMs <= 0) {
    alert("Cannot set a reminder for a time that has already passed.");
    return;
  }

  setTimeout(() => {
    alert(`Reminder for: ${task.taskName}`);
    // Optional: Reset the reminder state after it fires
    task.isReminderSet = false;
    saveTasks();
    renderTasks();
  }, diffMs);

  // --- Main logic change for this feature ---
  // 1. Update the state
  task.isReminderSet = true;
  // 2. Re-render the UI to show the change
  renderTasks();
  // 3. Save the new state to localStorage
  saveTasks();
  alert("Reminder has been set!");
}

function clearInputsAndResetButton() {
  inputTaskName.value = "";
  inputTaskDate.value = "";
  createTaskBtn.textContent = "Create Task";
  createTaskBtn.style.background = "";
}

// --- 6. Event Listeners ---
createTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const taskName = inputTaskName.value;
  const taskDate = inputTaskDate.value;

  if (currentEditingIndex === null) {
    addTask(taskName, taskDate);
  } else {
    updateTask(currentEditingIndex, taskName, taskDate);
  }

  renderTasks();
  saveTasks();
});

tasksList.addEventListener("click", function (event) {
  const taskElement = event.target.closest(".task");
  if (!taskElement) return;

  const index = taskElement.dataset.index;
  const action = event.target.closest("[data-action]")?.dataset.action;

  if (action === "delete") {
    deleteTask(index);
    renderTasks();
    saveTasks();
  } else if (action === "edit") {
    initEditMode(index);
  } else if (action === "remind") {
    setReminder(index);
  }
});

// --- 7. Initial Load ---
loadTasks();
