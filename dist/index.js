"use strict";
let currentInput = '0';
let operator = '';
let previousInput = '';
let numeroEnMemoria = '';
let horarioVerano = false;
function appendToDisplay(value) {
    let update = false;
    const signos = ['+', '-', '*', '/', '%', '^2', '^n', 'v2', 'vn', '-1', 'log2', 'log10', 'logn(X)', 'ln', 'abs', 'sen', 'cos', 'tan', 'sec', 'cosec', 'cotan', 'bin', 'hex', 'oct', 'dec'];
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
            default:
                return;
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    setInterval(actulizarHorario, 1000);
    setupEventListeners();
    activarBoton();
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
                    }
                    else if (action === 'delete') {
                    }
                    else if (value) {
                        appendToDisplay(value);
                    }
                    else if (action === 'mr' || action === 'm') {
                        //variable igual a lo que valga enese momento currentInput
                    }
                    else if (value && action) {
                        calculate();
                    }
                }
            });
        });
    }
}
function dameReloj(horarioVerano) {
    let utc = 3600;
    if (horarioVerano) {
        utc = 7200;
    }
    // const now = new Date();
    let ahora = (Math.floor(Date.now() / 1000)) + utc; //hacer un selector mediante boton o algo para horario de verano
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
function activarBoton() {
    const slider = document.getElementById("sliderCientifica");
    if (!slider)
        return;
    slider.addEventListener('change', () => {
        if (slider.checked) {
            horarioVerano = true;
        }
        else {
            horarioVerano = false;
        }
    });
}
function actulizarHorario() {
    dameReloj(horarioVerano);
}
//REVISA QUE CUANDO TENGAS UN NUMERO Y PRESIONES UN NUMERO IRREAL LO SUSTITUYA POR EL VALOR DEL NUEMRO IRREAL
// YT NO AÑADA EL DATA-VALUE(MIRA EL LA PARTE QUE CONTROLA VALOR Y ACCION DE CADA BOTON Y PON UN ACONCICION DE SI
//VALOR === PI ENTONCES UPDATEDISPLAY A VER QUE HACE)
//falta comprobar muchas cosas cuando pasas de octal y hexa decimal a binario no lo reconoce (hexadecimal facil con lasletras)
//octal habrá que decirle que si esta en modo octal y da a dec chico entonces convierta y este en el que este a los pequeños para cambiar de tipo de unidad
//pero como poner que si convierto un resultado no quiera seguir en el sistema o cambiar a decimal
//falta cuando cambio de modo pantalla a cero
//y seguir observando
//quita logaritmo neperiano y mete los botones de trigonometria dentro de los sci que solo añade una linea mas y los pongo con otro color o algo
//# sourceMappingURL=index.js.map