console.log("content.js is loaded!");

function spawn_observer(query, option){
    const target = get_dom_from_page(query);
    
    if(!target) return null;
    console.log("find dom : ", target);
    
    const obs = new MutationObserver((rec) => {
	console.log(rec);
    });
    
    obs.observe(target, option);
    console.log("spawn observer!");

    return obs;
}

function get_dom_from_page(query){
    return document.querySelector(query);
}

function send_notification(msg){
    chrome.notifications.create({
	type: "basic",
	title: "Page Observer",
	message: msg,
	iconUrl: "dummy_icon.png"
    });
}

function get_data_from_rec(rec){
    const dom = rec[0].addedNodes[0];
    if(!dom){
	return dom.innerText;
    }else{
	return "";
    }
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
	const query = request.msg;
	console.log("res:"+query);
	spawn_observer(query, {childList: true});
    }
);
