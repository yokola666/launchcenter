//Globala 
var listOfEventsJocke = [];
var listOfEventsDarlings = []
var upcommingEvents = []
var htmlTitle = document.getElementById("calendars");
var eventTitle = "";

// API CALL ACCORDING TO GOOGLE DOCUMENTATION
      function authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly"})
            .then(function() { console.log("Sign-in successful"); },
                  function(err) { console.error("Error signing in", err); });
      }
      function loadClient() {
        gapi.client.setApiKey(config.googleApiKey);
        return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
            .then(function() { console.log("GAPI client loaded for API"); },
                  function(err) { console.error("Error loading GAPI client for API", err); });
      }
      function execute() {
        return gapi.client.calendar.events.list({
          "calendarId": config.calendarIdDarlings,
          "maxResults": "2500",
          "singleEvents": "True",
          "orderBy":"startTime",
          "showDeleted": "False"
        })
            .then(function(response) {
              
              //Push events from requeset to new list
              listOfEventsDarlings.push(response);
              console.log("ran function");
              },
                function(err) { console.error("Execute error", err); });
              }

      function getnext(){
        return gapi.client.calendar.events.list({
          "calendarId": config.jockeEpost,
          "maxResults": "2500",
          "singleEvents": "True",
          "orderBy":"startTime",
          "showDeleted": "False"
        })
            .then(function(response) {

              //Push events from requeset to new list
              listOfEventsJocke.push(response);
              PrintListOfEvents(listOfEventsJocke);
              PrintListOfEvents(listOfEventsDarlings);
              
                  },
                  function(err) { console.error("Execute error", err); });
              }
      gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: config.googleClientID});
      });

      function PrintListOfEvents(list){
        for (let y = 0; y < list.length; y++) {
          const elem = list[y];
         
          var listOfItems = elem.result.items;

          //compare dates and add to new upcomingList
              for (let b = 0; b < listOfItems.length; b++) {
                const event = listOfItems[b];
                var dateOfEvent = new Date(event.start.dateTime);
                var now = new Date()

                if (listOfItems.length == 0) {
                  continue;
                  
                }
                else{
                  eventTitle = elem.result.summary;
                  if (dateOfEvent > now) {
                    upcommingEvents.push(event);
                  } 
                }
                                     
              }
         }
         //PRINT LISTS 
         var lenghtOfEvent;

         if (upcommingEvents.length < 14 ){
           lenghtOfEvent = upcommingEvents.length;
         }
          if (upcommingEvents.length > 14){
            lenghtOfEvent = 14;
          }
          if (lenghtOfEvent > 0) {
            
            htmlTitle.innerHTML += "<h1>" + eventTitle + "</h1>";
          }

        for (let i = 0; i < lenghtOfEvent; i++) {

            var el = upcommingEvents[i]
            var dates = new Date (el.start.dateTime)
            htmlTitle.innerHTML += "<p>" + dates.toLocaleDateString() + " <b> " 
                                        + dates.toLocaleTimeString() + " </b><a href='"+ el.htmlLink +"' target='_blank'>  "  
                                        + "  " + el.summary + "  </a></p>"}
      }

        
