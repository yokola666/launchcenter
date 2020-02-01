function PrintStock (list)  {
    console.log(AreMarketsOpen());   
    
    list.forEach(el => {
        document.getElementById(el.id).innerHTML = el.id +" "+el.openingTime;
    });
}

function CountDownOpeningHours(){
    var timeNow = new Date().getTime();
    console.log(timeNow);
}

function CoundDownClosingHours(){

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