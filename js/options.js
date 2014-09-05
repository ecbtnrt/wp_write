$(window).load(function(){
	// save preferences
	$('#save').click(function() {
		var username = $('#username').val();
		if (username) {
			localStorage.setItem('rpcurl', "http://www.doogon.com/" + username + "/xmlrpc.php");
			Apprise(localStorage.getItem('rpcurl'));
			localStorage.setItem('username', username);
			Apprise("Preferences Saved!");
			$("#contd").html("<a href='app.html'>Back to Editor</a>");
		}
		else Apprise("Enter all preferences");
	});
	
	// restore preferences
	var rpcurl = localStorage.getItem('rpcurl');
	var username = localStorage.getItem('username');
	if(rpcurl) $('#rpcurl').val(rpcurl);
	if(username) $('#username').val(username);
}); 