btnAdd.addEventListener("click", addTodoItem, false);

var todoitems = [];
 
function addTodoItem(e) {
    if (todoitem.value < 1) {
        return;
    }
    if (!todoitems.includes(todoitem.value)){
    var newTodoItem = document.createElement("p");
    newTodoItem.innerText = todoitem.value;

    newTodoItem.addEventListener("click", todoItemDone, false);
    newTodoItem.addEventListener("dblclick", todoItemRemove, false);

    list.appendChild(newTodoItem);
    todoitems.push(todoitem.value);
    todoitem.value = ""; 
    }
}

function todoItemDone(e) {
    if (e.target.style.textDecoration == "line-through") {
        e.target.style.textDecoration = "";
    } else {
        e.target.style.textDecoration = "line-through";
    }
    
}

function todoItemRemove(e) {
    if (confirm("Do you really want to remove the item?")){
        e.target.remove();
    }
}