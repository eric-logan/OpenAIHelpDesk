document.addEventListener("DOMContentLoaded", function(){
  var request_msg;

  // send message to content.js - asking for client note data
  // need to only activate on certain URL
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {ticket: "info"}, function(response) {
        // console.log('sent message');
        if (typeof response == "undefined"){
          if(chrome.runtime.lastError) {
            return;
          }
        }
        else{
          request_msg = response;
          // console.log(request_msg);
        }
    });
  });

  // receives message from content.js - but if its not open it cannot be received.
  /*
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      request_msg = request.ticket;
      console.log("popup.js \n" + request_msg);
      console.log(sender);
      sendResponse({farewell: "goodbye"});
    }
  );
  */

  document.getElementById("replyTicket").addEventListener("click", function(){
    // console.log("popup.js2 \n" + request_msg);
    // fetch post request to web server with request details
    try {
      let data = new FormData();
      data.append("ticket", request_msg)

      const options = {
        method: 'POST',
        body: data
      }
      fetch('http://127.0.0.1:5000/', options).then(response => response.json()).then((response) => {
          console.log('POST Requested');
          const reply = response;
          console.log(reply); // "Good Afternoon,\nPlease try turning the smartboard off and on again.\nRegards,\nEric Logan\nTech"
          // console.log('Copy to Clipboard');
          navigator.clipboard.writeText(reply).then(() =>{
            // clipboard successfully set
            document.getElementById("replyTicket").style.background = "#9ccd65"; // style.color
            document.getElementById("replyTicket").innerText = "Copied!"; // style.color
            setTimeout( function() {
              document.getElementById("replyTicket").style.background = "";
              document.getElementById("replyTicket").innerText = "Copy Reply to Ticket";
          }, 1500);
          });
      });
    }
    catch(err) {
      console.log(err);
    }
  });

  document.getElementById("followUpTicket").addEventListener("click", function(){
    // fetch post request to web server with request details
    try {
      let data = new FormData();
      data.append("ticket", "Follow Up")

      const options = {
        method: 'POST',
        body: data
      }
      fetch('http://127.0.0.1:5000/', options).then(response => response.json()).then((response) => {
          console.log('POST Requested');
          const reply = response;
          console.log(reply); // "Good Evening,\nJust a gentle follow-up on your request. Are you still experiencing the issue?\nRegards,\nEric Logan\nTech"
          // console.log('Copy to Clipboard');
          navigator.clipboard.writeText(reply).then(() =>{
            // clipboard successfully set
            document.getElementById("followUpTicket").style.background = "#9ccd65"; // style.color
            document.getElementById("followUpTicket").innerText = "Copied!"; // style.color
            setTimeout( function() {
              document.getElementById("followUpTicket").style.background = "";
              document.getElementById("followUpTicket").innerText = "Copy Reply to Ticket";
          }, 1500);
          });
      });
    }
    catch(err) {
      console.log(err);
    }
  });

  document.getElementById("closeTicket").addEventListener("click", function(){
    // fetch post request to web server with request details
    try {
      let data = new FormData();
      data.append("ticket", "Close Ticket")

      const options = {
        method: 'POST',
        body: data
      }
      fetch('http://127.0.0.1:5000/', options).then(response => response.json()).then((response) => {
          console.log('POST Requested');
          const reply = response;
          console.log(reply); // "Good Evening,\nI am glad we were able to help. We will be closing your ticket. If you have any questions, feel free to reach out to us by opening a new ticket or sending an email to Webhelpdesk@bogotaboe.com.\nRegards,\nEric Logan\nTech"
          // console.log('Copy to Clipboard');
          navigator.clipboard.writeText(reply).then(() =>{
            // clipboard successfully set
            document.getElementById("closeTicket").style.background = "#9ccd65"; // style.color
            document.getElementById("closeTicket").innerText = "Copied!"; // style.color
            setTimeout( function() {
              document.getElementById("closeTicket").style.background = "";
              document.getElementById("closeTicket").innerText = "Copy Reply to Ticket";
          }, 1500);
          });
      });
    }
    catch(err) {
      console.log(err);
    }
  });
});
