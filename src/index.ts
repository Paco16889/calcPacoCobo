let currentInput: string = '0';
let operator: string = '';
let previousInput: string = '';
let numeroEnMemoria: string = '';

function appendToDisplay(value: string): void {
    let update = false;
    if (['+', '-', '*', '/', '%', '^2', '^n', 'v2', 'vn', '-1', 'log2', 'log10', 'logn(X)', 'ln', 'abs'].includes(value) ) {
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
    const checkNumer = currentInput;
    if (currentInput === 'pi') {
        const piNumero = Math.PI;
        currentInput = piNumero.toString()
    }else if(currentInput === 'e'){
        const eNumero = Math.E;
        currentInput = eNumero.toString();
    }else if (currentInput === 'phi') {
        const phiNumero = (1 + Math.sqrt(5)) / 2;
        currentInput = phiNumero.toString();
    }

    
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
            
                //estos deben ser resultado directo nada maspulsar boton de los de exponente fijo o base fija(logaritmos)
            case '^2':
                result = Math.pow(prev, 2); 
                break;
            case '^n':
                result = Math.pow(prev, current); 
                break;
            case 'v2':
                result = Math.sqrt(prev) 
                break;
            case 'vn':
                result = Math.pow(prev, (1 / current)); 
                break;
            case '-1':
                result = prev * -1; 
                break;
            case 'log2':
                result = Math.log2(prev); 
                break;
            case 'log10':
                result = Math.log10(prev); 
                break;
            case 'logn(X)':
                result = logNdX(prev, current); 
                break;
            case 'ln':
                result = Math.log(prev); 
                break;
            case 'abs':
                result = Math.abs(prev); 
                break;
                //hasta aqui
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
    const buttonsContainer = document.querySelectorAll<HTMLDivElement>('.buttons');
    
    if (buttonsContainer) {

        buttonsContainer.forEach(container => {
            container.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            
            if (target.tagName === 'BUTTON') {
                const action = target.dataset.action;
                const value = target.dataset.value;
                //aqui es donde creo que tengo que tocar para decir que cuando haga por ejemplo
                //algo al cuadrado solo dando al action del cuadrado entre en calculate teniendo ya 
                //operator
                    if (action === 'clear') {
                        clearDisplay();
                    } else if (action === 'delete') {
                        deleteLast();
                    } else if (action === 'calculate') {
                        calculate();
                    } else if (value) {
                        appendToDisplay(value);
                    }else if (action === 'mr' || action === 'm') {
                        //variable igual a lo que valga enese momento currentInput
                        memorizarNumero(action);
                    }else if (value && action) {
                    
                        calculate();
                    }
                }
            });
        });
        
    }
}

function memorizarNumero(action: string) {
    
    if (action === 'mr') {
         numeroEnMemoria = currentInput;
        
    }else{
        currentInput = numeroEnMemoria; 
        updateDisplay();
    }

}

function logNdX(base: number, numero: number): number {
    return Math.log(numero) / Math.log(base)
}

//REVISA QUE CUANDO TENGAS UN NUMERO Y PRESIONES UN NUMERO IRREAL LO SUSTITUYA POR EL VALOR DEL NUEMRO IRREAL
// YT NO AÑADA EL DATA-VALUE(MIRA EL LA PARTE QUE CONTROLA VALOR Y ACCION DE CADA BOTON Y PON UN ACONCICION DE SI
//VALOR === PI ENTONCES UPDATEDISPLAY A VER QUE HACE)