function send_msg(data){
    console.log("send:",data);
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	chrome.tabs.sendMessage(
	    tabs[0].id,
	    {from : "popup", msg : data}
	)
    });
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#rq_button').addEventListener('click', () => {
	chrome.storage.sync.get("targets", (items) => {
	    console.log("get storage:", items);
	    for(const target of items.targets)
		send_msg(target);
	});
    });
});
