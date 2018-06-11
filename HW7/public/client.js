/***************************************************************************
 * Program: Exercise Log
 * Author: Noah Buchen
 * Date: 10 June 2018
 * Description: Using Ajax, Node.js and mySql, a user will be able to log
 * excerises. Each log will be displayed in a table that can be edited via
 * asyched requests.
***************************************************************************/

document.addEventListener('DOMContentLoaded', bindNewSaveButton, loadPage);


function deleteRow(tableID, currentRow) {
    //sendRequest to DB through node
    var table = document.getElementById(tableID);
    document.getElementById('Delete').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();
        //build query string
        let payload = currentRow.id;
        //send request

        req.open('GET', "flip1.oregonstate.edu:10001/?id=" + payload);
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                tableID.deleteRow(currentRow.id + 1);
            }
            else {
                alert("Error in network request:" + req.statusText)
            }
        });
    });
    event.preventDefault();
}
function updateRow(tableID, currentRow){
    var table = document.getElementById(tableID);
    document.getElementById('Edit').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();
        //build query string
        let payload = currentRow.id;
        //send request

        req.open('GET', "flip1.oregonstate.edu:10001/update?id=" + payload);
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                insertRowFromDB(table, response);
                event.preventDefault();
            }
            else {
                alert("Error in network request:" + req.statusText)
            }
        });
    });
    event.preventDefault();
}

function insertRowFromDB(tableID, response){
    //make row
    let row = document.createElement("tr");
    for (var i = 0; i < 8; i++) {
        //make cells and fill
        let cell = document.createElement("th");
        switch (i) {
            case 0: {
                cell.type = "hidden";
                cell.name = 'id';
                cell.textContent = response.id;
                row.appendChild(cell);
                cell.style.border = "1px solid";
            }
                break;
            case 1: {
                cell.textContent = response.name;
                row.appendChild(cell);
                cell.style.border = "1px solid";
            }
                break;
            case 2: {
                cell.textContent = response.reps;
                row.appendChild(cell);
                cell.style.border = "1px solid";
            }
                break;
            case 3: {
                cell.textContent = response.weight;
                row.appendChild(cell);
                cell.style.border = "1px solid";
            }
                break;
            case 4: {
                if (response.units) {
                    cell.textContent = "kilos";
                }
                else {
                    cell.textContent = "lbs";
                }
                row.appendChild(cell);
                cell.style.border = "1px solid";
            }
                break;
            case 5: {
                cell.textContent = response.date;
                row.appendChild(cell);
                cell.style.border = "1px solid";
            }
                break;
            case 6: {
                cell.type = "BUTTON";
                cell.id = "Edit";
                var btn = document.createElement("BUTTON");        // Create a <button> element
                var t = document.createTextNode("Edit");       // Create a text node
                btn.appendChild(t);                                // Append the text to <button>
                cell.appendChild(btn);                    // Append <button> to <body>
                //add click event to button
                btn.addEventListener("click", updateRow(tableID, row));
                row.appendChild(cell);
            }
                break;
            case 7: {
                cell.type = "BUTTON";
                cell.id = "Delete";
                var btn = document.createElement("BUTTON");        // Create a <button> element
                var t = document.createTextNode("Delete");       // Create a text node
                btn.appendChild(t);                                // Append the text to <button>
                cell.appendChild(btn);                    // Append <button> to <body>
                //add click event to button
                btn.addEventListener("click", deleteRow(tableID, row));
                row.appendChild(cell);
            }
                break;
        }
//add head row
        tableToAdd.appendChild(row);
    }
}



/***************************************************************************
 * This function will send the form data via a GET to the node server which
 * will then update the data base which will then send back the update to
 * the client and build the table
***************************************************************************/
function bindNewSaveButton(){
    document.getElementById('newSave').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        //build input
        let nameInput = document.getElementById("name");
        let  weightInput = document.getElementById("weight");
        let  repsInput = document.getElementById("reps");
        let  radioUnits = document.getElementById("kilos"); //1=kilos 0=lbs
        let  dateInput = document.getElementById("date");
        //build query string
        let payload = "?name=nameInput&reps=repsInput&weight=weightInput&units=radioUnits&date=dateInput";
        //send request
        if(nameInput !== NULL) {
            req.open('GET', "flip1.oregonstate.edu:10001/" + payload);
            //add data to table after response
            req.addEventListener('load', function () {
                if (req.status >= 200 && req.status < 400) {
                    table = document.getElementById("dataTable");
                    var response = JSON.parse(req.responseText);
                    insertRowFromDB(table, response);
                    event.preventDefault();
                }
                else {
                    alert("Error in network request:" + req.statusText)
                }
            });
        }
        else{
            alert("missing required data, try again");
        }
    })
}

function buildTable() {
//make table
    var tableToAdd = document.createElement("table");
//give it a border
//make header row
    let headRow = document.createElement("tr");
    for (var i = 0; i < 8; i++) {
        //make cells and fill
        let headCell = document.createElement("th");
        switch (i) {
            case 0: {
                headCell.type = "hidden";
                headCell.name = 'id';
                headRow.appendChild(headCell);
                headCell.style.border = "1px solid";
            }
                break;
            case 1: {
                headCell.textContent = "name";
                headRow.appendChild(headCell);
                headCell.style.border = "1px solid";
            }
                break;
            case 2: {
                headCell.textContent = "reps";
                headRow.appendChild(headCell);
                headCell.style.border = "1px solid";
            }
                break;
            case 3: {
                headCell.textContent = "weight";
                headRow.appendChild(headCell);
                headCell.style.border = "1px solid";
            }
                break;

            case 4: {
                headCell.textContent = "units";
                headRow.appendChild(headCell);
                headCell.style.border = "1px solid";
            }
                break;
            case 5: {
                headCell.textContent = "date";
                headRow.appendChild(headCell);
                headCell.style.border = "1px solid";
            }
                break;
            case 6: {
                headCell.type = "hidden";
                headRow.appendChild(headCell);
            }
                break;
            case 7: {
                headCell.type = "hidden";
                headRow.appendChild(headCell);
            }
                break;

        }
    }
//add head row
    tableToAdd.appendChild(headRow);
    document.querySelector("#dataTable").appendChild(tableToAdd);
//give table a border
    tableToAdd.style.borderStyle = "solid";
}

function loadPage(){
    var req = new XMLHttpRequest();
    req.addEventListener('load', function () {
        req.open('GET', 'flip1.oregonstate.edu:10001/');
        if (req.status > 400) {
            alert("Network Request Error")
        }
    });
}

loadPage();
buildTable();






