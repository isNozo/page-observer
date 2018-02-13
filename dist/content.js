/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

const url_regexp = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

chrome.storage.sync.clear();
chrome.storage.sync.set({
    targets : [
	{
	    query : ".column-type-home .chirp-container",
	    title : {query : ".account-inline.txt-ellipsis", props : ["innerText"]},
	    body : {query : ".tweet-text.with-linebreaks", props : ["innerText"]},
	    icon : {query : ".tweet-avatar.avatar.pin-top", props : ["src"]},
	    image : {query : ".js-media-image-link", props : ["style", "backgroundImage"]}
	},
	{
	    query : ".column-type-search .chirp-container",
	    title : {query : ".account-inline.txt-ellipsis", props : ["innerText"]},
	    body : {query : ".tweet-text.with-linebreaks", props : ["innerText"]},
	    icon : {query : ".tweet-avatar.avatar.pin-top", props : ["src"]},
	    image : {query : ".js-media-image-link", props : ["style", "backgroundImage"]}
	}
    ]
});

chrome.storage.sync.get(null, (items) => {
    console.log("get storage:", items);
});

function send_msg(data){
    console.log("send:",data);
    chrome.runtime.sendMessage(
	{from : "content", msg : data}
    )
}

function access_props(node, props){
    let elem = node;
    for(const prop of props){
	if(elem !== undefined){
	    elem = elem[prop];		
	}else{
	    return null;
	}
    }
    return elem;
}

function make_notification_data(node,item){
    const img_node = node.querySelector(item.image.query);
    if(img_node){
	return {
	    type : "image",
	    title : access_props(node.querySelector(item.title.query), item.title.props),
	    body : access_props(node.querySelector(item.body.query), item.body.props),
	    icon : url_regexp.exec(access_props(node.querySelector(item.icon.query), item.icon.props))[0],
	    imageUrl : url_regexp.exec(access_props(img_node, item.image.props))[0]
	}
    } else {
	return {
	    type : "basic",
	    title : access_props(node.querySelector(item.title.query), item.title.props),
	    body : access_props(node.querySelector(item.body.query), item.body.props),
	    icon : url_regexp.exec(access_props(node.querySelector(item.icon.query), item.icon.props))[0]
	}
    }
}

function spawn_observer(item, option){
    const target = document.querySelector(item.query);
    
    if(!target) return null;
    console.log("find dom : ", target);
    
    const obs = new MutationObserver((recs) => {
	recs.forEach((rec) => {
	    rec.addedNodes.forEach((node) => {
		console.log("node:",node);
		send_msg(make_notification_data(node,item));
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
	    const item = request.msg;
	    spawn_observer(item, {childList:true});
	    break;
	default :
	    return;
	}
    }
);


/***/ })
/******/ ]);