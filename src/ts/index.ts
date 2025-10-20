document.addEventListener("DOMContentLoaded", () => {
	const calculatorForm = document.querySelector("#calculator-form") as HTMLFormElement;
	const calculatorBoard = document.querySelector("#calculator-board");
	const calculatorInput = document.querySelector("#calculator-input") as HTMLInputElement;

	type CalcButton = {
		value: string;
		calcData: string;
		classList: string[];
	};
	type BtnModifier = "--pri" | "--func" | "--acc";

	const BASE: string = "calculator__button";
	const MOD = (m: BtnModifier) => `${BASE}${m}`;

	const primary: BtnModifier = "--pri";
	const operation: BtnModifier = "--func";
	const accent: BtnModifier = "--acc";

	const calculatorUI: CalcButton[] = [
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

		appendDigit(d: string) {
			if (this.total && !this.operator && !this.isRight) this.total = "";
			if (!this.isRight && this.left.length < this.maxDigits) this.left += d;
			else if (this.isRight && this.right.length < this.maxDigits) this.right += d;
			this.updateDisplay();
		},

		setOperator(op: string) {
			if (!this.left) return;
			this.operator = op;
			this.isRight = true;
			this.updateDisplay();
		},

		compute() {
			const a = parseFloat(this.left);
			const b = parseFloat(this.right);
			let result: number = NaN;

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
			if (this.isRight && this.right) this.right = this.right.slice(0, -1);
			else if (!this.isRight && this.left) this.left = this.left.slice(0, -1);
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

	calculatorForm.addEventListener("click", (e: Event): void => {
		e.preventDefault();

		const target = e.target as HTMLElement;
		if (!target.matches("button")) return;

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
		calculatorUI.forEach((button: CalcButton) => {
			const calcButton = document.createElement("button") as HTMLButtonElement;
			calcButton.classList.add(...button.classList);
			calcButton.dataset.calc = button.calcData;
			calcButton.textContent = button.value;

			calculatorBoard?.appendChild(calcButton);
		});
	};

	populateKeyboard();
});
