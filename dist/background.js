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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function notify(msg){
    imgURL_to_blob(msg.icon).then((icon_blob) => {
	switch(msg.type){
	case "image":
	    imgURL_to_blob(msg.imageUrl).then((image_blob) => {
		chrome.notifications.create({
		    type : "image",
		    title : msg.title,
		    message : msg.body,
		    iconUrl : icon_blob,
		    imageUrl : image_blob
		});
	    });
	    break;
	case "basic":
	    chrome.notifications.create({
		type : "basic",
		title : msg.title,
		message : msg.body,
		iconUrl : icon_blob,
	    });
	    break;
	}
    });
}

function imgURL_to_blob(imgURL){
    return new Promise((resolve, reject) => {
	const request = new XMLHttpRequest();
	request.open('GET', imgURL);
	request.responseType = "blob";

	request.addEventListener("load", () => {
	    if(request.status === 200) {
		resolve(window.URL.createObjectURL(request.response));
	    } else {
		reject(Error(imgURL + " didn\'t load successfully."));
	    }
	});
	request.send();
    });
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
	switch(request.from){
	case 'content' :
	    console.log("recieve:", request);
	    notify(request.msg);
	    break;
	default :
	    return;
	}
    }
);


/***/ })
/******/ ]);