// this array holds all the tasks that are added to the page
const myOneFaithfulArray = [
    {
        name : "Test",
        day : 6,
        dontForget : "yes",
        completed : false
    }, {
        name : "NR 2",
        day : 7,
        dontForget : "no",
        completed: false
    }, {
        name : "blub blub",
        day : 0,
        dontForget : "yes",
        completed : false,
    }
];

// 3 selectors for 3 different ul's
const todayToDos = document.querySelector("#todayToDoList");
const tomorrowToDos = document.querySelector('#tomorrowToDoList');
const dayAfterToDos = document.querySelector('#dayAfterToDoList');
const myDontForgetList = document.querySelector('#dontForgetThese');
// selects button to add a new todo
const addTodo = document.querySelector("#newTodo");

// new task dialog selector
const dialog = document.querySelector("dialog");
const showDialog = document.querySelector("dialog + button");
const showCreateTaskButton = document.querySelector("dialog + button");
const closeDialog = document.querySelector("dialog button");

// manage selectors for the manage options next to the tasks
const manager = document.querySelector("#MrManager");
const closeManager = document.getElementById('closeManager');

//date selector to be able to have a day next to the days and to sort tasks per day
const today = new Date();
const dayToday = today.getDay();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// adds event listeners so you can open and close the "add new task" dialog
showDialog.addEventListener("click", function() {
  dialog.showModal();
});

closeDialog.addEventListener("click", function() {
    dialog.close();
});

function closeDialogPlz () {
    dialog.close();
};

// on click sents you to createTodo function to add a new task
addTodo.addEventListener("click", createTodo);

// Function that checks which value is put into the "create new task" dialog and which day it is put into to add it to the task array
function createTodo() {
    // selects the input from "create a new task" and collects its value in another variable called 'actualNewTask'
    let inputNewTask = document.getElementById("AddTask");
    let actualNewTask = inputNewTask.value;
    // selects the day that has been selected in "create a new task" and this day will be put in a variable which will be put into the object with all the information of the task
    let daySelected = document.getElementsByName('WhichDay');
    if (document.getElementById('chooseToday').checked) {
        var thisDay = dayToday;
    } else if (document.getElementById('chooseTomorrow').checked) {
        var thisDay = dayToday + 1;
    } else if (document.getElementById('chooseDayAfter').checked) {
        var thisDay = dayToday + 2;
    }
    // object with al the information of the new task, has the name (value of the 1st input), the day (value of the 2nd input) and whether or not it is completed. 
    const addAToDo = {
        name : actualNewTask,
        day : thisDay,
        dontForget : "no",
        completed : false
    };
    // does a last check to make sure the task has a name and date before it get sends to the task array
    if (actualNewTask && daySelected) {
        myOneFaithfulArray.push(addAToDo);
        inputNewTask.value = "";
        closeDialogPlz();
    } else {
        alert('Create a new task');
    }

    console.log(myOneFaithfulArray);
    // re-renders the to dos list to add the newly added task to the screen
    renderTodos(myOneFaithfulArray);
};

// function that renders all the to dos on the screen
function renderTodos(arrayList) {
    // Empty previously rendered array
    const resetDayOne = document.querySelector('#todayToDoList');
    const resetDayTwo = document.querySelector('#tomorrowToDoList');
    const resetDayThree = document.querySelector('#dayAfterToDoList');
    const resetDontForget = document.querySelector('#dontForgetThese');
    resetDayOne.innerHTML = "<ul> </ul>";
    resetDayTwo.innerHTML = "<ul> </ul>";
    resetDayThree.innerHTML = "<ul> </ul>";
    resetDontForget.innerHTML = "<ul> </ul>";

    // Runs through the entire array per item to render it to the correct list 
    for (let i = 0; i < arrayList.length; i++) {
        const dayOfTask = myOneFaithfulArray[i].day;
        if (dayOfTask === dayToday) {
            whichDayRefresh = todayToDos;
        } else if (dayOfTask === dayToday + 1 || dayOfTask === 0) {
            whichDayRefresh = tomorrowToDos;
        } else if (dayOfTask === dayToday + 2 || dayOfTask === 1) {
            whichDayRefresh = dayAfterToDos;
        };

        // for each array item, a new li will be created with the correct name and it will be added to the correct ul according to the day
        let task = document.createElement('li');
        task.innerText = arrayList[i].name;
        whichDayRefresh.appendChild(task);

        // creates a button for each task which will allow the user to manage the task, each button gets its own id to connect it to the right task
        const manageTask = document.createElement('button');
        task.appendChild(manageTask);
        manageTask.appendChild(document.createTextNode('Manage me'));
        manageTask.setAttribute('id', i);
        manageTask.setAttribute('class', 'ManageToDos')
        console.log(myOneFaithfulArray[i].name);
        
        if (myOneFaithfulArray[i].dontForget === "yes") {
            const dontForgetTask = document.createElement('li');
            dontForgetTask.innerText = arrayList[i].name;
            myDontForgetList.appendChild(dontForgetTask);
            const deleteDontForgetAttribute = document.createElement('button');
            deleteDontForgetAttribute.appendChild(document.createTextNode('x'));
            myDontForgetList.appendChild(deleteDontForgetAttribute);
        }
    }
    // Calls a function to reset the listener on each "manage me" button
    managerOfTasks();
}

// calls the render function, so when the page loads it will automatically render the array
renderTodos(myOneFaithfulArray);

// function that adds a listener to each "manage me" button
function managerOfTasks() {
    // selects all "manage me" buttons
    const manageToday = document.querySelectorAll('.ManageToDos');
    // for each button it adds an event listener
    manageToday.forEach(function(button) {
        button.addEventListener("click", function() {
            // collects the id of the clicked button
            let sentID = this.getAttribute('id');
            console.log(myOneFaithfulArray[sentID].name + " manager enabled");
            // opens the manager dialog with the previously collected id
            openTaskManager(sentID);   
        });
    });
};

// function which opens task manager which collects 1 parameter, which should hold the id of the clicked "manage me" button
function openTaskManager(thisId){
    manager.showModal();
    // gathers the name of the selected task to display this in the manager dialog
    let inputManagerTask = document.getElementById('whichTask');
    inputManagerTask.value = myOneFaithfulArray[thisId].name;
    
    const buttonForDeleting = document.querySelector('.deleteButtons');
    buttonForDeleting.setAttribute('id', thisId);
    buttonForDeleting.addEventListener("click", function() {
        myOneFaithfulArray.splice(thisId, 1);
        console.log("you deleted" + thisId);
        manager.close();
        renderTodos(myOneFaithfulArray);
    });
    
    console.log(buttonForDeleting.id + " openTaskManager enabled");
    applyAllChanges();
    // calls on reset function to enable the delete button to work
    // resetDelete(thisId);
};

// event listener so the manager dialog will close on a click
closeManager.addEventListener("click", function() {
    manager.close();
});

// this function adds an event listener to the button in the dialog called apply changes in case any changes had been made in this dialog
function applyAllChanges() {
    const applyButton = document.getElementById('applyManager');
    applyButton.addEventListener("click", function () {
        console.log("click worked");
        const inputCheckboxManager = document.getElementById('importantOrNot');
        if (inputCheckboxManager.checked) {
            var inputForgetOrDont = 'yes';
            console.log('yes');
        } else {
            var inputForgetOrDont = 'no';
            console.log('no');
        }
        manager.close();
        renderTodos(myOneFaithfulArray);
    })
}

// function which enables the delete button, takes one parameter which is the id of the previously clicked "manage me" button
function resetDelete(whichID) {
    const deleteKnoppies = document.querySelector('.deleteButtons');
    deleteKnoppies.addEventListener("click", function() {
        const deleterID = this.getAttribute('id');
        console.log(myOneFaithfulArray[deleterID].name + " 1 deleted");
        manager.close();
        if (deleterID === whichID) {
            myOneFaithfulArray.splice(deleterID, 1);
        } 
        renderTodos(myOneFaithfulArray);
    });
};

// function that changes the day according to the date 
function changeDate() {
    // 3 selectors that select the heading of the 3 ul's 
    const todayDay = document.getElementById("todayDate");
    const tomorrowDay = document.getElementById("tomorrowDate");
    const dayAfterDay = document.getElementById("dayAfterDate");
    // sets variable to the value of the weekday array according to the index which is based on the day that it is (this is a number)
    actualDay = weekday [dayToday];
    // fail safe to make sure that the days for "tomorrow" and "day after" hold the correct day
    if (dayToday + 1 === 7) {
        actualTomorrow = weekday [0];
    } else {
        actualTomorrow = weekday [dayToday + 1];
    }
    if (dayToday + 2 === 7) {
        actualDayAfter = weekday [0];
    } else if (dayToday + 2 === 8) {
        actualDayAfter = weekday [1];
    } else {
        actualDayAfter = weekday [dayToday + 2];
    }
    
    // sets the value of the 3 headings of the 3 ul's to the correct day
    todayDay.innerText = "Today " + actualDay;
    tomorrowDay.innerText = "Tomorrow " + actualTomorrow;
    dayAfterDay.innerText = actualDayAfter;
};

changeDate();