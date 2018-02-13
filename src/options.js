function create_form(id, value){
    const input_field = document.createElement("div");
    input_field.classList.add("input-field");
    input_field.id = id;

    const input = document.createElement("input")
    input.type = "text";
    input.value = value;

    const label = document.createElement("label");
    label.for = id;
    label.textContent = id;

    input_field.appendChild(input);
    input_field.appendChild(label);

    return input_field;
}

document.addEventListener('DOMContentLoaded', () => {
    const props_field = document.getElementById("props");
    
    chrome.storage.sync.get(null, (items) => {
	for(const target of items.targets){
	    console.log("target:", target);
	    props_field.appendChild(create_form("query", target.query));
	    props_field.appendChild(create_form("title", target.title.query));
	    props_field.appendChild(create_form("body", target.body.query));
	    props_field.appendChild(create_form("icon", target.icon.query));
	    props_field.appendChild(create_form("image", target.image.query));
	    props_field.appendChild(document.createElement("br"));
	}
    });
});
