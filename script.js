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

function updateResult(checkInElementId, checkOutElementId, lunchCheckboxElementId, resultContainerElementId) {
    var resultTime = document.querySelector(resultContainerElementId);

    var time = calculateTime(checkInElementId, checkOutElementId, lunchCheckboxElementId);
    if (time) {
        resultTime.value = time;
    }
}

function updateFinalResult() {
    let results = document.querySelectorAll(".result__unit");
    let finalResult = 0;
    let resultAll = document.querySelector("#result--all");

    results.forEach((result) => {
        finalResult += result.value;
    });

    resultAll.value = finalResult;
}


function copyResult() {
    var resultTime = document.querySelector("#result--all");
    resultTime.select();
    navigator.clipboard.writeText(resultTime.value);
    alert("The value: "+ resultTime.value + " has been copied to the clipboard.");
}
