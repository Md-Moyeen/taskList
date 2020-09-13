// Define UI Vars
const form = document.querySelector("#task-form");
const clearBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const taskInput = document.getElementById("task");

// loadAllEventListners
loadAllEventListners();

// Function loadAllEventListners
function loadAllEventListners() {
  // DOMContentLoaded Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // addTask Event
  form.addEventListener("submit", addTask);
  // removeTask Event
  taskList.addEventListener("click", removeTask);
  // clearTasks
  clearBtn.addEventListener("click", clearTasks);
  // filterTasks
  filter.addEventListener("keyup", filterTasks);
}

// Function getTasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li Element
    const li = document.createElement("li");
    // Add className to li
    li.className = "collection-item";
    // Create Text Node
    li.appendChild(document.createTextNode(task));

    // Create link Element
    const link = document.createElement("a");
    // Add className to link
    link.className = "delete-item secondary-content";
    // innerHTML to link
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Function addTask
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add task!");
  } else {
    // Create li Element
    const li = document.createElement("li");
    // Add className to li
    li.className = "collection-item";
    // Create Text Node
    li.appendChild(document.createTextNode(taskInput.value));

    // Create link Element
    const link = document.createElement("a");
    // Add className to link
    link.className = "delete-item secondary-content";
    // innerHTML to link
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // addTaskToLocalStorage
    addTaskToLocalStorage(taskInput.value);

    // Clear input field
    taskInput.value = "";
  }

  e.preventDefault();
}

// Function addTaskToLocalStorage
function addTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function removeTask
function removeTask(e) {
  const link = e.target.parentElement;
  if (link.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      link.parentElement.remove();

      // removeTaskFromLocalStorage
      removeTaskFromLocalStorage(link.parentElement);
    }
  }
}

// Function removeTaskFromLocalStorage
function removeTaskFromLocalStorage(itemTask) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (itemTask.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Functin clearTasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clearTasksFromLocalStorage
  clearTasksFromLocalStorage();
}

// Function clearTasksFromLocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Function filterTasks
function filterTasks(e) {
  const filterInputText = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (eachLi) {
    const liTextContent = eachLi.firstChild.textContent;

    if (liTextContent.toLowerCase().indexOf(filterInputText) !== -1) {
      eachLi.style.display = "block";
    } else {
      eachLi.style.display = "none";
    }
  });
}
