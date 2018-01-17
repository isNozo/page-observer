function send_msg_from_content(data){
    chrome.runtime.sendMessage(
	{from: "content", msg: data},
	(response) => {}
    );
}

function spawn_observer(query, option){
    const target = document.querySelector(query);
    
    if(!target) return null;
    console.log("find dom : ", target);
    
    const obs = new MutationObserver((rec) => {
	console.log(rec);
	send_msg_from_content(rec[0].addedNodes[0].querySelector(".tweet-body").innerText);
    });
    
    obs.observe(target, option);

    return obs;
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
	if(request.from != "extension") return;
	
	const query = request.msg;
	spawn_observer(query, {childList:true});
    }
);
