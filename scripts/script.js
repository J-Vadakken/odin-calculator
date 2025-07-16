
let state = {
    curNum: 0,
    curOp: "",
    prevOp: "+",
    evalNum: 0,
    decimal: false,
    curDecimal: 0,
    curDigitCount: 0,
    state: "newNum"
}

function evaluate() {
    prevNum = state.evalNum;
    curNum = state.curNum;
    switch (state.prevOp) { 
        case "+":
            state.evalNum = prevNum + curNum;
        break;
        case "-":
            state.evalNum = prevNum - curNum;
        break;
        case "x":
            state.evalNum = prevNum * curNum;
        break;
        case "/":
            if (curNum == 0) {
                console.log("ERROR");
                display.textContent = "ERROR";
            } 
            else {
            state.evalNum = prevNum / curNum;
            }
        break;
        default: 
            state.evalNum = curNum;
        break;
    }

    console.log(state.evalNum);

}

function NumPress(num) {
    if (state.state == "newNum") {
        state.prevOp = state.curOp;
        state.curNum = num;
        state.curDigitCount ++;
        state.state = "curNum";
    }
    else if (state.curDigitCount >= 8) {
        return undefined;
    }
    else if (state.decimal == false) {
        state.curNum *= 10;
        state.curNum += num;
        state.curDigitCount ++;
    }
    else {
        state.curNum += num*(10**(-1*state.curDecimal));
        state.curNum = parseFloat(state.curNum.toFixed(11))
        state.curDecimal ++;
        state.curDigitCount++;
        state.decimal = true;
    }
    updateDisplay();
}

function OpPress(op) {
    evaluate();
    state.state = "newNum";
    state.curDecimal = 0;
    state.curDigitCount = 0;
    state.curOp = op;
}

function DecimalPress() {
    if (state.state == "newNum") {
        state.prevOp = state.curOp;
        state.curNum = 0;
        state.curDigitCount ++;
        state.state = "curNum";
    }
    state.curDecimal = 1;
    state.decimal = true;
    updateDisplay();
}

function DelPress() {
    if (state.state == "curNum") {
        state.state = "newNum";

        state.curNum = 0;
        updateDisplay();

        state.decimal = false;
        state.curDecimal = 0;
        state.curDigitCount = 0;
        state.state = "newNum";
    }
}

function EqualPress() {
    evaluate();
    state.curNum = state.evalNum;
    state.evalNum = 0;
    state.state = "newNum";
    state.curDecimal = 0;
    state.curDigitCount = 0;
    state.decimal = false;
    state.prevOp = "+";
    state.curOp = "";

    updateDisplay();
}

function ACPress() {
    state.curNum = 0;
    updateDisplay();
    state.curOp = "";
    state.prevOp = "+";
    state.evalNum = 0;
    state.decimal = false;
    state.curDecimal = 0;
    state.curDigitCount = 0;
    state.state = "newNum";

}



function updateDisplay() {
    display.textContent = parseFloat(state.curNum.toFixed(8));
}



console.log("Hello World");

const buttons = document.querySelectorAll(".cbutton")
const display = document.querySelector(".display")

const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const OPERATIONS = ["+", "-", "/", "x"]

buttons.forEach(but=> {
    if (NUMBERS.includes(but.textContent)) {
        but.addEventListener("click", () => NumPress(parseFloat(but.textContent)));
    }
    else if (but.textContent == ".") {
        but.addEventListener("click", DecimalPress);
    }
    else if (OPERATIONS.includes(but.textContent)) {
        but.addEventListener("click", () => OpPress(but.textContent));
    }
    else if (but.textContent == "=") {
        but.addEventListener("click", EqualPress);
    }
    else if (but.textContent == "AC") {
        but.addEventListener("click", ACPress);
    }
    else if (but.textContent == "DEL") {
        but.addEventListener("click", DelPress)
    }

})











// NumPress(5);
// DecimalPress();
// NumPress(5);
// console.log(state.evalNum);
// OpPress("/")
// console.log(state.evalNum);
// NumPress(2);
// OpPress("+");
// DecimalPress();
// NumPress(2);
// OpPress("*")
// console.log(state.evalNum);


// NumPress(5);