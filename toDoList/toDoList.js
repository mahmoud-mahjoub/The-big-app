let input = document.querySelector("dialog input");
let toDo = JSON.parse(localStorage.getItem("toDoList")) || [];
function openDialog() {
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal();
} 
function closeDialog() { 
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.close();
    if (input) input.value="";
}
function addTask() {
    if (!input || !input.value.trim()) return;
    let date =  Date.now();
    let todo = {
        id : date,
        text : input.value,
    }
    toDo.push(todo);
    localStorage.setItem("toDoList", JSON.stringify(toDo));
    closeDialog();
    addTaskToBody(todo , todo.id);
}
function addTaskToBody(todo ,id) {
    let allTasks = document.querySelector(".allTasks");
    if (!allTasks) return;
    let div = document.createElement("div");
    div.classList.add("TaskDiv");
    allTasks.appendChild(div);
    let h3 = document.createElement("h3");
    h3.classList.add("content");
    h3.innerText =todo.text;
    div.appendChild(h3);
    h3.addEventListener("click", () => {
        h3.classList.toggle("sliced");
    });
    h3.addEventListener("dblclick", (event) => {
        event.target.parentElement.remove();
        toDo = toDo.filter(task => task.id !== id);
        localStorage.setItem("toDoList", JSON.stringify(toDo));
    });
}
function loadTasks() {
    toDo.forEach(todo => addTaskToBody(todo, todo.id));
}
window.addEventListener("DOMContentLoaded", loadTasks);


