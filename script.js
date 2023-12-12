let firstOperand = null;
let secondOperand = null;
let operator = null;
let firstOperation = true;
let calculatedValue = false;
let screenDisplay;

const add = (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1, num2) => {
    return num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const divide = (num1, num2) => {
    return num1 / num2;
}

const operate = (operator, firstOperand, secondOperand) => {
    let num1 = parseInt(firstOperand);
    let num2 = parseInt(secondOperand);
    switch(operator) {
        case "add":
            return add(num1, num2);
            break;
        case "subtract":
            return subtract(num1, num2);
            break;
        case "multiply":
            return multiply(num1, num2);
            break;
        case "divide":
            return divide(num1, num2);
            break;
    } 
}

// Buttons populate display
const display = document.querySelector("#screen");
const allButtons = document.querySelectorAll("button");
console.log(allButtons);

const screenRefresh = () => {
    display.innerText = screenDisplay;
}

const updateDisplay = (btn) => {
    if (btn.target.classList.contains("numBtn")) {
        if (calculatedValue) {
            firstOperation = true;
            calculatedValue = false;
            firstOperand = null;
        }
        if (firstOperation) {
            // First number input (additional digits)
            if (firstOperand != null && secondOperand == null && operator == null) {
                firstOperand += btn.target.id;
                screenDisplay += btn.target.id;
            } 
            // First number input (initial digit)
            if (firstOperand == null && secondOperand == null && operator == null) {
                firstOperand = btn.target.id;
                screenDisplay = firstOperand;
            } 

            // Second number input (additional digits)
            if (operator != null && secondOperand != null) {
                secondOperand += btn.target.id;
                screenDisplay += btn.target.id;
            }

            // Second number input (initial digit)
            if (operator != null && secondOperand == null) {
                secondOperand = btn.target.id;
                screenDisplay += secondOperand;
                firstOperation = false;
            }
        } else {
            // Second number input (additional digits)
            if (secondOperand != null) {
                secondOperand += btn.target.id;
                screenDisplay += btn.target.id;
            }

            // Second number input (initial digit)
            if (secondOperand == null) {
                secondOperand = btn.target.id;
                screenDisplay += secondOperand;
            }
        }
    }
    
    // Operator button pressed
    if (btn.target.classList.contains("operatorBtn")) {
        if (!calculatedValue) {
            // First operator ever
            if (firstOperation) {
                operator = btn.target.id;
                screenDisplay += btn.target.innerText;
            } else {
                firstOperand = operate(operator, firstOperand, secondOperand)
                operator = btn.target.id;
                screenDisplay += btn.target.innerText;
                secondOperand = null;
            }
        } else {
            operator = btn.target.id;
            screenDisplay += btn.target.innerText;
            calculatedValue = false;
        }
    }

    if (btn.target.id == "calculate") {
        if (operator && firstOperand && secondOperand) {
            firstOperand = operate(operator, firstOperand, secondOperand);
            
            if (firstOperand == Infinity) {
                screenDisplay = "Whoa, just take it easy man";
                firstOperand = null;
                secondOperand = null;
                operator = null;
                firstOperation = true;
                setTimeout(() => screenDisplay = "Resetting in 3...", 2000);
                setTimeout(screenRefresh, 2500);
                setTimeout(() => screenDisplay = "Resetting in 3...2...", 3000);
                setTimeout(screenRefresh, 3500);
                setTimeout(() => screenDisplay = "Resetting in 3...2...1...", 4000);
                setTimeout(screenRefresh, 4500);
                setTimeout(() => screenDisplay = "", 5000);
                setTimeout(screenRefresh, 5500);
            } else {
                screenDisplay = firstOperand.toFixed(2).toString();
                secondOperand = null;
                operator = null;
                firstOperation = true;
                calculatedValue = true;
            }
        } 
    }

    if (btn.target.id == "clear") {
        screenDisplay = "";
        firstOperand = null;
        secondOperand = null;
        operator = null;
        firstOperation = true;
        calculatedValue = false;
    }

    screenRefresh();
};

allButtons.forEach((btn) => btn.addEventListener('click', updateDisplay));

