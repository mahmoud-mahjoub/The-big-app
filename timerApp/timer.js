let picker = document.querySelector(".picker") ;
let set = document.querySelector(".btns .set");
function fillWheel(id,max) {
    
    const wheel = document.getElementById(id);
    for(let i = 0; i <= max; i++) {
        let div = document.createElement("div");
        div.innerText=i;
        wheel.appendChild(div);
    }
}
function reset() {
    document.getElementById("hours").scrollTop =0;
    document.getElementById("minutes").scrollTop =0;
    document.getElementById("seconds").scrollTop =0;
    picker.style.display ="flex";
    set.style.display ="block";
}
function setTimer() {
    picker.style.display ="none";
    set.style.display="none";
    genClock();
}
fillWheel("hours",24);
fillWheel("minutes",60);
fillWheel("seconds",60);

function genClock() {
    let container = document.createElement("div");
    container.classList.add("clockContainer");
    document.querySelector(".timer").appendChild(container);
    let hours = document.createElement("span");
    hours.classList.add("clockHours");
    hours.innerText+=":";
    container.appendChild(hours);
    let minutes = document.createElement("span");
    minutes.classList.add("clockMinutes");
    minutes.innerText+=":";
    container.appendChild(minutes);
    let seconds = document.createElement("span");
    seconds.classList.add("clockSeconds");
    container.appendChild(seconds);
}