const display = document.getElementById('display');
const history = document.getElementById('history');

let currentInput = '0';
let calculationDone = false;

function clearAll() {
    currentInput = '0';
    history.innerText = '';
    display.innerText = '0';
    calculationDone = false;
}

function inputNumber(num) {
    if (calculationDone) {
        currentInput = num;
        calculationDone = false;
    } else {
        if (currentInput === '0') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    display.innerText = currentInput;
}

function inputOperator(op) {
    calculationDone = false;
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    display.innerText = currentInput;
}

function triggerResult() {
    try {
        if (!currentInput) return;
        history.innerText = currentInput + ' =';
        let result = new Function(`return ${currentInput}`)();
        if (result === Infinity || isNaN(result)) {
            currentInput = 'Error';
        } else {
            currentInput = Number(result.toFixed(8)).toString();
        }
    } catch (error) {
        currentInput = 'Error';
    }
    display.innerText = currentInput;
    calculationDone = true;
}
