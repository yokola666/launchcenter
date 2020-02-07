
var APICaller = (function () {
    let endPoint = "http://10.0.0.2:8123/api/states";

    function apiCaller(method, url, data, callback) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function (event) {
        if (this.readyState === 4) {
          let response = JSON.parse(this.response);
          callback(response, this, event);
        }
      }
      xhttp.open(method, url, true);
      xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      xhttp.setRequestHeader("x-ha-access", config.password);
      let json_data = JSON.stringify(data);
      xhttp.send(json_data);
    }

    function get_posts(callback) {
      let method = "GET";
      let url = endPoint;
      apiCaller(method, url, null, callback);
    }
    return {
      get_posts: get_posts
    };
  })
();

var lights = [];
var switches = [];
var scripts = [];
var medias = [];
var philips_tv = []
var nec_tv = [];
var apple_tv = [];
var led_strip = [];
var lg_tv = [];
var xiaomi = [];
var samsung_tv = [];
var sensors = [];


//Populates globallists with respective service
//splits on group
document.addEventListener('DOMContentLoaded', PopulateFromHassioApi);

function PopulateFromHassioApi() {
  APICaller.get_posts(function (response) {
    for (let index = 0; index < response.length; index++) {
      var entity_id = response[index].entity_id;
      if (entity_id.startsWith("light")) {
        lights.push(response[index]);
      }
        if (entity_id.startsWith("switch")) {

          if (entity_id.startsWith("switch.tv_phillips")) {
            philips_tv.push(response[index]);
            continue;
          }
          if (entity_id.startsWith("switch.nec")) {
            nec_tv.push(response[index]);
            continue;
          }
          if (entity_id.startsWith("switch.apple")) {
            apple_tv.push(response[index]);
            continue;
          }
          if (entity_id.startsWith("switch.led")) {
            led_strip.push(response[index]);
            continue;
          }
          if (entity_id.startsWith("switch.tv_lg")) {
            lg_tv.push(response[index]);
            continue;
          }
          if (entity_id.startsWith("switch.xiaomi")) {
            xiaomi.push(response[index]);
            continue;
          }
          if (entity_id.startsWith("switch.samsung")) {
            samsung_tv.push(response[index]);
            continue;
          }
          switches.push(response[index]);
        }
        if (entity_id.startsWith("script")) {
          scripts.push(response[index]);
        }
        if (entity_id.startsWith("media")) {
          medias.push(response[index]);
        }
        if (entity_id.startsWith("sensor")) {
          sensors.push(response[index]);
        }
      }
      GenerateHmtl(lights);
      GenerateHmtl(scripts);
      GenerateHmtl(medias);
      
      GenerateHmtl(philips_tv);
      GenerateHmtl(nec_tv);
      GenerateHmtl(apple_tv);
      GenerateHmtl(led_strip); 
      GenerateHmtl(lg_tv);
      GenerateHmtl(xiaomi);
      GenerateHmtl(samsung_tv);
      GenerateHmtl(switches);
  });
}
//generates Html
function GenerateHmtl(list) {
  var service = list[0].entity_id.split('.')[0];
    if (service == "switch") {
      service = list[0].entity_id.split('_')[0];

      service = service.replace('.', '_');
      if (service == "switch_tv") {
      service = "switch_" + list[0].entity_id.split('_')[1];
      }
      service = service.split('_')[1].toUpperCase()
    }
  
  // console.log(list);
    

  $(".table-placement").append("<div class='serviceList'><h1 class='font-weight-bold'>" + service + "</h1><table id='my-table' class='col-12'>" +
    "<tbody class='col-3' id=" + service + "></tbody></table></div>");

  for (var element in list) {

    var entity_id = list[element].entity_id;
    var friendly_name = list[element].attributes.friendly_name;
    var state = list[element].state;
    // console.log(state);

    $("#" + service).append("<tr>");
    $("#" + service).append("<td class=" + entity_id + "><strong>" + friendly_name + "</strong></td>");
    $("#" + service).append("<td class=" + entity_id + ">" + entity_id + "</td>");
    var setIcon = "";

    if (entity_id.startsWith("light")) {

      //Set icon based on the state
      // This should be updated to change state based on eventlistener

      if (state == "on"){
        setIcon = setIconHtml(entity_id, "mdi-lightbulb-on-outline");
      }
      else
      setIcon = setIconHtml(entity_id, "mdi-lightbulb");
    }
    if (entity_id.startsWith("media")) {
      setIcon = setIconHtml(entity_id, "mdi-play-circle")
    }
    if (entity_id.startsWith("switch")) {
      setIcon = setIconHtml(entity_id, "mdi-light-switch")
    }
    if (entity_id.startsWith("tv")) {
      setIcon = setIconHtml(entity_id, "mdi-television-classic")
    }
    if (entity_id.startsWith("script")) {
      setIcon = setIconHtml(entity_id, "mdi-autorenew")
    }
    if (entity_id.startsWith("automation")) {
      setIcon = setIconHtml(entity_id, "mdi-home-automation")
    }
    $("#" + service).append(setIcon);
  }
}

//Print html and icons 
function setIconHtml(thingInput, mdiIcon) {
  var icon = "<td class=" + thingInput + "><span class='mdi " + mdiIcon + "'></span></td>";
  return icon;
}

//adding evlistener to table, ignoring all non td elements
var table = document.getElementById('main-container');
table.addEventListener('click', function (e) {
  if (e.target.className.includes("mdi"))
    ToggleEventBasedOnIcon(e.target.offsetParent.className);

  if (e.target.nodeName.toUpperCase() !== "TD") return;
    ToggleEventBasedOnIcon(e.target.className);
});

//adding evlistener to remoteboxes
var remotes = document.getElementsByClassName('remote-box');
for (var i = 0; i < remotes.length; i++) {
  var remote = remotes[i];
  remote.addEventListener('click', function (e) {
    // console.log(e);
    
    if (e.target.nodeName.toUpperCase() == "SPAN"){
      ToggleEventBasedOnIcon(e.target.parentNode.id);
    }
  
    if (e.target.nodeName.toUpperCase() == "BUTTON"){
      ToggleEventBasedOnIcon(e.target.id);
    }
  });
}


var navBarLinks = document.getElementsByClassName('dropdown-menu');
for (var i = 0; i < navBarLinks.length; i++) {
  var remote = navBarLinks[i];
  remote.addEventListener('click', function (e) {
    // console.log(e);
    
    if (e.target.nodeName.toUpperCase() == "SPAN"){
      ToggleEventBasedOnIcon(e.target.parentNode.id);
    }
  
    if (e.target.nodeName.toUpperCase() == "BUTTON"){
      ToggleEventBasedOnIcon(e.target.id);
    }
  });
}


// Toggle lights in list view
function ToggleEventBasedOnIcon(ev) {
  var urlAdressHass;
  if (ev.startsWith("light")) {
    urlAdressHass = 'http://10.0.0.2:8123/api/services/light/toggle'
  }
  if (ev.startsWith("switch")) {
    urlAdressHass = 'http://10.0.0.2:8123/api/services/switch/toggle'
  }
  if (ev.startsWith("script")) {
    urlAdressHass = 'http://10.0.0.2:8123/api/services/script/turn_on'
  }
  if (ev.startsWith("media_player")) {
    urlAdressHass = 'http://10.0.0.2:8123/api/services/media_player/toggle'
  }
  var data;
  data = {
    "entity_id": ev
  };
  return $.ajax({
    url: urlAdressHass,
    headers: {
      "x-ha-access": config.password
    },
    dataType: "json",
    data: JSON.stringify(data),
    contentType: 'application/json',
    type: 'POST',
    success: console.log(ev + " " + urlAdressHass)
  });
}

//the weather widget is totally stolen and should be replaced with something better and more customizable
! function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = 'weahter.js';
      fjs.parentNode.insertBefore(js, fjs);
  }
}(document, 'script', 'weatherwidget-io-js');

//TOOGLE REMOTES 
$(".dropdown-item").click(function(e){
  var remote = e.target.id;
  if (remote == "show-livingroom-remote")
      if ($("#remotes-livingroom").css("visibility") == "hidden")
         $("#remotes-livingroom").css("visibility", "visible")
      else
         $("#remotes-livingroom").css("visibility", "hidden")

  if (remote == "show-bedroom-remote")
      if ($("#remotes-bedroom").css("visibility") == "hidden")
         $("#remotes-bedroom").css("visibility", "visible")
      else
         $("#remotes-bedroom").css("visibility", "hidden")
  
  if (remote == "show-studio-remote")
      if ($("#remotes-studio").css("visibility") == "hidden")
      $("#remotes-studio").css("visibility", "visible")
      else
      $("#remotes-studio").css("visibility", "hidden")
});

//Lists of RSS Feeds that I wanna use
var rssFeeds = ["https://swedroid.se/forum/forums/-/index.rss", 
                "https://www.svtplay.se/genre/dokumentar/rss.xml",
                "https://swedroid.se/forum/forums/koep-och-saelj.25/index.rss",
                "https://www.sweclockers.com/feeds/marknad"
                
                ];

//Date and time headline 
setInterval(function(){
  var setHtml = document.getElementById("date-time");
  var date = new Date().toLocaleDateString();
  var time = new Date().toLocaleTimeString();
  setHtml.innerHTML = (date + " " + time)}, 1000)

// TESTING to get data of rss feeds
rssFeeds.forEach(element => {
  var feedURL = element;
  $.ajax({
  type: 'GET',
  url: "https://api.rss2json.com/v1/api.json?rss_url=" + feedURL,
  dataType: 'jsonp',
  headers: {"x-api-key": config.apiKeyForRss2Json}, //this is the auth for rss2json not shure its working properly
  success: function(result) {
    PrintRssFeed(result);
    }
  });
});

var headLine = "";
//Prints news with rss2json as html
//This should be a separate feature on a separate webpage

function PrintRssFeed(rss){
  // console.log(rss);
  
  headLine = rss.feed.author;
  if (headLine == null || headLine == "") {
    headLine = rss.feed.title;
  }
  $(".rss-input").append("<h4><strong>" +headLine+ "</strong></h4>");

  for (var index = 0; index < rss.items.length; index++) {

    var title = rss.items[index].title;
    var publishdate = rss.items[index].pubDate;
    var link = rss.items[index].link;

    $(".rss-input").append("<div class="+title+"><strong><a href="+link+" target='_blank'>" + title + "</a></strong></div>");
    $(".rss-input").append("<div>" + publishdate + "</div>");
    
  }
  $(".rss-input").append("<br>");
}

