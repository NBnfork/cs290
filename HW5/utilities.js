function elt(type, ...children) {
    let node = document.createElement(type);
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
    }
    return node;
}


function makeButton(name, clickFunction) {
//code modified from: https://www.w3schools.com/jsref/met_document_createelement.asp
    var btn = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode(name);       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    document.body.appendChild(btn);                    // Append <button> to <body>
    //add click event to button
    btn.addEventListener("click" , clickFunction);
}
