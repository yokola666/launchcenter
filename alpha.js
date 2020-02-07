var stockList = [
    "STO:SAAB-B",
    "MSFT",
    "STO:CTM",
    "STO:G5EN",
    "STO:swed-a",
    "STO:SSAB-B",   
    "AAPL",
    "STO:BTS-B",
    "STO:NIBE-B",
    "NIO",
    "STO:FING-B",
    "STO:MTG-B",
    "STO:NXTMS",
    "sto:leo",
    "STO:MAG"
    ]

for (let i = 0; i < stockList.length; i++) {
    const stock = stockList[i];
    var APICaller = (function () {
        var symbol = stock;
        var apikey = config.alphaVantageApiKey
        endPoint = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+ symbol + "&apikey="+ apikey;
        function apiCaller(method, url, data, callback) {
          let xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function (event) {
            if (this.readyState === 4) {
              let response = this.response
              callback(response, this, event);
            }
          }
          xhttp.open(method, url, true);
          xhttp.send(data);
        }
        function get_data(callback) {
          let method = "GET";
          let url = endPoint;
          let data = {
        };
          apiCaller(method, url, data, callback);
        }
        return {
          get_data: get_data
        };
      })
    ();
    APICaller.get_data(function (response){
        var stockAsJson = JSON.parse(response)
        var stocks = stockAsJson["Global Quote"]
        if (stocks == undefined){
            console.log("cant read " + stock);
            console.log(endPoint);
        }
        else{
            var name = stocks["01. symbol"].replace("STO:", "");
            var percent = stocks["10. change percent"]

            var red = ""
            var green = ""
         
            if (percent.startsWith("-"))
                red = "<span style='color: red'>" + percent + "</span>"
            else
            green = "<span style='color: green'>" + percent + "</span>"

            stockTickers.innerHTML += "<b> " + name +"</b>"+ ": " +red + green 

        }
    })
    
}

var stockTickers = document.getElementById("stockTickers");

