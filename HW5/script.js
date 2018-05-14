/*****************************************************************************
 * Description: elt is a utility function from EloquentJavaScript.net that
 * makes DOM elements given a type and the names of each child
 * @param type
 * @param children
 * @returns {HTMLElement}
 *
 *****************************************************************************/

function elt(type, ...children) {
    let node = document.createElement(type);
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
    }
    return node;
}
/*****************************************************************************
 * Description: makeButtion is a utility function that makes a button with
 * click event listener and adds it to the DOM tree.
 * @param name (of button)
 * @param clickFunction
 *****************************************************************************/
function makeButton(name, clickFunction) {
//code modified from: https://www.w3schools.com/jsref/met_document_createelement.asp
    var btn = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode(name);       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    document.body.appendChild(btn);                    // Append <button> to <body>
    //add click event to button
    btn.addEventListener("click" , clickFunction);
}

function buildTable() {
//make table
    var tableToAdd = document.createElement("table");
//give it a border
//make header row
    let headRow = document.createElement("tr");
    let firstCell = document.createElement("td");
    for (var i = 1; i < 5; i++) {
        //make cell and fill
        let headCell = document.createElement("th");
        headCell.textContent = "Header " + i;
        //add cell to row
        headRow.appendChild(headCell);
        headCell.style.border = "1px solid";
    }
//add head row
    tableToAdd.appendChild(headRow);
//fill rest of table
//make three rows and with four columns
    for (var i = 1; i < 4; i++) {
        let row = document.createElement("tr");
        for (var j = 1; j < 5; j++) {
            let cell = document.createElement("td");
            cell.textContent = j + ', ' + i;

            row.appendChild(cell);
            //highlight first cell, save it's ID
            if (j == 1 && i == 1) {
                cell.style.border = "3px solid"
                firstCell= cell;
            } else {
                cell.style.border = "1px solid";
            }
        }
        tableToAdd.appendChild(row);
    }

    document.querySelector("#theTable").appendChild(tableToAdd);
//give table a border
    tableToAdd.style.borderStyle = "solid";
    return firstCell;
}

function eventStructure(selectedCell){

    function highlightNew(currentHighlighted, toHighlight){
        currentHighlighted.style.border = "1px solid";
        toHighlight.style.border = "3px solid";
        selectedCell = toHighlight;
    }
    function moveRight(){
        if(selectedCell.textContent !== "4, 1" &&
            selectedCell.textContent !== "4, 2" &&
            selectedCell.textContent !== "4, 3") {
            highlightNew(selectedCell, selectedCell.nextElementSibling);
        }
    }

    function moveLeft(){
        if(selectedCell.textContent !== "1, 1" &&
            selectedCell.textContent !== "1, 2" &&
            selectedCell.textContent !== "1, 3"){
            highlightNew(selectedCell, selectedCell.previousElementSibling);
        }
    }

    function moveUp(){
        if(selectedCell.textContent !== "1, 1" &&
            selectedCell.textContent !== "2, 1" &&
            selectedCell.textContent !== "3, 1" &&
            selectedCell.textContent !== "4, 1"){
            //create nextCell
           let nextCell = selectedCell;
            //create rowList
            let rowList = document.getElementsByTagName("tr");
            switch (selectedCell.textContent){
                case "1, 2": nextCell = rowList[1].firstChild;
                    break;
                case "2, 2": nextCell = rowList[1].firstChild.nextSibling;
                    break;
                case "3, 2": nextCell = rowList[1].firstChild.nextSibling.nextSibling;
                    break;
                case "4, 2": nextCell = rowList[1].firstChild.nextSibling.nextSibling.nextSibling;
                    break;
                case "1, 3" : nextCell = rowList[2].firstChild;
                    break;
                case "2, 3": nextCell = rowList[2].firstChild.nextSibling;
                    break;
                case "3, 3": nextCell = rowList[2].firstChild.nextSibling.nextSibling;
                    break;
                case "4, 3": nextCell = rowList[2].firstChild.nextSibling.nextSibling.nextSibling;
                    break;

            }
            highlightNew(selectedCell, nextCell);
            //update selectedCell
            selectedCell = nextCell;
        }
    }

    function moveDown(){
        if(selectedCell.textContent !== "1, 3" &&
            selectedCell.textContent !== "2, 3" &&
            selectedCell.textContent !== "3, 3" &&
            selectedCell.textContent !== "4, 3"){
            //create nextCell to highlight
            let nextCell = selectedCell;
            //create rowList to access row above
            let rowList = document.getElementsByTagName("tr");
            switch (selectedCell.textContent) {
                case "1, 1" : nextCell = rowList[2].firstChild;
                    break;
                case "2, 1": nextCell = rowList[2].firstChild.nextSibling;
                    break;
                case "3, 1": nextCell = rowList[2].firstChild.nextSibling.nextSibling;
                    break;
                case "4, 1": nextCell = rowList[2].firstChild.nextSibling.nextSibling.nextSibling;
                    break;
                case "1, 2" : nextCell = rowList[3].firstChild;
                    break;
                case "2, 2": nextCell = rowList[3].firstChild.nextSibling;
                    break;
                case "3, 2": nextCell = rowList[3].firstChild.nextSibling.nextSibling;
                    break;
                case "4, 2": nextCell = rowList[3].firstChild.nextSibling.nextSibling.nextSibling;
                    break;
            }
            highlightNew(selectedCell, nextCell);
            //update selectedCell
            selectedCell = nextCell;
        }
    }

    function markCell(){
        if(selectedCell.style.backgroundColor != "yellow"){
            selectedCell.style.backgroundColor = "yellow"
        }
        //for testing
    }
    //make buttons
    makeButton("Left", moveLeft);
    makeButton("Right", moveRight);
    makeButton("Up", moveUp);
    makeButton("Down", moveDown);
    makeButton("Mark Cell" , markCell);


}


//create page
eventStructure(buildTable());







