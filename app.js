var purecookieTitle="Cookies.",purecookieDesc="Ao usar este site, você aceita automaticamente que usamos cookies.",purecookieLink='<a href="privacy.html" target="_blank">Por quê?</a>',purecookieButton="Entendo";function pureFadeIn(e,o){var i=document.getElementById(e);i.style.opacity=0,i.style.display=o||"block",function e(){var o=parseFloat(i.style.opacity);(o+=.02)>1||(i.style.opacity=o,requestAnimationFrame(e))}()}function pureFadeOut(e){var o=document.getElementById(e);o.style.opacity=1,function e(){(o.style.opacity-=.02)<0?o.style.display="none":requestAnimationFrame(e)}()}function setCookie(e,o,i){var t="";if(i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3),t="; expires="+n.toUTCString()}document.cookie=e+"="+(o||"")+t+"; path=/"}function getCookie(e){for(var o=e+"=",i=document.cookie.split(";"),t=0;t<i.length;t++){for(var n=i[t];" "==n.charAt(0);)n=n.substring(1,n.length);if(0==n.indexOf(o))return n.substring(o.length,n.length)}return null}function eraseCookie(e){document.cookie=e+"=; Max-Age=-99999999;"}function cookieConsent(){getCookie("purecookieDismiss")||(document.body.innerHTML+='<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>'+purecookieTitle+'</a></div><div class="cookieDesc"><p>'+purecookieDesc+" "+purecookieLink+'</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">'+purecookieButton+"</a></div></div>",pureFadeIn("cookieConsentContainer"))}function purecookieDismiss(){setCookie("purecookieDismiss","1",7),pureFadeOut("cookieConsentContainer")}window.onload=function(){cookieConsent()};
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