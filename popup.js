console.log("popup.js is loaded!");

function send(data){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	chrome.tabs.sendMessage(
	    tabs[0].id,
	    {msg: data},
	    (res) => {}
	);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#rq_button').addEventListener('click', () => {
	const query = document.querySelector('#query_input').value;
	console.log("snd:"+query);
	send(query);
    });
});
