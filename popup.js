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
    console.log(msg);
    chrome.notifications.create({
	type: "basic",
	title: "Page Observer",
	message: msg,
	iconUrl: "dummy_icon.png"
    });
}

function imgURL_to_blob(imgURL){
    return new Promise((resolve, reject) => {
	const request = new XMLHttpRequest();
	request.open('GET', imgURL);
	request.responseType = "blob";

	request.addEventListener("load", () => {
	    if(request.status === 200) {
		resolve(request.response);
	    } else {
		reject(Error(imgURL + " didn\'t load successfully."));
	    }
	});
	request.send();
    });
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
	if(request.from != "content") return;
	notify(request.msg);
    }
);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#rq_button').addEventListener('click', () => {
	const query = document.querySelector('#query_input').value;
	send_msg_from_extension(query);
    });
});
