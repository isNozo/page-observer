function create_prop_field(target){
    const div = document.createElement("div");
    const field = `
    Query: ${target.query}
    Title: ${target.title.query}
    Body: ${target.body.query}
    Icon: ${target.icon.query}
    Image: ${target.image.query}
    `
    div.appendChild(document.createTextNode(field));
    return div;
}

document.addEventListener('DOMContentLoaded', () => {
    const props_field = document.getElementById("props");
    
    chrome.storage.sync.get(null, (items) => {
	for(const target of items.targets){
	    console.log("target:", target);
	    props_field.appendChild(create_prop_field(target));
	}
    });
});
