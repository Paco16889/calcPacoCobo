"use strict";
let currentInput = '0';
let operator = '';
let previousInput = '';
let numeroEnMemoria = '';
function appendToDisplay(value) {
    let update = false;
    const signos = ['+', '-', '*', '/', '%', '^2', '^n', 'v2', 'vn', '-1', 'log2', 'log10', 'logn(X)', 'ln', 'abs', 'sen', 'cos', 'tan', 'sec', 'cosec', 'cotan'];
    if (signos.includes(value)) {
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
    const checkNumer = currentInput;
    if (currentInput === 'pi') {
        const piNumero = Math.PI;
        currentInput = piNumero.toString();
    }
    else if (currentInput === 'e') {
        const eNumero = Math.E;
        currentInput = eNumero.toString();
    }
    else if (currentInput === 'phi') {
        const phiNumero = (1 + Math.sqrt(5)) / 2;
        currentInput = phiNumero.toString();
    }
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
                result = Math.sqrt(prev);
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
            case 'sen':
                result = Math.sin(gradianes(prev));
                break;
            case 'cos':
                result = Math.cos(gradianes(prev));
                break;
            case 'tan':
                result = Math.tan(gradianes(prev));
                break;
            case 'sec':
                result = 1 / Math.cos(gradianes(prev));
                break;
            case 'cosec':
                result = 1 / Math.sin(gradianes(prev));
                break;
            case 'cotan':
                result = 1 / Math.tan(gradianes(prev));
                break;
            //hasta aqui
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
    setInterval(dameReloj, 1000);
    updateDisplay();
    setupEventListeners();
    enciendeCientifica();
});
function setupEventListeners() {
    const buttonsContainer = document.querySelectorAll('.buttons');
    if (buttonsContainer) {
        buttonsContainer.forEach(container => {
            container.addEventListener('click', (event) => {
                const target = event.target;
                if (target.tagName === 'BUTTON') {
                    const action = target.dataset.action;
                    const value = target.dataset.value;
                    //aqui es donde creo que tengo que tocar para decir que cuando haga por ejemplo
                    //algo al cuadrado solo dando al action del cuadrado entre en calculate teniendo ya 
                    //operator
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
                    else if (action === 'mr' || action === 'm') {
                        //variable igual a lo que valga enese momento currentInput
                        memorizarNumero(action);
                    }
                    else if (value && action) {
                        calculate();
                    }
                }
            });
        });
    }
}
function memorizarNumero(action) {
    if (action === 'mr') {
        numeroEnMemoria = currentInput;
    }
    else {
        currentInput = numeroEnMemoria;
        updateDisplay();
    }
}
function logNdX(base, numero) {
    return Math.log(numero) / Math.log(base);
}
function gradianes(angulo) {
    return angulo / (Math.PI / 180);
}
function dameReloj() {
    // const now = new Date();
    let ahora = (Math.floor(Date.now() / 1000)) + 7200; //hacer un selector mediante boton o algo para horario de verano
    //y barajar cambio de hora
    let segundos = ahora % 60;
    let minutos = (Math.floor(ahora / 60)) % 60;
    let horas = (Math.floor(ahora / 3600)) % 24;
    let dias = Math.floor(ahora / (3600 * 24));
    let horaString = `${hacerPad(horas, 2)}:${hacerPad(minutos, 2)}:${hacerPad(segundos, 2)}`;
    let element = document.getElementById('reloj');
    if (element)
        element.innerHTML =
            horaString;
}
function hacerPad(n, cantidad) {
    const numero = n.toString();
    return numero.padStart(cantidad, '0');
}
function mostrarModoCientifico() {
    const containerCientifica = document.getElementById("containerCientifica");
    if (!containerCientifica) {
        return;
    }
    containerCientifica.innerHTML = `
        <button class="btn mr" data-action="mr">MR</button>
      <button class="btn mr" data-action="m">M</button>
      <button class="btn mr irr" data-value="pi">π</button>
      <button class="btn mr irr" data-value="e">e</button>
      <button class="btn mr irr" data-value="phi">Φ</button>
      <button class="btn operator sci" data-action="^2" data-value="^2">^2</button>
      <button class="btn operator sci" data-value="^n">^N</button>
      <button class="btn operator sci" data-action="v2" data-value="v2">V2</button>
      <button class="btn operator sci" data-value="vn">Vn</button>
      <button class="btn operator sci" data-value="log10">Log10</button>
      <button class="btn operator sci" data-value="log2">Log2</button>
      <button class="btn operator sci" data-value="logn(X)">Logn(X)</button>
      
      <button class="btn operator sci" data-value="abs">ABS</button>
      <button class="btn operator sci" data-value="-1">-n</button>
      <button class="btn operator tri" data-value="sen">sen</button>
      <button class="btn operator tri" data-value="cos">cos</button>
      <button class="btn operator tri" data-value="tan">tan</button>
      <button class="btn operator tri" data-value="sec">sec</button>
      <button class="btn operator tri" data-value="cosec">cosec</button>
      <button class="btn operator tri" data-value="cotan">cotan</button>
        `;
}
function enciendeCientifica() {
    const slider = document.getElementById("sliderCientifica");
    const containerCientifica = document.getElementById("containerCientifica");
    if (!slider)
        return;
    slider.addEventListener('change', () => {
        if (slider.checked) {
            mostrarModoCientifico();
        }
        else {
            containerCientifica.innerHTML = ``;
        }
    });
}
//REVISA QUE CUANDO TENGAS UN NUMERO Y PRESIONES UN NUMERO IRREAL LO SUSTITUYA POR EL VALOR DEL NUEMRO IRREAL
// YT NO AÑADA EL DATA-VALUE(MIRA EL LA PARTE QUE CONTROLA VALOR Y ACCION DE CADA BOTON Y PON UN ACONCICION DE SI
//VALOR === PI ENTONCES UPDATEDISPLAY A VER QUE HACE)
//quita logaritmo neperiano y mete los botones de trigonometria dentro de los sci que solo añade una linea mas y los pongo con otro color o algo
//# sourceMappingURL=index.js.map