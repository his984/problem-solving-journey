"use strict";
const inputTaskName = document.getElementById("input-task-name");
const inputTaskDate = document.getElementById("input-task-date");
const tasksList = document.getElementById("tasks-list");
const createTaskBtn = document.querySelector(".btn-create-task");
const deleteTask = document.querySelector(".btn-delete-task");
const editTask = document.querySelector(".btn-edit-task");
// VARs
let currentEditingIndex = null;
let tasks = [];
//
const savedTasksJSON = localStorage.getItem("tasks");
if (savedTasksJSON != null) {
  const savedTasksArray = JSON.parse(savedTasksJSON);
  tasks = savedTasksArray;
  renderTasks();
}
// CREATE TASK / EDIT TASK
createTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (currentEditingIndex === null) {
    tasks.push({
      taskName: inputTaskName.value,
      taskDate: inputTaskDate.value,
    });
    renderTasks();
    saveTasks();
  } else {
    tasks[currentEditingIndex].taskName = inputTaskName.value;
    tasks[currentEditingIndex].taskDate = inputTaskDate.value;
    renderTasks();
    saveTasks();
    inputTaskName.value = "";
    inputTaskDate.value = "";
    createTaskBtn.textContent = "Create task";
    createTaskBtn.style.background = "#f0f0f0";
    currentEditingIndex = null;
  }
});

// RENDER TASKS
function renderTasks() {
  tasksList.innerHTML = "";
  tasks.forEach((task, index) => {
    let taskContent = `
    <div class="task" data-index="${index}">
            <p class="task-title">${task.taskName}</p>
            <span class="task-date">${task.taskDate}</span>
            <div class="actions-btns">
            <button class="btn btn-delete-task">
            <svg height="30px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
            </button>
            <button class="btn btn-edit-task">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
            <button class="btn btn-remind-task">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-120h120v-80H520v-120h-80v120H320v80h120v120Zm40 200q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"/></svg>
            </button>
            </div>
          </div>`;
    tasksList.innerHTML += taskContent;
  });
}
// ACTIONS
tasksList.addEventListener("click", function (event) {
  const taskElement = event.target.closest(".task");
  if (!taskElement) {
    return;
  }
  const index = taskElement.dataset.index;
  if (event.target.closest(".btn-delete-task")) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
    return;
  }
  if (event.target.closest(".btn-edit-task")) {
    currentEditingIndex = index;
    inputTaskName.value = tasks[index].taskName;
    inputTaskDate.value = tasks[index].taskDate;

    createTaskBtn.textContent = "Update task";
    createTaskBtn.style.background = "green";
  }
  if (event.target.closest(".btn-remind-task")) {
    const taskDateAndTime = new Date(tasks[index].taskDate);
    console.log(taskDateAndTime);
    const now = new Date();
    const diffMs = taskDateAndTime - now;
    if (diffMs <= 0) {
      alert("time passed!");
      return;
    } else {
      setTimeout(() => alert(`Reminder for: ${tasks[index].taskName}`), diffMs);
    }
  }
});

// SAVE TASKS
function saveTasks() {
  const tasksStr = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksStr);
}
