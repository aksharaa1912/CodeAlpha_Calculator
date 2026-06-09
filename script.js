const display = document.getElementById('display');
const history = document.getElementById('history');
const bannerMessage = document.getElementById('banner-message');

let currentInput = '0';
let calculationDone = false;

// Spidey phrases for calculations
const spideyPhrases = [
    "Boom! Your answer is here!",
    "Spidey-Sense calculated it perfectly!",
    "Web-slinging math complete! 🕸️",
    "With great calculation comes great responsibility!",
    "Peter Parker approved math check!",
    "Boom! Bullseye result locked in!",
    "Thwip! Numbers solved securely! 🕷️"
];

function clearAll() {
    currentInput = '0';
    history.innerText = '';
    display.innerText = '0';
    calculationDone = false;
    bannerMessage.innerText = "Spidey-Sense Math Mode: Active!";
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
    bannerMessage.innerText = "Weaving operators into the web...";
}

function triggerResult() {
    try {
        if (!currentInput) return;
        history.innerText = currentInput + ' =';
        let result = new Function(`return ${currentInput}`)();
        if (result === Infinity || isNaN(result)) {
            currentInput = 'Error';
            bannerMessage.innerText = "Web broke! Try another formula.";
        } else {
            currentInput = Number(result.toFixed(8)).toString();
            const randomPhrase = spideyPhrases[Math.floor(Math.random() * spideyPhrases.length)];
            bannerMessage.innerText = randomPhrase;
        }
    } catch (error) {
        currentInput = 'Error';
        bannerMessage.innerText = "Web broke! Try another formula.";
    }
    display.innerText = currentInput;
    calculationDone = true;
}

// 🎯 THE BONUS KEYBOARD SUPPORT LOGIC:
window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        inputNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        inputOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault(); // Prevents page from jumping
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
