console.log("content.js is loaded!");

function spawn_observer(target, option){
    if(!target) return null;

    console.log(target);

    const obs = new MutationObserver((rec) => {
	console.log(rec);
    });
    
    obs.observe(target, option);

    return obs;
}

function get_dom_from_page(query){
    return document.querySelector(query);
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
	const query = request.msg;
	console.log("res:"+query);
	spawn_observer(get_dom_from_page(query),{childList: true});
    }
);
