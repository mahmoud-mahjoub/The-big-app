let input = document.querySelector("dialog input");

function openDialog() {
    document.querySelector("dialog").showModal();
} 
function closeDialog() {
    document.querySelector("dialog").close();
    input.value="";
}