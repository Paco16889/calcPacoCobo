



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
        if (operator === 'hex') {
            let resultadoHex = decimalAHexadecimal(prev);
            currentInput = resultadoHex;
            operator = '';
            previousInput = '';
            updateDisplay();
            return;
        }
        
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
            case 'bin':
                result = decimalAbinarioUoctal(prev, operator); 
                break;
            
            case 'oct':
                result = decimalAbinarioUoctal(prev, operator); 
                break;

            case 'dec':
                result = binarioAdecimal(prev); 
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
    
    setInterval(dameReloj, 1000);
    updateDisplay();
    setupEventListeners();
    enciendeModos();
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
                        if (activarBinaria || activarOctal) {
                            calculateBin();
                        }else if (activarHexa) {
                            calculateHexa(previousInput, currentInput);
                        }else{
                            calculate();
                        }
                    } else if (value) {
                        appendToDisplay(value);
                    }else if (action === 'mr' || action === 'm') {
                        //variable igual a lo que valga enese momento currentInput
                        memorizarNumero(action);
                    }else if (value && action) {
                    
                        calculate();
                    }else if(action === 'selectBin'){
                        activarBinaria = true;
                        activarHexa = false;
                        activarOctal = false;
                    }else if(action === 'selectHex'){
                        activarHexa = true;
                        activarBinaria = false;
                        activarOctal = false;
                    }else if(action === 'selectOct'){
                        activarOctal = true;
                        activarBinaria = false;
                        activarHexa = false;
                    }else if(action === 'selectDec'){
                        activarBinaria = false;
                        activarHexa = false;
                        activarOctal = false;
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

function gradianes(angulo: number): number{
    return angulo/(Math.PI/180);
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
function mostrarModoCientifico() {
    const containerCientifica = document.getElementById("containerCientifica")as unknown as HTMLDivElement;
    if (!containerCientifica) {
        return;
    }
        containerCientifica.innerHTML= `
        <button class="btn mr" data-action="mr">MR</button>
      <button class="btn mr" data-action="m">M</button>
      <button class="btn mr irr" data-value="pi">π</button>
      <button class="btn mr irr" data-value="euler">e</button>
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



function mostrarModoBinario() {
    const containerBinario = document.getElementById("containerBinaria")as unknown as HTMLDivElement;
    if (!containerBinario) {
        return;
    }
        containerBinario.innerHTML= `
        <button class="btn operator bin" data-value="bin">bin</button>
      <button class="btn operator bin" data-value="hex">hex</button>
      <button class="btn operator bin" data-value="oct">octal</button>
      <button class="btn operator bin" data-value="dec">dec</button>
        `;
        const calculadora = document.getElementById("calculator") as unknown as HTMLDivElement;
        if(!calculadora){
            return;
        }
        calculadora.classList.add('grande');
        const botoneraPrincipal = document.getElementById('buttonsPrimarios') as unknown as HTMLDivElement;
        botoneraPrincipal.classList.add('grande');
       
        botoneraPrincipal.innerHTML = ``;
        botoneraPrincipal.innerHTML = `
        <button class="btn clear" data-action="clear">Clear</button>
      <button class="btn operator" data-action="delete">⌫</button>
      <button class="btn operator" data-action="selectBin">OpBin</button>
      <button class="btn operator" data-action="selectHex">OpHex</button>
      <button class="btn operator" data-action="selectOct">OpOct</button>
      <button class="btn operator" data-action="selectDec">OpDec</button>

      
      <button class="btn number" data-value="c">C</button>
      <button class="btn number" data-value="d">D</button>
      <button class="btn number" data-value="e">E</button>
      <button class="btn number" data-value="f">F</button>
      <button class="btn operator" data-value="%">%</button>
      <button class="btn operator" data-value="/">/</button>
      
      
      <button class="btn number" data-value="8">8</button>
      <button class="btn number" data-value="9">9</button>
      <button class="btn number" data-value="a">A</button>
      <button class="btn number" data-value="b">B</button>
      <button class="btn operator" data-value="*">×</button>
      <button class="btn operator" data-value="-">-</button>
      
      
      
      
      
      <button class="btn number" data-value="4">4</button>
      <button class="btn number" data-value="5">5</button>
      <button class="btn number" data-value="6">6</button>
      <button class="btn number" data-value="7">7</button>
      <button class="btn operator" data-value="+">+</button>
      <button class="btn number" data-value=".">.</button>
      
      
      <button class="btn number zero grande" data-value="0">0</button>
      <button class="btn number" data-value="1">1</button>
      <button class="btn number" data-value="2">2</button>
      <button class="btn number" data-value="3">3</button>
      <button class="btn equals grande" data-action="calculate" rowspan="2">=</button>
      
      
        `;
}
function enciendeModos() {
    
        const slider = document.getElementById("sliderCientifica") as HTMLInputElement;
        const slider2 = document.getElementById("sliderBinaria") as HTMLInputElement;
        const calculadora = document.getElementById("calculator") as unknown as HTMLDivElement;

        const containerCientifica = document.getElementById("containerCientifica")as unknown as HTMLDivElement;
        const containerBinario = document.getElementById("containerBinaria") as unknown as HTMLDivElement;
        const containerPrimario = document.getElementById('buttonsPrimarios')as unknown as HTMLDivElement;
        const originalHtml = containerPrimario.innerHTML;
    
    if (!slider) return;
    if (!slider2) return;
    slider.addEventListener('change', () => {
        if (slider.checked) {
            mostrarModoCientifico();
        }else{
            containerCientifica.innerHTML =``;
        }
    });

    slider2.addEventListener('change', () => {
        if (slider2.checked) {
            mostrarModoBinario();
        }else{
            containerBinario.innerHTML = `` ;
            containerPrimario.innerHTML = originalHtml;
            containerPrimario.classList.remove('grande');
            calculadora.classList.remove('grande');
        }
    });
        
}

function decimalAbinarioUoctal(n: number, sistema: string) : number{
    
    let divisor: number = 2;
    if (n === 0) {
    return 0;
  }
  if (sistema === 'oct') {
    divisor = 8;
  }
  let dividendo = n
  let resto = 0;
  let listaRestos: number[] = [];
  let listaRestosGirada: number[] = [];
  let binarioString = '';
 while (dividendo != 0) {
    resto = dividendo % divisor
    dividendo = Math.floor(dividendo / divisor);
    listaRestos.push(resto);
 }
  
 for (let i = listaRestos.length - 1;i >= 0; i--) {
  listaRestosGirada.push(listaRestos[i]!);
  
 }

 binarioString = listaRestosGirada.join('');

  return parseInt(binarioString);
    //recibe un número y con el algoritmo que tengo en el otro codigo 
    //hacemos el nmero binario se pasa a string
    // y se parsea indicando que es un string que representa numero binario 
}

function decimalAHexadecimal(n:number): string {
    let hexaString: string = '';

    if (n===0) {
        return '0';
    }
    let dividendo = n;
    let resto: number = 0;
    let caracteresHexa: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let listaRestos: string[] = [];
    let listaRestosGirada: string [] = [];
    while (dividendo!= 0 ) {
        resto = dividendo % 16 ;
        dividendo = (Math.floor(dividendo / 16));
        listaRestos.push(caracteresHexa[resto]!);
    }

    for (let i = listaRestos.length - 1; i >= 0 ; i--){
        listaRestosGirada.push(listaRestos[i]!);
       
    }
    hexaString = listaRestosGirada.join('');
    
    return hexaString;
}


function binarioAdecimal(n:number):number {
    let numeroString = n.toString();
    let numeros: number[] = [];
    let numeroDevuelto: number = 0;
    
    let j: number = Math.pow(2, numeroString.length -1);                                  

    for (let i = 0; i < numeroString.length; i++) {
        numeros[i] = (parseInt(numeroString.charAt(i))) *j;
        numeroDevuelto += numeros[i]!;
        j/=2;                                              
    }
   
    return numeroDevuelto;
}
function otroHex(n:number): string {
    return n.toString(16)
}


function calculateBin(): void {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        let modo: number = 2;
        let modoString: string = 'bin'
        if (activarOctal) {
            modo = 8;
            modoString = 'oct'
        }
        const prev = parseInt(previousInput, modo);
        const current = parseInt(currentInput, modo);
        if (Number.isNaN(prev) || Number.isNaN(current)) {
            currentInput = 'ERROR';
            operator = '';
            previousInput = '';
            updateDisplay();
            return;
        }
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
          
            
            default:
                return;
        } 

        result = decimalAbinarioUoctal(result,modoString);
        


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

function calculateHexa(n: string, z: string): void {
    if (n !== '' && z !== '' && operator !== '') {
        let a = parseInt(n, 16);
        let b = parseInt(z, 16);
        let resu: number = 0;
        switch (operator) {
            case '+':
                resu = a + b;
                break;
            case '-':
                resu = a - b;
                break;
            case '*':
                resu = a * b;
                break;
            case '%':
                resu = a % b;
                break;
            case '/':
                resu = a / b; 
                break;
            
                //estos deben ser resultado directo nada maspulsar boton de los de exponente fijo o base fija(logaritmos)
            
            default:
                return;
        } 

        
        if (resu === Infinity || Number.isNaN(resu) ) {
            currentInput = 'ERROR';
            operator = '';
            previousInput = '';
            updateDisplay();
        } else {
        let result = decimalAHexadecimal(resu);
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
        }  

    }
    
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