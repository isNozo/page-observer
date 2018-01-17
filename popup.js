function send_msg_from_extension(data){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	chrome.tabs.sendMessage(
	    tabs[0].id,
	    {from:"extension", msg: data},
	    (response) => {}
	);
    });
}

function notify(msg){
    chrome.notifications.create({
	type: "basic",
	title: "Page Observer",
	message: msg,
	iconUrl: "dummy_icon.png"
    });
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
	if(request.from != "content") return;
	console.log("popup received :", request.msg);
	notify(request.msg);
    }
);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#rq_button').addEventListener('click', () => {
	const query = document.querySelector('#query_input').value;
	send_msg_from_extension(query);
    });
});
