let todos = [];
let currentFilter = "all";
let editIndex = null;

// ELEMENTOS
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todos");
const countSpan = document.getElementById("count");
const clearCompletedBtn = document.getElementById("clear-completed");

const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-input");
const cancelEditBtn = document.getElementById("cancel-edit");

// === CREAR TAREA ===
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  todoInput.value = "";

  renderTodos();
});

// === RENDERIZAR LISTA ===
function renderTodos() {
  todoList.innerHTML = "";

  const filtered = todos.filter(todo =>
    currentFilter === "all" ? true :
    currentFilter === "active" ? !todo.completed :
    todo.completed
  );

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
      <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
      <div class="actions">
        <button class="edit-btn" onclick="openEdit(${index})">Editar</button>
        <button class="delete-btn" onclick="deleteTodo(${index})">Eliminar</button>
        <button onclick="toggleComplete(${index})">${todo.completed ? "Desmarcar" : "Completar"}</button>
      </div>
    `;

    todoList.appendChild(li);
  });

  updateCount();
}

// === CAMBIAR ESTADO ===
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// === ELIMINAR ===
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// === CONTADOR ===
function updateCount() {
  const activeCount = todos.filter(t => !t.completed).length;
  countSpan.textContent = `${activeCount} tareas activas`;
}

// === FILTROS ===
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

// === BORRAR COMPLETADAS ===
clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter(t => !t.completed);
  renderTodos();
});

// === EDITAR ===
function openEdit(index) {
  editIndex = index;
  editInput.value = todos[index].text;

  editModal.classList.remove("hidden");
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  todos[editIndex].text = editInput.value.trim();
  editModal.classList.add("hidden");
  renderTodos();
});

cancelEditBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

// Render inicial
renderTodos();
