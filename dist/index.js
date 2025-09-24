"use strict";
let currentInput = '0';
let operator = '';
let previousInput = '';
function appendToDisplay(value) {
    let update = false;
    if (['+', '-', '*', '/', '%'].includes(value)) {
        if (currentInput !== '0' && currentInput !== '') {
            if (previousInput !== '' && operator !== '') {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            currentInput = '0';
        }
    }
    else {
        update = true;
        //se usa este condicional para meter que si currentInput vale Error
        //para que si escribimos algo despues de Error la pantalla quede a lo que escribimos 
        if ((currentInput === '0' && value !== '.') || currentInput === 'ERROR') {
            currentInput = value;
        }
        else {
            currentInput += value;
        }
    }
    if (update) {
        updateDisplay();
    }
}
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = currentInput;
}
function clearDisplay() {
    currentInput = '0';
    operator = '';
    previousInput = '';
    updateDisplay();
}
function deleteLast() {
    //&& currentInput.slice(0, 5) === 'ERROR' para que aunque escribe numeros despues de ERROR
    //dandole a delete nos deje la pantalla a 0 como cuando solo está ERROR 
    if (currentInput.length > 1 && currentInput !== 'ERROR') {
        currentInput = currentInput.slice(0, -1);
    }
    else {
        currentInput = '0';
    }
    updateDisplay();
}
function calculate() {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;
        let dividePor0 = false;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '%':
                result = prev % current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        if (result === Infinity || Number.isNaN(result)) {
            currentInput = 'ERROR';
            operator = '';
            previousInput = '';
            updateDisplay();
        }
        else {
            currentInput = result.toString();
            operator = '';
            previousInput = '';
            updateDisplay();
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    setupEventListeners();
});
function setupEventListeners() {
    const buttonsContainer = document.querySelector('.buttons');
    if (buttonsContainer) {
        buttonsContainer.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'BUTTON') {
                const action = target.dataset.action;
                const value = target.dataset.value;
                if (action === 'clear') {
                    clearDisplay();
                }
                else if (action === 'delete') {
                    deleteLast();
                }
                else if (action === 'calculate') {
                    calculate();
                }
                else if (value) {
                    appendToDisplay(value);
                }
            }
        });
    }
}
//# sourceMappingURL=index.js.map