var app = Elm.Content.init();

window.addEventListener("load", () => {
    const obs = new MutationObserver((recs) => {
        recs.forEach((rec) => {
            rec.addedNodes.forEach((node) => {
                app.ports.observe.send(node.nodeName);
            });
        });
    });
    obs.observe(document, {childList:true, subtree:true, attributes:false, characterData:false});
});
