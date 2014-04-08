Ti.include('/lib/birdhouse.js');

$.postbutton.addEventListener('click', function(e) {
	$.imgtext.blur();
	if ($.imgtext.value.trim().length == 0) {
		alert('please enter text');
		return;
	}

	try {

		var BH = new BirdHouse({
			consumer_key : "ve08I0NlF2WzzTiOL5b3g",
			consumer_secret : "t01y1Xl4VoUfhg1YewgOXjOLHTVZnFNIRly8Vl8Q",
			callback_url : "http://developer.appcelerator.com/devlink/profile/1345326/jayesh-joshi"
		});

		BH.send_tweet('status=' + $.imgtext.value, function(resp) {
			if (resp === true) {

				$.imgtext.value = '';
				//alert('Posted suceelfully');
			} else {
				//alert('Failed to send tweet');
			}
		});

	} catch(ex) {
		Titanium.API.info(ex);
	}

});

function showRequestResult(e) {
	var s = '';
	if (e.success) {
		s = "SUCCESS";
		if (e.result) {
			s += "; " + e.result;
		}
		if (e.data) {
			s += "; " + e.data;
		}
		if (!e.result && !e.data) {
			s = '"success", but no data from FaceBook.  I am guessing you cancelled the dialog.';
		}
	} else if (e.cancelled) {
		s = "CANCELLED";
	} else {
		s = "FAIL";
		if (e.error) {
			s += "; " + e.error;
		}
	}

}

$.imgtext.addEventListener('focus', function(e) {
	if (Titanium.Platform.osname != 'android') {
		$.mainView.animate({
			top : -150,
			duration : 300
		});
	}
});

$.imgtext.addEventListener('return', function(e) {
	if (Titanium.Platform.osname != 'android') {
		$.mainView.animate({
			top : 50,
			duration : 300
		});
	}
});
$.backbutton.addEventListener('click', function(e) {
	$.postWindow.close();
});
