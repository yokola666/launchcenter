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

    nasdaq.innerHTML += "test"
    console.log("Now");


    setInterval(PrintTime, 1000)
}
  