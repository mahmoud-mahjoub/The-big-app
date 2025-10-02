const picker = document.querySelector(".timer .picker");
const pickerContainer = document.querySelector(".timer .picker .pickerContainer");
const wheel = document.querySelector(".picker .pickerContainer .wheel");
const highlight = document.querySelector(".picker .pickerContainer .highlight");

function fillWheel(id,num) {
    for(let i=0; i<=num ; i++) {
        let mainWheel = document.getElementById(id);
        let numDiv = document.createElement("div");
        numDiv.innerText= i ;
        mainWheel.appendChild(numDiv);
    }
}
fillWheel("hours",24);