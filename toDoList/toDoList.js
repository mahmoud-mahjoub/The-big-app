let input = document.querySelector("dialog input");
let toDo = JSON.parse(localStorage.getItem("toDoList")) || [];
function openDialog() {
    document.querySelector("dialog").showModal();
} 
function closeDialog() {
    document.querySelector("dialog").close();
    input.value="";
}
function addTask() {
    let date =  Date.now();
    let todo = {
        id : date,
        text : input.value,
    }
    toDo.push(todo);
    localStorage.setItem("toDoList", JSON.stringify(toDo));
    closeDialog();
    addTaskToBody(todo);
}
function addTaskToBody(todo) {
    let allTasks = document.querySelector(".allTasks");
    let div = document.createElement("div");
    div.classList.add("TaskDiv");
    allTasks.appendChild(div);
    let h3 = document.createElement("h3");
    // h3.classList.add("content")
    h3.innerText =todo.text;
    div.appendChild(h3);

}
