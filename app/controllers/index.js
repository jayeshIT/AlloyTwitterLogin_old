Ti.include('/lib/birdhouse.js');

var BH = new BirdHouse({
	consumer_key : "ve08I0NlF2WzzTiOL5b3g",
	consumer_secret : "t01y1Xl4VoUfhg1YewgOXjOLHTVZnFNIRly8Vl8Q",
	callback_url : "http://developer.appcelerator.com/devlink/profile/1345326/jayesh-joshi"
});

$.twitter.addEventListener('click', function(e) {
	if (Titanium.Network.online) {
		BH.authorize(function(e) {
			if (e === true) {
				alert('Login as \n' + Ti.App.Properties.getString('ttname'));
				$.twitter_logout.visible = true;
				//$.twitter.enabled = false;

				var alertDialog = Titanium.UI.createAlertDialog({
					buttonNames : ['Post', 'Post Image', 'Get Folloers'],
					title : 'Please select for Twitter'

				});
				alertDialog.addEventListener('click', function(e) {
					if (e.index == 0) {
						var postWin = Alloy.createController('postWindow').getView();
						postWin.open();
					} else if (e.index == 1) {
						var postImageWin = Alloy.createController('postImage').getView();
						postImageWin.open();
					} else if (e.index == 2) {
						try {
							var BH = new BirdHouse({
								consumer_key : "ve08I0NlF2WzzTiOL5b3g",
								consumer_secret : "t01y1Xl4VoUfhg1YewgOXjOLHTVZnFNIRly8Vl8Q",
								callback_url : "http://developer.appcelerator.com/devlink/profile/1345326/jayesh-joshi"
							});
							BH.getFollowers();
						} catch(ex) {
							Titanium.API.info(ex);
						}
					}
				});
				alertDialog.show();

			} else {
				alert('Failed to authorize.');
			}
		});

	} else {
		alert('please turn on internet connection');
	}

});
// Twitter over
var twitter_logout = function() {
	logout_flag = true;
	if (logout_flag == true) {
		BH.deauthorize(function(e) {
			if (e === true) {
				Ti.App.Properties.removeProperty('ttname');
				alert("You successfully logged out from twitter.");
				var client = Titanium.Network.createHTTPClient();
				client.clearCookies('https://twitter.com/');
				$.twitter.enabled = true;
				$.twitter_logout.visible = false;
			} else {
				alert('Failed to deauthorize.');
			}

		});
		logout_flag = false;
	}
};
$.twitter_logout.addEventListener('click', function(e) {
	twitter_logout();
});
$.twitter_checkforlogin.addEventListener('click', function(e) {
	if (BH.authorized() == true) {
		alert('Logged in  as \n' + Ti.App.Properties.getString('ttname'));
	} else {
		alert('Please login');
	}
});
$.container.open();
