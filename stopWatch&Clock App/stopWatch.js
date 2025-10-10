let secondsCounter = 0;
let minutesCounter = 0;
let hoursCounter = 0;
let secondsCountDown = document.querySelector(".mainContainer .stopWatch .time .seconds");
let minutesCountDown = document.querySelector(".mainContainer .stopWatch .time .minutes");
let hoursCountDown = document.querySelector(".mainContainer .stopWatch .time .hours");
let isRunning = false;
let counter;
function start() {
    if(!isRunning){
        isRunning = true;
        counter = setInterval(() => {
        if (secondsCounter > 59) {
            secondsCounter = 0;
            minutesCounter++;
        } else {
            secondsCounter++;
        }
        if(minutesCounter > 59)  {
            minutesCounter = 0;
            hoursCounter ++;
        }
        hoursCountDown.innerHTML = String(hoursCounter).padStart(2, '0');
        minutesCountDown.innerHTML = String(minutesCounter).padStart(2, '0');
        secondsCountDown.innerHTML = String(secondsCounter).padStart(2, '0');
        localStorage.setItem("seconds",secondsCounter);
        localStorage.setItem("minutes",minutesCounter);
        localStorage.setItem("hours",hoursCounter);
    }, 1000);
    document.querySelector(".resume").style.display="none";
    document.querySelector(".start").style.display="none";
    document.querySelector(".pause").style.display="block";
}
}
function pause() {
    clearInterval(counter);
    isRunning= false;
    document.querySelector(".pause").style.display="none";
    document.querySelector(".resume").style.display="block";
}
function reset() {  
    clearInterval(counter);
    isRunning = false;
    secondsCounter = 0;
    minutesCounter = 0;
    hoursCounter = 0;
    hoursCountDown.innerHTML = "00";
    minutesCountDown.innerHTML = "00";
    secondsCountDown.innerHTML = "00";
    document.querySelector(".pause").style.display="none";
    document.querySelector(".resume").style.display="none";
    document.querySelector(".start").style.display="block";
    localStorage.removeItem("seconds");
    localStorage.removeItem("minutes");
    localStorage.removeItem("hours");
}
window.addEventListener("load", () => {
    let secondsCountDown = document.querySelector(".mainContainer .stopWatch .time .seconds");
    let minutesCountDown = document.querySelector(".mainContainer .stopWatch .time .minutes");
    let hoursCountDown = document.querySelector(".mainContainer .stopWatch .time .hours");
    secondsCounter = parseInt(localStorage.getItem("seconds")) || 0;
    minutesCounter = parseInt(localStorage.getItem("minutes")) || 0;
    hoursCounter = parseInt(localStorage.getItem("hours")) || 0;
    hoursCountDown.innerHTML = String(hoursCounter).padStart(2, "0");   
    minutesCountDown.innerHTML = String(minutesCounter).padStart(2, "0");
    secondsCountDown.innerHTML = String(secondsCounter).padStart(2, "0");
});


