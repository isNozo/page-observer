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
	const query = document.querySelector('#query_input').value;
	send_msg(query);
    });
});
