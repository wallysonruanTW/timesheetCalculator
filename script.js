function calculateTime(checkInElementId, checkOutElementId, lunchCheckboxElementId) {
    var checkin = document.querySelector(checkInElementId).value;
    var checkout = document.querySelector(checkOutElementId).value;

    if (!checkin || !checkout) {
        return null;
    }

    checkin = convertToDecimal(checkin);
    checkout = convertToDecimal(checkout);
    var lunch = document.querySelector(lunchCheckboxElementId).checked ? 1 : 0;

    var result = checkout - checkin - lunch;

    if (result < 0) {
        result = 0;
    }

    return result.toFixed(2);
}

function convertToDecimal(time) {
    var hhmm = time.split(":");
    var hours = parseInt(hhmm[0]);
    var minutes = parseInt(hhmm[1]);
    return hours + minutes / 60;
}

function updateResultUnit(checkInElementId, checkOutElementId, lunchCheckboxElementId, resultContainerElementId) {
    var resultTime = document.querySelector(resultContainerElementId);

    var time = calculateTime(checkInElementId, checkOutElementId, lunchCheckboxElementId);
    if (time) {
        resultTime.value = time;
    }
}

function updateResultTotal() {
    let results = document.querySelectorAll(".result__unit");
    let finalResult = 0;
    let resultAll = document.querySelector("#result__total");

    results.forEach((result) => {
        finalResult += result.value;
    });

    resultAll.value = finalResult;
}

function newEntryRow() {
    let table = document.querySelector("tbody");

    let row = document.createElement("tr");
    let columnCheckIn = document.createElement("td");
    let columnCheckOut = document.createElement("td");
    let columnLunch = document.createElement("td");
    let columnResultUnit = document.createElement("td");

    let inputCheckIn = createInputCheck("in");
    let inputCheckOut = createInputCheck("out");
    let inputLunchCheckbox = document.createElement("input");
    inputLunchCheckbox.className = "input--checkbox";
    inputLunchCheckbox.id = "lunch_checkbox_" + getTotalOfRowsPlusOne();
    inputLunchCheckbox.checked = true;
    inputLunchCheckbox.type = "checkbox";
    let inputResultUnit = document.createElement("input");
    inputResultUnit.classList.add("input--text", "result", "result__unit");
    inputResultUnit.id = "result_unit_" + getTotalOfRowsPlusOne();
    inputResultUnit.readOnly = true;
    inputResultUnit.type = "text";

    columnCheckIn.appendChild(inputCheckIn)
    columnCheckOut.appendChild(inputCheckOut);
    columnLunch.appendChild(inputLunchCheckbox);
    columnResultUnit.appendChild(inputResultUnit);

    row.appendChild(columnCheckIn);
    row.appendChild(columnCheckOut);
    row.appendChild(columnLunch);
    row.appendChild(columnResultUnit);
    row.className = "entry-row";

    table.appendChild(row);
}

function createInputCheck(inOrOut) {
    let inputCheck = document.createElement("input");
    inputCheck.type = "time";
    inputCheck.required = "required";
    inputCheck.className = "input--time";
    inputCheck.id = "check" + inOrOut + "_time_" + getTotalOfRowsPlusOne();

    return inputCheck;
}

function getTotalOfRowsPlusOne() {
    let table = document.querySelectorAll(".entry-row");
    return table.length + 1;
}

function copyResultTotal() {
    var resultTime = document.querySelector("#result__total");
    resultTime.select();
    navigator.clipboard.writeText(resultTime.value);
    alert("The value: " + resultTime.value + " has been copied to the clipboard.");
}
