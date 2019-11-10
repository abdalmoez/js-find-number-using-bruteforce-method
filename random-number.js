function inputNumberCheck() {
    var innum = document.getElementById('inNumberform');
    var helpblock = document.getElementById('helpblock');
    var num = document.getElementById('inNumber');

    if (num.value.length !== 8) {
        helpblock.innerText = `Unvalid number (Length must be equal to 8).`;
        innum.classList.remove('has-success');
        innum.classList.add('has-error');
        num.classList.remove('is-valid');
        num.classList.add('is-invalid');
        return false;

    }

    innum.classList.remove('has-error');
    innum.classList.add('has-success');
    num.classList.remove('is-invalid');
    num.classList.add('is-valid');
    helpblock.innerText = '';
    return true;

}
function setNumber() {
    if (inputNumberCheck())
        localStorage.setItem('number', document.getElementById('inNumber').value);
}
function getNumber() {

    var val = localStorage.getItem('number');
    if (val === null) {
        if ( inputNumberCheck()== false) {
            alert('Unvalid number');    
            return;
        }
        setNumber();
        val = localStorage.getItem('number');
    }

    var ar = [];
    var randomIndex;

    for (var i = 0; i < 3; i++) {
        do {
            randomIndex = Math.floor(Math.random() * val.length);
        } while (ar.find(c => c == randomIndex));
        ar.push(randomIndex);
        val = val.replaceAt(randomIndex, 'X');
    }
    return val;
}
function checkNumber(num) {
    return num == localStorage.getItem('number');
}
function find() {
    var startNumber = getNumber();
    var timewatch = Date.now();
    var solution = "";
    var ar = [];
    for (var i = 0; i < startNumber.length; i++) {
        if (startNumber[i] == 'X') {
            ar.push(i);
            solution = solution + "0";
        } else solution = solution + startNumber[i];
    }

    var counter = Math.pow(10, ar.length);
    while (checkNumber(solution) == false && counter-- >= 0) {
        //console.log(solution);
        //NextValue
        for (var idx = 0; idx < ar.length; idx++) {

            if (solution[ar[idx]] == '9') {
                solution = solution.replaceAt(ar[idx], "0");
            } else {
                solution = solution.replaceAt(ar[idx], String.fromCharCode(solution.charCodeAt(ar[idx]) + 1));
                break;
            }
        }

    }
    var res = document.getElementById('result');
    if (counter < 0)
        res.innerHTML = `no Solution found for ${startNumber}<br>`;
    else res.innerHTML = `Solution ${solution} of ${startNumber}<br>`;
    res.innerHTML = res.innerHTML + `Number of try: ${Math.pow(10, ar.length) - counter}<br>`;
    res.innerHTML = res.innerHTML + `Time: ${Date.now() - timewatch} ms`;

}
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}