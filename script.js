// To-Do List: vanilla JavaScript (DOM manipulation, events, state)

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const errorMsg = document.querySelector("#error");
const list = document.querySelector("#task-list");
const emptyMsg = document.querySelector("#empty");
const counter = document.querySelector("#counter");
const filterButtons = document.querySelectorAll(".filter");
const clearBtn = document.querySelector("#clear-completed");

const STORAGE_KEY = "todo-tasks";

// State: an array of { id, text, done }
let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (err) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    // Storage unavailable: the app still works, just without saving
  }
}

// Render the list from state (UI updates instantly, no reload)
function render() {
  list.innerHTML = "";

  const visible = tasks.filter((task) => {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "completed") return task.done;
    return true;
  });

  visible.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " completed" : "");
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark task complete");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text; // textContent avoids HTML injection

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";

    li.append(checkbox, span, removeBtn);
    list.appendChild(li);
  });

  emptyMsg.hidden = visible.length > 0;
  updateCounter();
}

function updateCounter() {
  const remaining = tasks.filter((t) => !t.done).length;
  if (tasks.length === 0) {
    counter.textContent = "No tasks yet";
  } else {
    counter.textContent = `${remaining} of ${tasks.length} task${tasks.length === 1 ? "" : "s"} left`;
  }
}

function addTask(text) {
  tasks.push({ id: Date.now().toString() + Math.random().toString(16).slice(2), text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.done = !task.done;
  saveTasks();
  render();
}

function removeTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

// Add task (form submit also handles the Enter key)
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const text = input.value.trim();

  if (text === "") {
    errorMsg.hidden = false;
    input.focus();
    return;
  }

  errorMsg.hidden = true;
  addTask(text);
  input.value = "";
  input.focus();
});

input.addEventListener("input", () => {
  errorMsg.hidden = true;
});

// Event delegation: one listener on the list handles every task
list.addEventListener("click", (event) => {
  const li = event.target.closest(".task");
  if (!li) return;
  const id = li.dataset.id;

  if (event.target.classList.contains("remove-btn")) {
    removeTask(id);
  } else if (event.target.matches("input[type='checkbox']") || event.target.classList.contains("task-text")) {
    toggleTask(id);
  }
});

// Filters
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  render();
});

render();
