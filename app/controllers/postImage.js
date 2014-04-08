Ti.include('/lib/birdhouse.js');

data = null;
$.photobutton.addEventListener('click', function(e) {

	var dialog = Titanium.UI.createOptionDialog({
		options : ['Choose From Library', 'Take New Photo', 'Cancel'],
		cancel : 2,
	});
	dialog.show();

	dialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			Titanium.Media.openPhotoGallery({
				success : function(event) {

					pic = event.media;
					var imageView = Titanium.UI.createImageView({
						image : pic,
						width : 300,
						height : 250
					});
					pic = imageView.toBlob();
					alert('Image selected From PhotoGallery');
					data = {
						picture : pic
					};
					$.imgView.image = pic;
				},
				cancel : function() {
					alert('You Canceled');
				},
				error : function(error) {
				alert('Erroe occurs');
				},
				mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
			});
		} else if (e.index == 1) {
			Titanium.Media.showCamera({
				success : function(event) {
					pic = event.media;
					var imageView = Titanium.UI.createImageView({
						image : pic,
						width : 300,
						height : 250
					});
					pic = imageView.toBlob();
					data = {
						picture : pic
					};
					$.imgView.image = pic;
				},
				cancel : function() {
					alert('You Canceled');
				},
				error : function(error) {
					// create alert
					var a = Titanium.UI.createAlertDialog({
						title : 'Camera'
					});
					// set message
					if (error.code == Titanium.Media.NO_CAMERA) {
						a.setMessage('No Camera detcted.');
					} else {
						a.setMessage('Unexpected error: ' + error.code);
					}
					// show alert
					a.show();
				},
				saveToPhotoGallery : false,
				mediaTypes : Ti.Media.MEDIA_TYPE_PHOTO,
				showControls : true // don't show system controls
				// overlay : cameraView
			});
		}
	});

});
$.postbutton.addEventListener('click', function(e) {
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
		BH.sendTwitterImage({
			'status' : $.imgtext.value,
			'media' : pic
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
	$.postImage.close();
});
