// reads Ticket element from page
let clientTicket = document.getElementsByClassName("requestTextClient");
//console.log(clientTicket[0].innerText);

// receive message from popup.js - sending client note data
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        // console.log("received");
        sendResponse(clientTicket[0].innerText);
    }
);

// sends message to popup.js - but if popup.js isn't open it cannot receive the message
/*
chrome.runtime.sendMessage({ticket: clientTicket[0].innerText}, function(response) {
  console.log("content.js \n" + clientTicket[0].innerText);
});
*/