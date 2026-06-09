const display = document.getElementById('display');
const history = document.getElementById('history');

let currentInput = '0';
let calculationDone = false;

// 1. Clear Screen Function
function clearAll() {
    currentInput = '0';
    history.innerText = '';
    display.innerText = '0';
    calculationDone = false;
}

// 2. Input Number Function
function inputNumber(num) {
    if (calculationDone) {
        currentInput = num === '.' ? '0.' : num;
        calculationDone = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return; // Avoid double decimals
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    display.innerText = currentInput;
}

// 3. Input Operator Function
function inputOperator(op) {
    calculationDone = false;
    const lastChar = currentInput.trim().slice(-1);
    
    // Replace operator if already exists at the end
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.trim().slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    display.innerText = currentInput;
}

// 4. Calculate Final Result (Safe Execution)
function triggerResult() {
    try {
        if (!currentInput) return;
        
        // Save expression to history view
        history.innerText = currentInput + ' =';
        
        // Evaluate expression securely without unsafe eval()
        let result = new Function(`return ${currentInput}`)();
        
        // Check for division by zero or invalid results
        if (result === Infinity || isNaN(result)) {
            currentInput = 'Error';
        } else {
            // Fix long decimal floating numbers up to 8 digits max
            currentInput = Number(result.toFixed(8)).toString();
        }
    } catch (error) {
        currentInput = 'Error';
    }
    display.innerText = currentInput;
    calculationDone = true;
}

// 5. Bonus: Physical Keyboard Support Listener
window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        inputNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        inputOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        triggerResult();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearAll();
    } else if (e.key === 'Backspace') {
        if (calculationDone || currentInput === 'Error') {
            clearAll();
        } else if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
            display.innerText = currentInput;
        } else {
            currentInput = '0';
            display.innerText = '0';
        }
    }
});
