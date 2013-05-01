$(window).load(function(){
	// save preferences
	$('#save').click(function() {
		var blogname = $('#blogname').val();
		var rpcurl = $('#rpcurl').val();
		var username = $('#username').val();
		if (blogname && rpcurl && username) {
			localStorage.setItem('blogname', blogname);
			localStorage.setItem('rpcurl', rpcurl);
			localStorage.setItem('username', username);
			Apprise("Preferences Saved!");
			$("#contd").html("<a href='app.html'>Back to Editor</a>");
		}
		else Apprise("Enter all preferences");
	});
	
	// restore preferences
	var blogname = localStorage.getItem('blogname');
	var rpcurl = localStorage.getItem('rpcurl');
	var username = localStorage.getItem('username');
	if(blogname) $('#blogname').val(blogname);
	if(rpcurl) $('#rpcurl').val(rpcurl);
	if(username) $('#username').val(username);
}); 