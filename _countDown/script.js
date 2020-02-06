function PrintStock (list)  {
    // console.log(AreMarketsOpen());   
    
    list.forEach(el => {
        document.getElementById(el.id).innerHTML = el.id +" "+el.openingTime;
    });
}


//make countdown into one function
function CountDownOpeningHours(){
    var setAsArg = "15:30:00";

    //Sets timeNow string as HH:MM:SS
    var timeNow = new Date();
    // console.log(timeNow.toISOString());
    
    var nowHours = timeNow.getHours();
    var nowMin = timeNow.getMinutes();
    var nowSec = timeNow.getSeconds();

    var openHours = 15;
    var openMins = 29;
    var openSecs = 59;


    var remainingTime = nowHours - openHours
                        (nowMin-openMins) +":"+
                        (nowSec-openSecs);

    
    
    console.log(remainingTime);
}

function CountDownClosingHours(){
    var today = new Date();

}

function SetTimeFromStringInput(stringInput){

}

//Check if weekday is more than 5 ie. more than friday
function AreMarketsOpen(){
    var checkDay = (new Date()).getDay();
    return (checkDay > 5 ? false : true)
}

//GLOBAL VARIABLES
var stoStock = {id: "sto", openingTime:"08:59:59", closingTime: "17:29:59"};
var nasStock = {id: "nasdaq", openingTime:"15:29:59", closingTime: "21:59:59"};
var StockList = [stoStock, nasStock];



window.addEventListener("DOMContentLoaded", PrintStock(StockList));
window.addEventListener("DOMContentLoaded", AreMarketsOpen);
window.addEventListener("DOMContentLoaded", CountDownOpeningHours);