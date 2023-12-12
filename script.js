// Four basic operations
const add = (num1, num2) => {
    return parseInt(num1) + parseInt(num2);
}

const subtract = (num1, num2) => {
    return parseInt(num1) - parseInt(num2);
}

const multiply = (num1, num2) => {
    return parseInt(num1) * parseInt(num2);
}

const divide = (num1, num2) => {
    return parseInt(num1) / parseInt(num2);
}

// Stored variables
let firstOperand = null;
let secondOperand = null;
let operator = null;
let firstOperation = true;
let calculatedValue = false;

// Operate
const operate = (operator, firstOperand, secondOperand) => {
    switch(operator) {
        case "add":
            return add(firstOperand, secondOperand);
            break;
        case "subtract":
            return subtract(firstOperand, secondOperand);
            break;
        case "multiply":
            return multiply(firstOperand, secondOperand);
            break;
        case "divide":
            return divide(firstOperand, secondOperand);
            break;
        default:
            ;
    } 
}

// Buttons populate display
const display = document.querySelector("#screen");
const allButtons = document.querySelectorAll("button");

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
                display.innerText += btn.target.id;
            } 
            // First number input (initial digit)
            if (firstOperand == null && secondOperand == null && operator == null) {
                firstOperand = btn.target.id;
                display.innerText = firstOperand;
            } 

            // Second number input (additional digits)
            if (operator != null && secondOperand != null) {
                secondOperand += btn.target.id;
                display.innerText += btn.target.id;
            }

            // Second number input (initial digit)
            if (operator != null && secondOperand == null) {
                secondOperand = btn.target.id;
                display.innerText += secondOperand;
                firstOperation = false;
            }
        } else {
            // Second number input (additional digits)
            if (secondOperand != null) {
                secondOperand += btn.target.id;
                display.innerText += btn.target.id;
            }

            // Second number input (initial digit)
            if (secondOperand == null) {
                secondOperand = btn.target.id;
                display.innerText += secondOperand;
            }
        }
    }
    
    // Operator button pressed
    if (btn.target.classList.contains("operatorBtn")) {
        if (!calculatedValue) {
            // First operator ever
            if (firstOperation) {
                operator = btn.target.id;
                display.innerText += btn.target.id;
            } else {
                firstOperand = operate(operator, firstOperand, secondOperand)
                operator = btn.target.id;
                display.innerText += btn.target.id;
                secondOperand = null;
            }
        } else {
            operator = btn.target.id;
            display.innerText += btn.target.id;
            secondOperand = null;
        }
    }

    if (btn.target.id == "calculate") {
        if (operator && firstOperand && secondOperand) {

        } else {
            console.log(`operator: ${operator}`);
            console.log(typeof operator);
            console.log(`firstOperand: ${firstOperand}`);
            console.log(typeof firstOperand);
            console.log(`secondOperand: ${secondOperand}`);
            console.log(typeof secondOperand);
            firstOperand = operate(operator, firstOperand, secondOperand);
            display.innerText = firstOperand;
            secondOperand = null;
            operator = null;
            firstOperation = true;
            calculatedValue = true;
        }
        
    }

    if (btn.target.id == "clear") {
        display.innerText = "";
        firstOperand = null;
        secondOperand = null;
        operator = null;
        firstOperation = true;
        calculatedValue = false;
    }
    
};

allButtons.forEach((btn) => btn.addEventListener('click', updateDisplay));

