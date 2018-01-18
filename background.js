function notify(msg){
    chrome.notifications.create({
	type: "basic",
	title: msg.title,
	message: msg.body,
	iconUrl: msg.icon
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
	switch(request.from){
	case 'content' :
	    console.log("recieve:", request);
	    notify(request.msg);
	    break;
	default :
	    return;
	}
    }
);
