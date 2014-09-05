// by Arpit Kumar arpitnext@gmail.com http://wpwrite.arpitnext.com
function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

var catArray = [];
var tagArray = [];
var slug = "";
var excerpt = "";
var rpcurl = localStorage.getItem('rpcurl');
var userid = localStorage.getItem('username');
if(!(  rpcurl && userid)) { // right condition?
	alert("Setup your blog first");
	window.location.href = "options.html";
}


$('#advanced').hide();

$(window).load(function(){

// generate download link
$('#savepost').click(function() {
	var text = $('#content_ifr').contents().find('body').html();
	$('#dwnldlink').html('');
	var MIME_TYPE = "text/html";
	var bb = new Blob([text], {type: MIME_TYPE});
	var a = document.createElement('a');
	a.href = "data:text/html,"+text;
	a.textContent = 'Download HTML';
	a.download = $('#title').val();
	a.id = "downlink";
	$('#dwnldlink').append(a);
	$('#downlink').click(function() {
		$('#dwnldlink').html('');
	});
});

// post action
$('#postbutton').click(function() {
	if(!navigator.onLine) Apprise("ERROR: You are offline.");
	else {
	var mypass = prompt("Enter your password:");
	if(mypass) {
		$('#postbutton').val("Connection Error. Retry?");
		var connection = {
			url : rpcurl,
			username : userid,
			password : mypass
		};
		var blogId = 0;
		var title = $('#title').val();
		var article = $('#content_ifr').contents().find('body').html();
		article = htmlEscape(article);
		var categories = {
			category: catArray
		};
		var tags = {
			post_tag: tagArray
		};
		var data = {
			post_type: 'post',
			post_title: title,
			post_excerpt: excerpt,
			post_content: article,
			post_format: '',
			post_status: 'publish',
			terms: categories,
			terms_names: tags,
			post_name: slug
		};
		var wp = new WordPress(connection.url, connection.username, connection.password);
		var reply = wp.newPost(blogId, data);
		if (!(reply instanceof String)) { Apprise("ERROR: " + reply.faultString.toString()); }
		if (reply instanceof String) {
			$('#postbutton').val("Post");
			alert("Post Published!");
			chrome.tabs.create({url:rpcurl.replace('xmlrpc.php','?p='+reply.toString())});
		}
		else {
			$('#postbutton').val("Post");
		}
	}
	}
});

// save draft button
$('#savebutton').click(function() {
	var file = $('#content_ifr').contents().find('body').html();
	var title = $('#title').val();
	localStorage.setItem('file', JSON.stringify(file));
	localStorage.setItem('title', JSON.stringify(title));
	Apprise("Saved!");
});

// restore draft button
$('#rebutton').click(function() {
	var autosave = localStorage.getItem('file');
	if(autosave) {
		var text = JSON.parse(autosave);
		$('#content_ifr').contents().find('body').html(text);
	}
	var autosave2 = localStorage.getItem('title');
	if(autosave2) {
		var text2 = JSON.parse(autosave2);
		$('#title').val(text2);
	}
	if(autosave || autosave2) Apprise("Restored!");
	else Apprise("Nothing to restore. Save draft first.");
});

// blog settings button
$('#prefbutton').click(function() {
	window.location.href = "options.html";
});

// for advanced settings 
$('#postset').click(function(){
	$('#advanced').toggle();
	if($('#advanced').is(":visible")) {$('#postset').val('Hide Post Settings')}
	if($('#advanced').is(":hidden")) {$('#postset').val('Post Settings')}
	$("html, body").animate({ scrollTop: $(document).height() }, "slow");
});

// get categories
$('#getcat').click(function() {
	if(!navigator.onLine) Apprise("ERROR: You are offline.");
	else {
	var mypass = prompt("Enter your password:");
	if(mypass) {
		$('#getcat').val("Connection Error. Retry?");
		var connection = {
			url : rpcurl,
			username : userid,
			password : mypass
		};
		var blogId = 0;
		var wp = new WordPress(connection.url, connection.username, connection.password);
		var reply = wp.getTerms(blogId, 'category');
		if (!(reply instanceof Array)) {
			Apprise("ERROR: " + reply.faultString.toString());
			$('#getcat').val("Load Categories");
		}
		else {
			$('#catlist').html('');
			$('#getcat').val("Load Categories");
			for(i=0;i<reply.length; i++) {
				var $catitem =  $(document.createElement("input")).attr({
                     id:    'catitem-' + reply[i].term_id.toString()
                    ,name:  'category'
                    ,value: reply[i].term_id.toString()
                    ,text :reply[i].name.toString()
                    ,type:  'checkbox'
                    ,checked:false
				});
				var lbl =  '<label>' + reply[i].name.toString() + '</label> ';
				$('<span></span>').append($catitem)
                          .append(lbl)
                          .appendTo('#catlist');
			}
			$('input:checkbox').change(function(){
				if ($(this).is(':checked')) { 
					catArray[catArray.length] = this.value; 
				}
				else {
					var index = catArray.indexOf(this.value);
					catArray.splice(index, 1);
				}
			});
		}
	}
	}
});

// for tags
$('#tags').change(function(){
	tagArray = this.value.split(",");
	for(i=0;i<tagArray.length;i++) {
		tagArray[i] = tagArray[i].trim();
	}
	if(tagArray.length == 1 && tagArray[0] === "") {
		tagArray = [];
	}
});

// for excerpt
$('#excerpt').change(function(){
	excerpt = this.value;
});

// for slug
$('#slug').change(function(){
	slug = this.value;
});

// post draft action
$('#draftbutton').click(function() {
	if(!navigator.onLine) Apprise("ERROR: You are offline.");
	else {
	var mypass = prompt("Enter your password:");
	if(mypass) {
		$('#draftbutton').val("Connection Error. Retry?");
		var connection = {
			url : rpcurl,
			username : userid,
			password : mypass
		};
		var blogId = 0;
		var title = $('#title').val();
		var article = $('#content_ifr').contents().find('body').html();
		article = htmlEscape(article);
		var categories = {
			category: catArray
		};
		var tags = {
			post_tag: tagArray
		};
		var data = {
			post_type: 'post',
			post_title: title,
			post_excerpt: excerpt,
			post_content: article,
			post_format: '',
			post_status: 'draft',
			terms: categories,
			terms_names: tags
		};
		var wp = new WordPress(connection.url, connection.username, connection.password);
		var reply = wp.newPost(blogId, data);
		if (!(reply instanceof String)) { Apprise("ERROR: " + reply.faultString.toString()); }
		if (reply instanceof String) {
			$('#draftbutton').val("Post Draft");
			Apprise("Draft saved on server.");
		}
		else {
			$('#draftbutton').val("Post Draft");
		}
	}
	}
});

});