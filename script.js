function calculateTime(checkInElementId, checkOutElementId, lunchCheckboxElementId) {
    var checkIn = document.getElementById(checkInElementId).value;
    var checkOut = document.getElementById(checkOutElementId).value;

    if (checkIn == "") {
        checkIn = "00:00";
    }

    if (checkOut == "") {
        checkOut = "00:00";
    }

    checkIn = convertToDecimal(checkIn);
    checkOut = convertToDecimal(checkOut);
    var lunch = document.getElementById(lunchCheckboxElementId).checked ? 1 : 0;

    var result = checkOut - checkIn - lunch;

    if (result < 0) {
        result = 0;
    }

    return parseFloat(result).toFixed(2);
}

function convertToDecimal(time) {
    var hhmm = time.split(":");
    var hours = parseInt(hhmm[0]);
    var minutes = parseInt(hhmm[1]);
    return hours + minutes / 60;
}

function updateResultUnit(checkInElementId, checkOutElementId, lunchCheckboxElementId, resultContainerElementId) {
    var resultTime = document.getElementById(resultContainerElementId);

    var time = calculateTime(checkInElementId, checkOutElementId, lunchCheckboxElementId);
    if (time) {
        resultTime.value = time;
    }
}

function updateResultTotal() {
    let results = Array.from(document.querySelectorAll(".result__unit"));
    let resultAll = document.querySelector("#result__total");

    resultAll.value = results.reduce((accumulator, current) => {
        if(current.value == ""){
            return "";
        }
        return accumulator + parseFloat(current.value);
    }, 0);
}

function newEntryRow() {
    let table = document.querySelector("tbody");

    let row = document.createElement("tr");
    let columnCheckIn = document.createElement("td");
    let columnCheckOut = document.createElement("td");
    let columnLunch = document.createElement("td");
    let columnResultUnit = document.createElement("td");
    let columnDeleteRowButton = document.createElement("td");
    columnDeleteRowButton.headers = "blank";

    let checkIn = document.createElement("input");
    checkIn.type = "time";
    checkIn.required = "required";
    checkIn.className = "input--time";
    checkIn.id = "checkIn_time_" + getTotalOfEntryRowsPlusOne();

    let checkOut = document.createElement("input");
    checkOut.type = "time";
    checkOut.required = "required";
    checkOut.className = "input--time";
    checkOut.id = "checkOut_time_" + getTotalOfEntryRowsPlusOne();

    let lunchCheckbox = document.createElement("input");
    lunchCheckbox.className = "input--checkbox";
    lunchCheckbox.id = "lunch_checkbox_" + getTotalOfEntryRowsPlusOne();
    lunchCheckbox.type = "checkbox";

    let resultUnit = document.createElement("input");
    resultUnit.classList.add("input--text", "result", "result__unit");
    resultUnit.id = "result_unit_" + getTotalOfEntryRowsPlusOne();
    resultUnit.readOnly = true;
    resultUnit.type = "text";
    resultUnit.placeholder = "0.00";

    let deleteRowButton = document.createElement("button");
    deleteRowButton.type = "button";
    deleteRowButton.classList.add("button--delete-row");
    deleteRowButton.addEventListener("click", function (event) {
        deleteRow(event);
        updateResultTotal();
    });

    columnCheckIn.appendChild(checkIn)
    columnCheckOut.appendChild(checkOut);
    columnLunch.appendChild(lunchCheckbox);
    columnResultUnit.appendChild(resultUnit);
    columnDeleteRowButton.appendChild(deleteRowButton);

    row.appendChild(columnCheckIn);
    row.appendChild(columnCheckOut);
    row.appendChild(columnLunch);
    row.appendChild(columnResultUnit);
    row.appendChild(columnDeleteRowButton);

    row.addEventListener("change", function (event) {
        let entryRow = event.target.parentNode.parentNode;
        let checkInId = entryRow.children[0].children[0].id;
        let checkOutId = entryRow.children[1].children[0].id;
        let lunchCheckboxId = entryRow.children[2].children[0].id;
        let resultUnitId = entryRow.children[3].children[0].id;
        updateResultUnit(checkInId, checkOutId, lunchCheckboxId, resultUnitId);
    })

    table.appendChild(row);

    checkIn.focus();
}

function getTotalOfEntryRowsPlusOne() {
    return document.getElementsByTagName("tbody")[0].children.length + 1;
}

function deleteRow(event) {
    event.target.parentNode.parentNode.remove();
}
