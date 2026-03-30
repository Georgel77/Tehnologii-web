class CalculatorModel {
  constructor() {
    this.clear();
  }

  clear() {
    this.operand1 = null;
    this.operand2 = null;
    this.operator = null;
    this.displayValue = "0";
    this.expression = "";
    this.waitingForOperand2 = false;
    this.error = false;
  }

  inputNumber(number) {
    if (this.error) {
      this.clear();
    }

    if (this.waitingForOperand2) {
      this.displayValue = number;
      this.waitingForOperand2 = false;
    } else {
      this.displayValue =
        this.displayValue === "0" ? number : this.displayValue + number;
    }
  }

  setOperator(operator) {
    if (this.error) {
      return;
    }

    if (this.operator && !this.waitingForOperand2) {
      this.calculate();
      if (this.error) return;
    }

    this.operand1 = parseFloat(this.displayValue);
    this.operator = operator;
    this.expression = `${this.operand1} ${this.operator}`;
    this.waitingForOperand2 = true;
  }

  calculate() {
    if (this.error || this.operator === null || this.waitingForOperand2) {
      return;
    }

    this.operand2 = parseFloat(this.displayValue);
    let result;

    switch (this.operator) {
      case "+":
        result = this.operand1 + this.operand2;
        break;
      case "-":
        result = this.operand1 - this.operand2;
        break;
      case "*":
        result = this.operand1 * this.operand2;
        break;
      case "/":
        if (this.operand2 === 0) {
          this.displayValue = "Eroare";
          this.expression = "Impartire la zero";
          this.error = true;
          return;
        }
        result = this.operand1 / this.operand2;
        break;
      default:
        return;
    }

    if (!isFinite(result)) {
      this.displayValue = "Eroare";
      this.expression = "Rezultat invalid";
      this.error = true;
      return;
    }

    this.expression = `${this.operand1} ${this.operator} ${this.operand2} =`;
    this.displayValue = String(result);
    this.operand1 = result;
    this.operator = null;
    this.waitingForOperand2 = false;
  }

  getState() {
    return {
      expression: this.expression,
      displayValue: this.displayValue,
    };
  }
}