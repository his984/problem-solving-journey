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
// CREATE TASK / EDIT TASK
createTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (currentEditingIndex === null) {
    tasks.push({
      taskName: inputTaskName.value,
      taskDate: inputTaskDate.value,
    });
    renderTasks();
  } else {
    tasks[currentEditingIndex].taskName = inputTaskName.value;
    tasks[currentEditingIndex].taskDate = inputTaskDate.value;
    renderTasks();
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
    return;
  } else if (event.target.closest(".btn-edit-task")) {
    currentEditingIndex = index;
    inputTaskName.value = tasks[index].taskName;
    inputTaskDate.value = tasks[index].taskDate;

    createTaskBtn.textContent = "Update task";
    createTaskBtn.style.background = "green";
  }
});
