// Four basic operations
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

// Stored variables
let firstOperand;
let secondOperand;
let operator;

// Operate
const operate = (operator, firstOperand, secondOperand) => {
    switch(operator) {
        case "+":
            add(firstOperand, secondOperand);
            break;
        case "-":
            subtract(firstOperand, secondOperand);
            break;
        case "×":
            multiply(firstOperand, secondOperand);
            break;
        case "÷":
            divide(firstOperand, secondOperand);
            break;
        default:
            ;
    } 
}