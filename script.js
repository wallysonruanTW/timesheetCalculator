function updateResult() {
    var resultTime = document.getElementById('result_time');

    var time = calculateTime();
    if (time) {
        resultTime.value = time;
    }
}

function copyResult() {
    var resultTime = document.getElementById("result_time");
    resultTime.select();
    document.execCommand("Copy");
}

function calculateTime() {
    var checkin = document.getElementById('checkin_time').value;
    var checkout = document.getElementById('checkout_time').value;

    if (!checkin || !checkout) {
        return null;
    }

    checkin = convertToDecimal(checkin);
    checkout = convertToDecimal(checkout);
    var lunch = document.getElementById('lunch_time').checked ? 1 : 0;

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
