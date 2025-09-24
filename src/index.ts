let currentInput: string = '0';
let operator: string = '';
let previousInput: string = '';

function appendToDisplay(value: string): void {
    let update = false;
    if (['+', '-', '*', '/', '%'].includes(value) ) {
        if (currentInput !== '0' && currentInput !== '') {
            if (previousInput !== '' && operator !== '') {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            currentInput = '0';
        }
    } else {
        update = true;
        //se usa este condicional para meter que si currentInput vale Error
        //para que si escribimos algo despues de Error la pantalla quede a lo que escribimos 
        if ((currentInput === '0' && value !== '.') || currentInput === 'ERROR') {
            currentInput = value; 
        } else {
            currentInput += value;
        }
    }
    if (update) {
        updateDisplay();
    }
}

function updateDisplay(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    display.value = currentInput;
}

function clearDisplay(): void {
    currentInput = '0';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function deleteLast(): void {
    
    //&& currentInput.slice(0, 5) === 'ERROR' para que aunque escribe numeros despues de ERROR
    //dandole a delete nos deje la pantalla a 0 como cuando solo está ERROR 
    if (currentInput.length > 1 && currentInput !== 'ERROR') {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate(): void {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result: number;
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
        


        if (result === Infinity || Number.isNaN(result) ) {
        currentInput = 'ERROR';
        operator = '';
        previousInput = '';
        updateDisplay();
        } else {
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

function setupEventListeners(): void {
    const buttonsContainer = document.querySelector('.buttons');
    
    if (buttonsContainer) {
        buttonsContainer.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            
            if (target.tagName === 'BUTTON') {
                const action = target.dataset.action;
                const value = target.dataset.value;
                
                if (action === 'clear') {
                    clearDisplay();
                } else if (action === 'delete') {
                    deleteLast();
                } else if (action === 'calculate') {
                    calculate();
                } else if (value) {
                    appendToDisplay(value);
                }
            }
        });
    }
}

