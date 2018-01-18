function send_msg(data){
    console.log("send:",data);
    chrome.runtime.sendMessage(
	{from : "content", msg : data}
    )
}

function make_notification_data(node){
    return {
	title : node.querySelector(".account-inline.txt-ellipsis").innerText,
	body : node.querySelector(".js-tweet-text.tweet-text.with-linebreaks").innerText,
	icon : "dummy_icon.png"
    }
}

function spawn_observer(query, option){
    const target = document.querySelector(query);
    
    if(!target) return null;
    console.log("find dom : ", target);
    
    const obs = new MutationObserver((recs) => {
	recs.forEach((rec) => {
	    rec.addedNodes.forEach((node) => {
		send_msg(make_notification_data(node));
	    });
	});
    });
    
    obs.observe(target, option);

    return obs;
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
	switch(request.from){
	case 'popup' :
	    console.log("recieve:",request);
	    const query = request.msg;
	    spawn_observer(query, {childList:true});
	    break;
	default :
	    return;
	}
    }
);
