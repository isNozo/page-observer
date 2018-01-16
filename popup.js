console.log("popup.js is loaded!");

function send_req(query){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	chrome.tabs.sendMessage(
	    tabs[0].id,
	    {msg: query},
	    (res) => {}
	);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#rq_button').addEventListener('click', () => {
	const query = document.querySelector('#query_input').value;
	console.log("snd:"+query);
	send_req(query);
    });
});
