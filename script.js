const todosList = [
    'Schoonmaken',
    'Koken',
    'Kat aandacht geven',
    'Over zin van leven nadenken'
];


const todos = document.querySelector("#todos");
const addTodo = document.querySelector("#newTodo");
const newTodo = document.createElement("li");
const deleteTaskButton = document.createElement("button");
const deleteThisTask = document.querySelector("#deleteMe");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const showCreateTaskButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");


showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

addTodo.addEventListener("click", createTodo);

function createTodo(){
    let inputNewTask = document.getElementById("inputNewTodo");
    let actualNewTask = inputNewTask.value;
    todosList.push(actualNewTask);
    console.log(todosList);

    if (actualNewTask) {
        let task = todosList.indexOf(actualNewTask);
        renderTodos(todosList)
    } else {
        alert('Create a new task');
    }
    
}

function renderTodos(arrayList){
  const DumbWays = document.getElementById("todos");
  DumbWays.innerHTML = "<ul> </ul>";

    for (let i = 0; i < arrayList.length; i++) {
        let li = document.createElement('li');
        li.innerText = arrayList[i];
        todos.appendChild(li);

        const deleteButton = document.createElement('button');
        li.appendChild(deleteButton);
        deleteButton.appendChild(document.createTextNode('delete task'));
        deleteButton.setAttribute('id', i);
        deleteButton.setAttribute('class', "deleteButton");
        console.log(deleteButton.getAttribute("id"));
    }  
    resetDelete()
}

renderTodos(todosList);

function resetDelete() {
  const deleteButtons = document.querySelectorAll('.deleteButton');

  deleteButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        // do something when the button is clicked
        const id = this.getAttribute('id');
        console.log(id);

        todosList.splice(id, 1);

        renderTodos(todosList);
      });
    });

}
