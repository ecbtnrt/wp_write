// from TweetRight Chrome extension by @ArpitNext


// for toolbar button  
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({"url":"app.html"})
});