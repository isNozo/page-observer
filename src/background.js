var app = Elm.Background.init();

app.ports.notify.subscribe(function(data) {
    chrome.notifications.create(options = {
        type : "basic",
        iconUrl : "./img/sample.png",
        title : "sample title",
        message : "sample message"
    });
});
