let display = document.getElementById('screen');
let expression = "";

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => b!== 0 ? a / b : "error";

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
    expression += button.getAttribute('data-value');
    display.textContent = expression; 
});
});

    document.getElementById('equal')
    .addEventListener('click', () => {
    try {
        const result = evaluateExpression(expression);
        display.textContent = result; 
        expression = result.toString();
    } catch (error) {
        display.textContent = "Error"; 
        expression = "";
    }
});

    document.getElementById('clear')
    .addEventListener('click', () => {
    expression = "";
    display.textContent = expression; 
});

// function evaluateExpression(expression){
//     const match = expression.match(/^(-?\d+(?:\.\d+)?)([+\-*/])(-?\d+(?:\.\d+)?)$/);
//     if(!match) throw "Invalid"

//     const [,num1, operator, num2] = match;
//     console.log(match);
    
    
//     const a = parseFloat(num1);
//     const b = parseFloat(num2);

//     switch (operator) {
//         case "+": return add(a, b);
//         case "-": return subtract(a, b);
//         case "*": return multiply(a, b);
//         case "/": return divide(a, b);
//         default: throw "Invalid Operator"
//     }

// }

// METHOD 1: Simple Split and Parse (Shortest)
function evaluateExpression1(expr) {
    const operators = ['+', '-', '*', '/'];
    
    for (let op of operators) {
        if (expr.includes(op)) {
            const parts = expr.split(op);
            if (parts.length === 2) {
                const a = parseFloat(parts[0]);
                const b = parsemFloat(parts[1]);
                
                switch(op) {
                    case '+': return a + b;
                    case '-': return a - b;
                    case '*': return a * b;
                    case '/': return b !== 0 ? a / b : 'Error';
                }
            }
        }
    }
    throw new Error('Invalid expression');
}

// METHOD 2: Using eval() with validation (Simplest but less secure)
function evaluateExpression2(expr) {
    // Only allow numbers, operators, and decimal points
    if (!/^[\d+\-*/.]+$/.test(expr)) {
        throw new Error('Invalid characters');
    }
    
    // Prevent multiple operators in a row
    if (/[+\-*/]{2,}/.test(expr)) {
        throw new Error('Invalid operators');
    }
    
    try {
        const result = eval(expr);
        return isFinite(result) ? result : 'Error';
    } catch (e) {
        throw new Error('Invalid expression');
    }
}

// METHOD 3: Find operator position method
function evaluateExpression3(expr) {
    const ops = 
    {
        '+': (a,b) => a+b, 
        '-': (a,b) => a-b, 
        '*': (a,b) => a*b, 
        '/': (a,b) => b!==0 ? a/b : 'Error'};
    
    for (let i = 1; i < expr.length; i++) {
        const char = expr[i];
        if ('+-*/'.includes(char)) {
            const a = parseFloat(expr.substring(0, i));
            const b = parseFloat(expr.substring(i + 1));
            return ops[char](a, b);
        }
    }
    throw new Error('No operator found');
}

// METHOD 4: Replace your current function with this simple version
function evaluateExpression(expression) {
    // Remove spaces
    const expr = expression.replace(/\s/g, '');
    
    // Find the operator (skip first character for negative numbers)
    let opIndex = -1;
    let operator = '';
    
    for (let i = 1; i < expr.length; i++) {
        if ('+-*/'.includes(expr[i])) {
            opIndex = i;
            operator = expr[i];
            break;
        }
    }
    
    if (opIndex === -1) throw new Error('No operator found');
    
    const num1 = parseFloat(expr.substring(0, opIndex));
    const num2 = parseFloat(expr.substring(opIndex + 1));
    
    if (isNaN(num1) || isNaN(num2)) throw new Error('Invalid numbers');
    
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'Error';
        default: throw new Error('Invalid operator');
    }
}

// METHOD 5: Ultra-compact one-liner approach
const evaluateExpression5 = expr => {
    const [,a,op,b] = expr.match(/^(-?\d*\.?\d+)([\+\-\*/])(-?\d*\.?\d+)$/) || [];
    return op ? {'+':+a+(+b), '-':+a-(+b), '*':+a*(+b), '/':b!=0?+a/(+b):'Error'}[op] : 'Error';
};

// RECOMMENDED: METHOD 4 - Replace your current evaluateExpression with this