//CALCULATOR PROGRAM

const display = document.getElementById("display");
let memory = 0; // Initialize memory

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function clearEntry() {
    // Clear the last entered number or operator
    const lastIndex = display.value.length - 1;
    let startIndex = lastIndex;

    while (startIndex >= 0 && (/[0-9.]/.test(display.value[startIndex]))) {
        startIndex--;
    }
    if (display.value[startIndex] === '-' && (startIndex === 0 || !/[0-9.]/.test(display.value[startIndex - 1]))) {
        startIndex--;
    }
    
    if (startIndex < lastIndex) {
        display.value = display.value.substring(0, startIndex + 1);
    } else {
        display.value = "";
    }
}

function clearAll() {
    display.value = "";
    memory = 0;
}

function reciprocal() {
    try {
        display.value = 1 / eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

function square() {
    try {
        display.value = eval(display.value) ** 2;
    } catch (error) {
        display.value = "Error";
    }
}

function squareRoot() {
    try {
        const num = eval(display.value);
        if (num < 0) throw new Error("Negatif sayıların karekökü tanımsızdır.");
        display.value = Math.sqrt(num);
    } catch (error) {
        display.value = "Error: " + error.message;
    }
}

function toggleSign() {
    try {
        display.value = eval(display.value) * -1;
    } catch (error) {
        display.value = "Error";
    }
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function memoryAdd() {
    try {
        memory += eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

function memorySubtract() {
    try {
        memory -= eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

function memoryRecall() {
    display.value = memory;
}

function memoryClear() {
    memory = 0;
}

function factorial(n) {
    if (n < 0) throw new Error("Negatif sayıların faktöriyeli tanımsızdır.");
    if (n === 0) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

function calculate(){
    try{
        let expression = display.value;

        // Handle percentage (e.g., 50% becomes 0.5, 100+10% becomes 100 + 100*0.1)
        expression = expression.replace(/(\d+\.?\d*)%/g, (match, p1) => {
            return `*(${parseFloat(p1)} / 100)`;
        });

        // Sanitize the expression to prevent arbitrary code execution
        const sanitizedExpression = expression.replace(/[^\d+\-*\/().%^\sMath.]/g, '');
        
        // Use new Function for safer evaluation
        display.value = new Function('return ' + sanitizedExpression)();
    }
   catch(error){
    display.value = "Error: " + error.message;
   }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'c' || key === 'C') {
        clearAll();
    } else if (key === 'e' || key === 'E') {
        clearEntry();
    }
});