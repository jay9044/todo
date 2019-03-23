//Define UI vars
const form = document.querySelector("form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const submitButton = document.querySelector(".btn");

//Load all event listeners
loadEventListeners();

//L Load all event listeners
function loadEventListeners() {
  //DOM LOAD EVENT
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  tasklist.addEventListener("click", removeTask);
  //clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks
  filter.addEventListener("keyup", filterTasks);
}
//get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    // if there is no tasks
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  for (let task of tasks) {
    //create li element
    const li = document.createElement("li");
    // add a class
    li.className = "collection-item";
    //create textnode and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    //add icon hmtl
    link.innerHTML = '<i class=" fa fa-remove" />';
    //append link to the li
    li.appendChild(link);
    //append the li to the ul
    tasklist.appendChild(li);
  }
}

//AddTask - first thing
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  //create li element
  const li = document.createElement("li");
  // add a class
  li.className = "collection-item";
  //create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //add icon hmtl
  link.innerHTML = '<i class=" fa fa-remove" />';
  //append link to the li
  li.appendChild(link);
  //append the li to the ul
  tasklist.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";
  e.preventDefault();
}

// store task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    // if there is no tasks
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove Task - second thing
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();

      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    // if there is no tasks
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  for (let [index, task] of tasks.entries()) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear tasks - third
function clearTasks(e) {
  //   tasklist.innerHTML = "";
  //faster
  while (tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }

  //clear from local S
  clearTaskFromLocalStorage();
}

//clear from local s
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  const lis = document.querySelectorAll(".collection-item");
  for (let li of lis) {
    const item = li.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) li.style.display = "block";
    else li.style.display = "none";
  }
}
