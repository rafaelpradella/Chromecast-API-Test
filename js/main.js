var session = null; // define status of Chromecast Session

$( document ).ready(function(){
		// Ping API
	    var loadCastInterval = setInterval(function(){
	            if (chrome.cast.isAvailable) {
	                    $('#castme').contents().last().replaceWith("Transmitir");
	                    clearInterval(loadCastInterval);
	                    initializeCastApi();
	            } else {
	                     console.log('API unreachable');
	            }
	    }, 1000);

	    // initializeCastApi: Load the Chromecast API
	    function initializeCastApi(){
	    	var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID; // Pick device ID
	    	var sessionRequest = new chrome.cast.SessionRequest(applicationID); // request session in identified (by APP_ID) device
	    	var apiConfig = new chrome.cast.ApiConfig(sessionRequest,sessionListener,receiverListener); 
	    	chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
	    };

	    // In case of chrome.cast.initialize passed
	   	function onInitSuccess() {
	   		console.log('Initialization succedded');
	   	}

	   	// In case of chrome.cast.initialize failed
	   	function onInitError() {
	   		console.log('Initialization failed :~~(');
	   	}

	   	// Listen if Chromecast is reachable	
	    function receiverListener(e){
	    	if (e === 'available') {
	    		console.log('Chromecast was found on the network');
	    		$('#castme').css("display","block");
	    	}

	    	else {
	    		console.log ('There are no Chromecasts available');
	    	}
	    };

	    // Listen if Chromecast is on a session
	   	function sessionListener (e) {
	   		session = e; // defines session status by event
	   		console.log('New Session');
	   		if (session.media.length != 0) { // Log if session has media
	   			console.log('Found'+ session.media.length + 'sessions.'); 
	   		}
	   	};

	   	// Launch Chromecast APP by user interaction //////////////////
	   	$('#castme').click(function(){
	   			launchApp(); 
	   	});
	   	function launchApp() {
	   			console.log('Launching the Chromecast App');
	   			chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
	   	};
	   	////////////////////

	   	function onRequestSessionSuccess(e){
	   			console.log('Successfully created session:' + e.sessionID);
	   			session = e;
	   	}

	   	function onLaunchError() {
	   		alert ('Erro ao conectar no Chromecast')
	   	}
});
