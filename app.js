const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener('DOMContentLoaded', getItems);

todoBtn.addEventListener('click', (event) => {
    event.preventDefault(); //prevents form submit
    const $inputEl = todoInput.value;
    todoList.innerHTML += `<div class="todo">
        <li class="todo-item">${$inputEl}</li>
        <button class="complete-btn"><i class="fas fa-check"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>` 
    todoInput.value = ''

    localStore($inputEl);
});


todoList.addEventListener('click', (event)=> {
    const item = event.target;
    
    if(item.classList[0] === 'delete-btn'){
        item.parentElement.classList.add("done")
    }
    deleteItems(item.parentElement)
    const done = document.querySelectorAll(".done");
    done.forEach(item => item.remove());
    
    if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle("completed");
    }

});


function checkStatus(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos
}

function localStore(items) {
    const todos = checkStatus()
    todos.push(items)
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getItems(){
    const todos = checkStatus()
    todos.forEach(el => {
        const $inputEl = el;
        todoList.innerHTML += `<div class="todo">
        <li class="todo-item">${$inputEl}</li>
        <button class="complete-btn"><i class="fas fa-check"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>`

    })
}

function deleteItems(item){
    const todos = checkStatus()
    const todo_index = item.children[0].innerText;
    todos.splice(todos.indexOf(todo_index), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}



