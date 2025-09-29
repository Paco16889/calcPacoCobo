



let currentInput: string = '0';
let operator: string = '';
let previousInput: string = '';
let numeroEnMemoria: string = '';
let activarBinaria: boolean = false;
let activarHexa: boolean = false;
let activarOctal: boolean = false;

function appendToDisplay(value: string): void {
    let update = false;
    const signos = ['+', '-', '*', '/', '%', '^2', '^n', 'v2', 'vn', '-1', 'log2', 'log10', 'logn(X)', 'ln', 'abs', 'sen', 'cos', 'tan', 'sec', 'cosec', 'cotan', 'bin', 'hex', 'oct', 'dec'];
    if (signos.includes(value) ) {
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
    }else if(currentInput === 'euler'){
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
        let result: number|string;
      
        
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
            
            case 'ln':
                result = Math.log(prev); 
                break;
            case 'abs':
                result = Math.abs(prev); 
                break;
           
            
            default:
                return;
        } 
        


       
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    
    setInterval(dameReloj, 1000);
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





function dameReloj() {
      
           // const now = new Date();
            let ahora = (Math.floor(Date.now()/1000))+7200;//hacer un selector mediante boton o algo para horario de verano
            //y barajar cambio de hora
            let segundos = ahora % 60;
            let minutos = (Math.floor(ahora / 60)) % 60;
            let horas = (Math.floor(ahora / 3600)) % 24; 
            let dias = Math.floor(ahora/(3600 * 24)); 
            let horaString:string = `${hacerPad(horas, 2)}:${hacerPad(minutos, 2)}:${hacerPad( segundos, 2)}`;
            let element = document.getElementById('reloj');
            if( element)
              element.innerHTML = 
            horaString;

           
            
        
          
}

function hacerPad(n: number, cantidad: number): string {
    const numero = n.toString();
    return numero.padStart(cantidad, '0');
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