document.addEventListener("DOMContentLoaded", PrintTime)

function PrintTime(){

    var currentTime = new Date;
    currentTime.getHours()
    var currHrs = ("0" + currentTime.getHours()).slice(-2)
    var currMins = ("0" + currentTime.getMinutes()).slice(-2);
    var currSec = ("0" + currentTime.getSeconds()).slice(-2);

    var nasdaq = document.getElementById("nasdaq");
    nasdaq.innerHTML =  ( currHrs)  + ":" + ( currMins) + ":" + (currSec) + " now!<br>" 
    nasdaq.innerHTML +=  ("0" +(15 - currHrs)).slice(-2)  + ":" +("0" + (29 - currMins)).slice(-2) + ":" + ("0"+ (60 - currSec)).slice(-2) + " left until 15.30" ;

    setInterval(PrintTime, 1000)
}
  

document.addEventListener("DOMContentLoaded", Print(08,59,59))

function Print(hour, min, sec){

    var currentTime = new Date;
    currentTime.getHours()
    var currHrs = ("0" + currentTime.getHours()).slice(-2)
    var currMins = ("0" + currentTime.getMinutes()).slice(-2);
    var currSec = ("0" + currentTime.getSeconds()).slice(-2);

    var sto = document.getElementById("sto");
    sto.innerHTML =  ( currHrs)  + ":" + ( currMins) + ":" + (currSec) + " now!<br>" 
    sto.innerHTML +=  ("0" +(hour - currHrs)).slice(-2)  + ":" +("0" + (min - currMins)).slice(-2) + ":" + ("0"+ (sec - currSec)).slice(-2) + " left until 9:00" ;


    setInterval(function(){
        Print(hour, min, sec)
    }, 1000)
}
  