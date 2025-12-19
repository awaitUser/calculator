class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.history = document.getElementById('history');
        this.currentInput = '';
        this.previousInput = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.angleMode = 'deg'; // deg or rad
        this.currentNumberSystem = 'dec';
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.updateDisplay();
    }

    triggerConfetti() {
        const confettiCount = 50;
        const colors = ['#ff6b6b', '#00d4ff', '#51cf66', '#ffd43b', '#ff922b'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.classList.add(`confetti-${(i % 5) + 1}`);
            
            const startX = Math.random() * window.innerWidth;
            confetti.style.left = startX + 'px';
            confetti.style.top = '-20px';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => confetti.remove(), 3800);
        }
    }

    attachEventListeners() {
        // Number buttons
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNumber(e.target.dataset.number));
        });

        // Operator buttons
        document.querySelectorAll('.operator-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleOperator(e.target.dataset.operator));
        });

        // Function buttons
        document.querySelectorAll('[data-function]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFunction(e.target.dataset.function));
        });

        // Action buttons
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAction(e.target.dataset.action));
        });

        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        });

        // Number system buttons (Programmer mode)
        document.querySelectorAll('.num-sys-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchNumberSystem(e.target.dataset.system));
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentInput = '';
            this.shouldResetDisplay = false;
        }

        if (number === '.') {
            if (!this.currentInput.includes('.')) {
                this.currentInput += number;
            }
        } else {
            // Handle hex input in programmer mode
            if (this.currentNumberSystem !== 'dec' && number.match(/[A-F]/i)) {
                if (this.currentNumberSystem === 'hex' || this.currentNumberSystem === 'dec') {
                    this.currentInput += number.toUpperCase();
                }
            } else {
                this.currentInput += number;
            }
        }

        this.updateDisplay();
    }

    handleOperator(operator) {
        if (this.currentInput === '') return;

        if (this.previousInput !== '' && this.operator) {
            this.calculate();
        }

        this.previousInput = this.currentInput;
        this.currentInput = '';
        this.operator = operator;
        this.updateHistory();
    }

    handleFunction(fn) {
        if (this.currentInput === '' && fn !== 'pi' && fn !== 'e') return;

        try {
            let result;
            const num = parseFloat(this.currentInput) || 0;

            switch (fn) {
                case 'sqrt':
                    result = Math.sqrt(num);
                    break;
                case 'square':
                    result = num * num;
                    break;
                case 'cube':
                    result = num * num * num;
                    break;
                case 'power':
                    this.operator = '^';
                    this.previousInput = this.currentInput;
                    this.currentInput = '';
                    this.updateHistory();
                    return;
                case 'reciprocal':
                    result = 1 / num;
                    break;
                case 'sin':
                    result = this.angleMode === 'deg' ? 
                        Math.sin(num * Math.PI / 180) : Math.sin(num);
                    break;
                case 'cos':
                    result = this.angleMode === 'deg' ? 
                        Math.cos(num * Math.PI / 180) : Math.cos(num);
                    break;
                case 'tan':
                    result = this.angleMode === 'deg' ? 
                        Math.tan(num * Math.PI / 180) : Math.tan(num);
                    break;
                case 'atan':
                    result = this.angleMode === 'deg' ? 
                        Math.atan(num) * 180 / Math.PI : Math.atan(num);
                    break;
                case 'log':
                    result = Math.log10(num);
                    break;
                case 'ln':
                    result = Math.log(num);
                    break;
                case 'factorial':
                    result = this.factorial(Math.floor(num));
                    break;
                case 'pi':
                    result = Math.PI;
                    break;
                case 'e':
                    result = Math.E;
                    break;
                case 'percentage':
                    result = num / 100;
                    break;
                case 'abs':
                    result = Math.abs(num);
                    break;
                case 'mod':
                    this.operator = '%';
                    this.previousInput = this.currentInput;
                    this.currentInput = '';
                    this.updateHistory();
                    return;
                case 'deg-rad':
                    this.angleMode = this.angleMode === 'deg' ? 'rad' : 'deg';
                    this.updateHistory();
                    return;
                case 'and':
                    this.operator = '&';
                    this.previousInput = this.currentInput;
                    this.currentInput = '';
                    this.updateHistory();
                    return;
                case 'or':
                    this.operator = '|';
                    this.previousInput = this.currentInput;
                    this.currentInput = '';
                    this.updateHistory();
                    return;
                case 'xor':
                    this.operator = '^';
                    this.previousInput = this.currentInput;
                    this.currentInput = '';
                    this.updateHistory();
                    return;
                case 'not':
                    result = ~Math.floor(num);
                    break;
                default:
                    return;
            }

            this.currentInput = this.formatNumber(result);
            this.shouldResetDisplay = true;
            this.updateDisplay();
        } catch (error) {
            this.currentInput = 'Error';
            this.updateDisplay();
        }
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.currentInput = '';
                this.previousInput = '';
                this.operator = null;
                this.updateDisplay();
                this.updateHistory();
                break;
            case 'delete':
                this.currentInput = this.currentInput.slice(0, -1);
                this.updateDisplay();
                break;
            case 'toggleSign':
                if (this.currentInput !== '') {
                    const num = parseFloat(this.currentInput);
                    this.currentInput = String(num * -1);
                    this.updateDisplay();
                }
                break;
            case 'equals':
                this.calculate();
                break;
            case 'openParen':
                this.currentInput += '(';
                this.updateDisplay();
                break;
            case 'closeParen':
                this.currentInput += ')';
                this.updateDisplay();
                break;
        }
    }

    calculate() {
        if (this.previousInput === '' || this.currentInput === '' || !this.operator) return;

        // Check for birthday easter egg
        if (this.currentInput === '1909' && this.operator === null) {
            this.triggerConfetti();
        }

        try {
            let result;
            const prev = parseFloat(this.previousInput);
            const current = parseFloat(this.currentInput);

            if (this.currentNumberSystem !== 'dec') {
                result = this.performBitwiseOperation(prev, current);
            } else {
                switch (this.operator) {
                    case '+':
                        result = prev + current;
                        break;
                    case '-':
                        result = prev - current;
                        break;
                    case '*':
                        result = prev * current;
                        break;
                    case '/':
                        result = prev / current;
                        break;
                    case '^':
                        result = Math.pow(prev, current);
                        break;
                    case '%':
                        result = prev % current;
                        break;
                    case '&':
                        result = Math.floor(prev) & Math.floor(current);
                        break;
                    case '|':
                        result = Math.floor(prev) | Math.floor(current);
                        break;
                    case '^':
                        result = Math.floor(prev) ^ Math.floor(current);
                        break;
                    default:
                        return;
                }
            }

            this.currentInput = this.formatNumber(result);
            this.previousInput = '';
            this.operator = null;
            this.shouldResetDisplay = true;
            this.updateDisplay();
            this.updateHistory();
        } catch (error) {
            this.currentInput = 'Error';
            this.updateDisplay();
        }
    }

    performBitwiseOperation(prev, current) {
        const a = this.convertToDec(String(prev));
        const b = this.convertToDec(String(current));
        let result;

        switch (this.operator) {
            case '&':
                result = a & b;
                break;
            case '|':
                result = a | b;
                break;
            case '^':
                result = a ^ b;
                break;
            default:
                result = a + b;
        }

        return this.convertFromDec(result);
    }

    convertToDec(num) {
        const numStr = String(num).toUpperCase();
        switch (this.currentNumberSystem) {
            case 'hex':
                return parseInt(numStr, 16);
            case 'bin':
                return parseInt(numStr, 2);
            case 'oct':
                return parseInt(numStr, 8);
            default:
                return parseInt(numStr, 10);
        }
    }

    convertFromDec(num) {
        switch (this.currentNumberSystem) {
            case 'hex':
                return num.toString(16).toUpperCase();
            case 'bin':
                return num.toString(2);
            case 'oct':
                return num.toString(8);
            default:
                return String(num);
        }
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    formatNumber(num) {
        if (isNaN(num)) return 'Error';
        if (num === Infinity) return 'Infinity';
        if (num === -Infinity) return '-Infinity';

        // For large factorials and operations
        if (Math.abs(num) > 1e10) {
            return num.toExponential(6);
        }

        // Limit decimal places
        const rounded = Math.round(num * 1e10) / 1e10;
        return String(rounded);
    }

    updateDisplay() {
        this.display.value = this.currentInput || '0';
    }

    updateHistory() {
        let historyText = this.previousInput;
        if (this.operator) {
            historyText += ` ${this.operator} `;
        }
        this.history.textContent = historyText || '0';
    }

    switchMode(mode) {
        // Update active button
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        // Hide all mode contents
        document.querySelectorAll('.mode-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Show selected mode
        document.getElementById(`${mode}-mode`).classList.remove('hidden');

        // Reset calculator for new mode
        this.currentInput = '';
        this.previousInput = '';
        this.operator = null;
        this.updateDisplay();
        this.updateHistory();
    }

    switchNumberSystem(system) {
        // Update active button
        document.querySelectorAll('.num-sys-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-system="${system}"]`).classList.add('active');

        this.currentNumberSystem = system;
        this.currentInput = '';
        this.previousInput = '';
        this.operator = null;
        this.updateDisplay();
        this.updateHistory();
    }

    handleKeyPress(e) {
        if (e.key >= '0' && e.key <= '9') {
            this.handleNumber(e.key);
        } else if (e.key === '.') {
            this.handleNumber('.');
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            this.handleOperator(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.handleAction('equals');
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            this.handleAction('delete');
        } else if (e.key === 'Escape') {
            e.preventDefault();
            this.handleAction('clear');
        }
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
