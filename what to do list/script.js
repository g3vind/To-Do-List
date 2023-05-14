const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let EDITTodo = null;

// Function to add todo
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your to do");
    return false;
  }

  if (addBtn.value === "EDIT") {
    // Passing the original text to EDITLocalTodos function before EDIT it in the todoList
    LocalTodos(EDITTodo.target.previousElementSibling.innerHTML);
    EDITTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "ADD";
    inputBox.value = "";
  } else {
    //Creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Creating EDIT Btn
    const EDITBtn = document.createElement("button");
    EDITBtn.innerText = "EDIT";
    EDITBtn.classList.add("btn", "EDITBtn");
    li.appendChild(EDITBtn);

    // Creating Delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "DELETE";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

// Function to update : (EDIT/Delete) todo
const updateTodo = (e) => {
  if (e.target.innerHTML === "DELETE") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "EDIT") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "EDIT";
    EDITTodo = e;
  }
};

// Function to save local todo
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get local todo
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      //Creating p tag
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // Creating EDIT Btn
      const EDITBtn = document.createElement("button");
      EDITBtn.innerText = "EDIT";
      EDITBtn.classList.add("btn", "EDITBtn");
      li.appendChild(EDITBtn);

      // Creating Delete Btn
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "DELETE";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

// Function to delete local todo
const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  // Array functions : slice / splice
  console.log(todoIndex);
};

const EDITLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};
// Enter button functionality
var input = document.getElementById("inputBox");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addBtn").click();
  }
});

document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
