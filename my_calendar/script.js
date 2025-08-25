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
  if (!name || !date) return; // Simple validation
  tasks.push({ taskName: name, taskDate: date });
  clearInputsAndResetButton();
}

function updateTask(index, name, date) {
  if (!name || !date || index === null) return;
  tasks[index].taskName = name;
  tasks[index].taskDate = date;
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
    tasksHTML += `
      <div class="task" data-index="${index}">
        <p class="task-title">${task.taskName}</p>
        <span class="task-date">${task.taskDate}</span>
        <div class="actions-btns">
          <button class="btn btn-delete-task" data-action="delete">Del</button>
          <button class="btn btn-edit-task" data-action="edit">Edit</button>
          <button class="btn btn-remind-task" data-action="remind">🔔</button>
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
  const taskDateStr = tasks[index].taskDate;
  if (!taskDateStr) {
    alert("Please set a date and time for the task first.");
    return;
  }
  const taskDateAndTime = new Date(taskDateStr);
  const now = new Date();
  const diffMs = taskDateAndTime - now;

  if (diffMs <= 0) {
    alert("Cannot set a reminder for a time that has already passed.");
    return;
  }
  setTimeout(() => {
    alert(`Reminder for: ${tasks[index].taskName}`);
  }, diffMs);
}

function clearInputsAndResetButton() {
  inputTaskName.value = "";
  inputTaskDate.value = "";
  createTaskBtn.textContent = "Create Task";
  createTaskBtn.style.background = ""; // Reverts to CSS default
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
  const action = event.target.dataset.action;

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
