console.log("content.js is loaded!");

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {console.log("res":request.msg)}
);
