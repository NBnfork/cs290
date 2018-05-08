/*****************************************************************************
 * Description: elt is a utility function from EloquentJavaScript.net that
 * makes DOM elements given a type and the names of each child
 * @param type
 * @param children
 * @returns {HTMLElement | HTMLSelectElement | HTMLLegendElement | HTMLTableCaptionElement | HTMLTextAreaElement | HTMLModElement | HTMLHRElement | HTMLOutputElement | HTMLPreElement | HTMLEmbedElement | HTMLCanvasElement | HTMLFrameSetElement | HTMLMarqueeElement | HTMLScriptElement | HTMLInputElement | HTMLUnknownElement | HTMLMetaElement | HTMLStyleElement | HTMLObjectElement | HTMLTemplateElement | HTMLBRElement | HTMLAudioElement | HTMLIFrameElement | HTMLMapElement | HTMLTableElement | HTMLAnchorElement | HTMLMenuElement | HTMLPictureElement | HTMLParagraphElement | HTMLTableDataCellElement | HTMLTableSectionElement | HTMLQuoteElement | HTMLTableHeaderCellElement | HTMLProgressElement | HTMLLIElement | HTMLTableRowElement | HTMLFontElement | HTMLSpanElement | HTMLTableColElement | HTMLOptGroupElement | HTMLDataElement | HTMLDListElement | HTMLFieldSetElement | HTMLSourceElement | HTMLBodyElement | HTMLDirectoryElement | HTMLDivElement | HTMLUListElement | HTMLHtmlElement | HTMLAreaElement | HTMLMeterElement | HTMLAppletElement | HTMLFrameElement | HTMLOptionElement | HTMLImageElement | HTMLLinkElement | HTMLHeadingElement | HTMLSlotElement | HTMLVideoElement | HTMLBaseFontElement | HTMLTitleElement | HTMLButtonElement | HTMLHeadElement | HTMLParamElement | HTMLTrackElement | HTMLOListElement | HTMLDataListElement | HTMLLabelElement | HTMLFormElement | HTMLTimeElement | HTMLBaseElement}
 */

function elt(type, ...children) {
    let node = document.createElement(type);
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
    }
    return node;
}

function makeButton(name) {
//code from: https://www.w3schools.com/jsref/met_document_createelement.asp
    var btn = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode(name);       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    document.body.appendChild(btn);                    // Append <button> to <body>
}


function addClickEListener(name, funcName){
    document.getElementById(name).addEventListener("click" , funcName);
}

//make table
var tableToAdd = document.createElement("table");
//give it a border
//make header row
let headRow = document.createElement("tr");
for(var i = 1; i < 5; i++){
    //make cell and fill
    let headCell = document.createElement("th");
    headCell.textContent = "Header " +i;
    //add cell to row
    headRow.appendChild(headCell);
    headCell.style.border = "1px solid";
}
//add head row
tableToAdd.appendChild(headRow);

//fill rest of table
//make three rows and with four columns
for(var i = 1; i < 4; i++) {
    let row = document.createElement("tr");
    for (var j = 1; j < 5; j++) {
        let cell = document.createElement("td");
        cell.textContent = j + ', ' + i;

        row.appendChild(cell);
        cell.style.border = "1px solid";
    }
    tableToAdd.appendChild(row);
}

document.querySelector("#theTable").appendChild(tableToAdd);
//give table a border
tableToAdd.style.borderStyle = "solid";

//make buttons
makeButton("Left");
makeButton("Right");
makeButton("Up");
makeButton("Down");
makeButton("Mark Cell");

addClickEListener("Left", moveRight);
addClickEListener("Right", moveLeft);
addClickEListener("Up" , moveUp);
addClickEListener("Down", moveDown);
addClickEListener("Mark Cell", markCell);

function markCell(name){
    let toUpdate = document.getElementById(name);
    if(toUpdate.style.backgroundColor != "yellow"){
        toUpdate.style.backgroundColor = "yellow"
    }
}








