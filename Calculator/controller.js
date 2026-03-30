class CalculatorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindButtonClick(this.handleButtonClick.bind(this));
    this.view.render(this.model.getState());
  }

  handleButtonClick(action, value) {
    switch (action) {
      case "number":
        this.model.inputNumber(value);
        break;
      case "operator":
        this.model.setOperator(value);
        break;
      case "calculate":
        this.model.calculate();
        break;
      case "clear":
        this.model.clear();
        break;
      default:
        break;
    }

    this.view.render(this.model.getState());
  }
}

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);