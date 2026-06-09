// --- 1. CALCULATOR LOGIC CONFIGURATION ---
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
        currentInput = num === '.' ? '0.' : num;
        calculationDone = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    display.innerText = currentInput;
}

function inputOperator(op) {
    calculationDone = false;
    const lastChar = currentInput.trim().slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.trim().slice(0, -1) + op;
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

// --- 2. HTML5 DRAWING CANVAS LOGIC ---
const canvas = document.getElementById('doodleCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Setup pastel ink properties
ctx.strokeStyle = '#9c27b0'; 
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    
    // Track boundary canvas coordinates correctly
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event hooks mapping for Desktop Mouse and Mobile Touch pads
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e); });
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
