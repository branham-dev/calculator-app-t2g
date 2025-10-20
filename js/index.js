document.addEventListener("DOMContentLoaded", () => {
    const calculatorForm = document.querySelector("#calculator-form");
    const calculatorBoard = document.querySelector("#calculator-board");
    const calculatorInput = document.querySelector("#calculator-input");
    const BASE = "calculator__button";
    const MOD = (m) => `${BASE}${m}`;
    const primary = "--pri";
    const operation = "--func";
    const accent = "--acc";
    const calculatorUI = [
        { value: "7", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "8", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "9", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "DEL", calcData: "delete", classList: [BASE, MOD(operation)] },
        { value: "4", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "5", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "6", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "+", calcData: "operator", classList: [BASE, MOD(primary)] },
        { value: "1", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "2", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "3", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "-", calcData: "operator", classList: [BASE, MOD(primary)] },
        { value: ".", calcData: "decimal", classList: [BASE, MOD(primary)] },
        { value: "0", calcData: "digit", classList: [BASE, MOD(primary)] },
        { value: "/", calcData: "operator", classList: [BASE, MOD(primary)] },
        { value: "x", calcData: "operator", classList: [BASE, MOD(primary)] },
        { value: "RESET", calcData: "reset", classList: [BASE, MOD(primary)] },
        { value: "=", calcData: "equals", classList: [BASE, MOD(accent)] },
    ];
    const Calculator = {
        left: "",
        right: "",
        operator: "",
        isRight: false,
        maxDigits: 4,
        total: "",
        appendDigit(d) {
            if (this.total && !this.operator && !this.isRight)
                this.total = "";
            if (!this.isRight && this.left.length < this.maxDigits)
                this.left += d;
            else if (this.isRight && this.right.length < this.maxDigits)
                this.right += d;
            this.updateDisplay();
        },
        setOperator(op) {
            if (!this.left)
                return;
            this.operator = op;
            this.isRight = true;
            this.updateDisplay();
        },
        compute() {
            const a = parseFloat(this.left);
            const b = parseFloat(this.right);
            let result = NaN;
            switch (this.operator) {
                case "+":
                    result = a + b;
                    break;
                case "-":
                    result = a - b;
                    break;
                case "x":
                    result = a * b;
                    break;
                case "/":
                    result = b !== 0 ? a / b : NaN;
                    break;
            }
            this.left = "";
            this.right = "";
            this.operator = "";
            this.isRight = false;
            this.total = String(result);
            this.updateDisplay();
        },
        delete() {
            if (this.isRight && this.right)
                this.right = this.right.slice(0, -1);
            else if (!this.isRight && this.left)
                this.left = this.left.slice(0, -1);
            this.updateDisplay();
        },
        reset() {
            this.left = this.right = this.operator = "";
            this.isRight = false;
            this.updateDisplay();
        },
        updateDisplay() {
            calculatorInput.value =
                this.total && !this.left && !this.right && !this.operator
                    ? this.total
                    : `${this.left} ${this.operator} ${this.right}`;
        },
    };
    calculatorForm.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        if (!target.matches("button"))
            return;
        const action = target.dataset.calc;
        const value = target.textContent;
        switch (action) {
            case "digit":
                Calculator.appendDigit(value);
                break;
            case "operator":
                Calculator.setOperator(value);
                break;
            case "equals":
                Calculator.compute();
                break;
            case "delete":
                Calculator.delete();
                break;
            case "decimal":
                Calculator.appendDigit(".");
                break;
            case "reset":
                Calculator.reset();
                break;
        }
    });
    const populateKeyboard = () => {
        calculatorUI.forEach((button) => {
            const calcButton = document.createElement("button");
            calcButton.classList.add(...button.classList);
            calcButton.dataset.calc = button.calcData;
            calcButton.textContent = button.value;
            calculatorBoard?.appendChild(calcButton);
        });
    };
    populateKeyboard();
});
export {};
//# sourceMappingURL=index.js.map