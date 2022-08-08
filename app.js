let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime= 5;
let workMinutes = 0;
let breakMinutes = 0;
let seconds = "00"

//display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

//start timer
function start(){
    if(window.Notification&&Notification.permission!=='denied'){
        Notification.requestPermission(function(status){})
    }
    document.getElementById('start').style.display = "none";
    document.getElementById('stop').style.display = "block"
    document.getElementById('reset').style.display = "block"
    
    seconds = 59;

    workMinutes = workTime -1;
    breakMinutes = breakTime-1;

    breakCount = 0;
    let timerFunction = () => {
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds; 
        document.getElementById('titulo').innerHTML = workMinutes+":"+seconds;

        seconds = seconds - 1;
        if(seconds === 0){
            workMinutes=workMinutes-1;
            if (workMinutes === -1) {
                if(breakCount % 2 === 0){
                    if(Notification.permission ==='granted'){
                        callNotify(title1, msg1, icon1);
                    }
                    workMinutes = breakMinutes;
                    breakCount++;
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                }else{
                    if(Notification.permission ==='granted'){
                        callNotify(title2, msg2, icon2);
                    }
                    workTime = 24
                    workMinutes = workTime;
                    breakCount++;
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds=59;
        }
       // if(workMinutes<10) workMinutes= '0'+workMinutes;
        if(seconds<10) seconds= '0'+seconds;
    }
    myInterval = setInterval(timerFunction, 1000);
}
function reset(){
    workMinutes = 25;
    breakMinutes= 5;
    breakTime = 5;
    breakCount= 0;
    seconds = '0'+0;
    document.getElementById('minutes').innerHTML = workMinutes;
    document.getElementById('seconds').innerHTML = seconds; 
    document.getElementById('titulo').innerHTML = "Pomodoro Timer";
    document.getElementById('start').style.display = "block";
    document.getElementById('stop').style.display = "none"
    document.getElementById('reset').style.display = "none"
    if(workMinutes ===14 && seconds === 59 || breakMinutes === 5) {
        stop();
    }
}
function stop(){
    clearInterval(myInterval);
}

const title1 = "Intervalo";
const title2 = "Foco";
const msg1 = 'Hora de parar para um descanço!';
const msg2 =  "O descanço acabou de volta ao foco!";
const icon1 = "icons8-rest-64.png";
const icon2 = "icons8-focused-64.png"

function callNotify(title, msg, icon){
    new Notification(title, {body: msg, icon: icon});
    //new Audio(song).play()
}
