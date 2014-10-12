
var session = null; // define status of Chromecast Session

$( document ).ready(function(){
	    
		// Ping Chromecast
	    var loadCastInterval = setInterval(function(){
	            if (chrome.cast.isAvailable) {
	                    $('#castme').contents().last().replaceWith("Transmitir");
	                    clearInterval(loadCastInterval);
	                    initializeCastApi();
	            } else {
	                    $('#castme').css("display","none"); // Hide button if device is unreachable
	            }
	    }, 1000);

	    // initializeCastApi: Load the Chromecast API
	    function initializeCastApi(){
	    	var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID; // Pick device ID
	    	var sessionRequest = new chrome.cast.SessionRequest(applicationID); // request session in identified (by APP_ID) device
	    	var apiConfig = new chrome.cast.ApiConfig(sessionRequest,sessionListener,receiverListener); 
	    	chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
	    };

	   	function sessionListener (e) {
	   		session = e; // defines session status by event
	   		console.log('New Session');
	   		if (session.media.length != 0) { // Log if session has media
	   			console.log('Found'+ session.media.length + 'sessions.'); 
	   		}
	   	}
});
