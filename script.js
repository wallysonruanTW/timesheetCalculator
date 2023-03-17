function calculateTime(checkInElementId, checkOutElementId, lunchCheckboxElementId) {
    let checkIn = document.getElementById(checkInElementId).value;
    let checkOut = document.getElementById(checkOutElementId).value;

    if (checkIn == "") {
        checkIn = "0:00";
    }

    if (checkOut == "") {
        checkOut = "0:00";
    }

    checkIn = convertToDecimal(checkIn);
    checkOut = convertToDecimal(checkOut);
    const lunch = document.getElementById(lunchCheckboxElementId).checked ? 1 : 0;

    let result = checkOut - checkIn - lunch;

    if (result < 0) {
        result = 0;
    }

    return parseFloat(result).toFixed(2);
}

function convertToDecimal(time) {
    const hhmm = time.split(":");
    const hours = parseInt(hhmm[0]);
    const minutes = parseInt(hhmm[1]);
    return hours + minutes / 60;
}

function updateResultUnit(checkInElementId, checkOutElementId, lunchCheckboxElementId, resultContainerElementId) {
    const resultTime = document.getElementById(resultContainerElementId);

    const time = calculateTime(checkInElementId, checkOutElementId, lunchCheckboxElementId);
    if (time == 0) {
        return;
    }
    resultTime.value = time;
}

function updateResultTotal() {
    const results = Array.from(document.querySelectorAll(".result__unit"));
    const resultAll = document.querySelector("#result__total");

    resultAll.value = results.reduce((accumulator, current) => {
        if(current.value == ""){
            return 0;
        }
        return accumulator + parseFloat(current.value);
    }, 0);
}

function createNewEntryRow() {
    const table = document.querySelector("tbody");

    const row = document.createElement("tr");
    const columnCheckIn = document.createElement("td");
    const columnCheckOut = document.createElement("td");
    const columnLunch = document.createElement("td");
    const columnResultUnit = document.createElement("td");
    const columnDeleteRowButton = document.createElement("td");
    columnDeleteRowButton.headers = "blank";

    const checkIn = document.createElement("input");
    checkIn.type = "time";
    checkIn.required = "required";
    checkIn.className = "input--time";
    checkIn.id = "checkIn_time_" + getTotalOfEntryRowsPlusOne();

    const checkOut = document.createElement("input");
    checkOut.type = "time";
    checkOut.required = "required";
    checkOut.className = "input--time";
    checkOut.id = "checkOut_time_" + getTotalOfEntryRowsPlusOne();

    const lunchCheckbox = document.createElement("input");
    lunchCheckbox.className = "input--checkbox";
    lunchCheckbox.id = "lunch_checkbox_" + getTotalOfEntryRowsPlusOne();
    lunchCheckbox.type = "checkbox";

    const resultUnit = document.createElement("input");
    resultUnit.classList.add("input--text", "result", "result__unit");
    resultUnit.id = "result_unit_" + getTotalOfEntryRowsPlusOne();
    resultUnit.readOnly = true;
    resultUnit.type = "text";
    resultUnit.value = 0.00;

    const deleteRowButton = document.createElement("button");
    deleteRowButton.type = "button";
    deleteRowButton.classList.add("button--delete-row");
    deleteRowButton.ariaLabel = "Delete this line."
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
    return document.querySelector("tbody").children.length + 1;
}

function deleteRow(event) {
    const aboveRow = event.target.parentNode.parentNode.previousElementSibling;
    aboveRow.children[0].children[0].focus();
    event.target.parentNode.parentNode.remove();
}

async function copyResultTotal(){
    const resultAll = document.querySelector("#result__total");
    
    await navigator.clipboard.writeText(resultAll.value);
    alert("Total time has been coppied.");
}