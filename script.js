const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load todos on startup
loadTodos();

// Add new todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
        todoInput.value = "";
    }
});

// Add todo (DOM + storage)
function addTodo(text) {
    const todo = { text, completed: false };

    // Add to DOM
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Toggle completion
    li.querySelector("span").addEventListener("click", () => {
        li.classList.toggle("completed");
        updateTodoStatus(text);
    });

    // Delete
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        removeTodo(text);
    });

    todoList.appendChild(li);

    // Save to storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Update completion status
function updateTodoStatus(text) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todo = todos.find(t => t.text === text);
    if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

// Remove todo
function removeTodo(text) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(t => t.text !== text);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.innerHTML = `
            <span>${todo.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        li.querySelector("span").addEventListener("click", () => {
            li.classList.toggle("completed");
            updateTodoStatus(todo.text);
        });

        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
            removeTodo(todo.text);
        });

        todoList.appendChild(li);
    });
}
document.querySelectorAll('.todo-item').forEach(item => {
    item.style.transform = `rotateY(${Math.random() * 10 - 5}deg)`;
});