function notify(msg){
    imgURL_to_blob(msg.icon).then((icon_blob) => {
	switch(msg.type){
	case "image":
	    imgURL_to_blob(msg.imageUrl).then((image_blob) => {
		chrome.notifications.create({
		    type : "image",
		    title : msg.title,
		    message : msg.body,
		    iconUrl : icon_blob,
		    imageUrl : image_blob
		});
	    });
	    break;
	case "basic":
	    chrome.notifications.create({
		type : "basic",
		title : msg.title,
		message : msg.body,
		iconUrl : icon_blob,
	    });
	    break;
	}
    });
}

function imgURL_to_blob(imgURL){
    return new Promise((resolve, reject) => {
	const request = new XMLHttpRequest();
	request.open('GET', imgURL);
	request.responseType = "blob";

	request.addEventListener("load", () => {
	    if(request.status === 200) {
		resolve(window.URL.createObjectURL(request.response));
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
