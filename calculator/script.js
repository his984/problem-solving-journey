// --- 1. DOM Elements ---
const buttonsContainer = document.querySelector(".buttons");
const displayElement = document.querySelector(".display");

// --- 2. Calculator State Variables ---
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// --- 3. Main Event Listener (The Dispatcher) ---
buttonsContainer.addEventListener("click", function (event) {
  const clickedButton = event.target;

  if (clickedButton.matches("button")) {
    const type = clickedButton.dataset.type;
    const value = clickedButton.dataset.value;

    // Error Guard Clause: Freeze calculator on ERR state
    if (displayElement.textContent === "ERR" && value !== "clear-all") {
      return;
    }

    // Dispatch the click to the correct handler function
    if (type === "number") {
      handleNumber(value);
    } else if (type === "operator") {
      handleOperator(value);
    } else if (type === "action") {
      // Corrected: 'action' is a string
      handleAction(value);
    }
  }
});

// --- 4. Helper Functions ---

/**
 * Handles all logic for when a number button is clicked.
 * @param {string} value The value of the number button (e.g., '7', '.').
 */
function handleNumber(value) {
  if (value === "." && displayElement.textContent.includes(".")) {
    return;
  }
  if (displayElement.textContent.length >= 8 && !waitingForSecondOperand) {
    return;
  }

  if (waitingForSecondOperand) {
    displayElement.textContent = value === "." ? "0." : value;
    waitingForSecondOperand = false;
  } else if (displayElement.textContent === "0") {
    displayElement.textContent = value === "." ? "0." : value;
  } else {
    displayElement.textContent += value;
  }
}

/**
 * Handles all logic for when an operator button is clicked.
 * @param {string} value The value of the operator (e.g., 'add').
 */
function handleOperator(value) {
  firstOperand = parseFloat(displayElement.textContent);
  operator = value;
  waitingForSecondOperand = true;
}

/**
 * Handles all logic for when an action button is clicked.
 * @param {string} value The value of the action (e.g., 'equals', 'clear').
 */
function handleAction(value) {
  switch (value) {
    case "equals":
      if (firstOperand === null || operator === null) {
        return;
      }
      const secondOperand = parseFloat(displayElement.textContent);

      if (operator === "divide" && secondOperand === 0) {
        displayElement.textContent = "ERR"; // Corrected: "ERR" for consistency
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        return;
      }
      const result = calculate(firstOperand, operator, secondOperand);

      if (String(result).length > 8) {
        displayElement.textContent = "ERR";
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        return;
      }
      displayElement.textContent = result;
      firstOperand = result;
      operator = null;
      waitingForSecondOperand = true;
      break;

    case "clear-all":
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
      displayElement.textContent = "0";
      break;

    case "clear":
      const currentDisplay = displayElement.textContent;
      if (currentDisplay.length <= 1) {
        displayElement.textContent = "0";
      } else {
        displayElement.textContent = currentDisplay.slice(0, -1);
      }
      break;

    case "plus-minus":
      if (displayElement.textContent !== "0") {
        displayElement.textContent =
          parseFloat(displayElement.textContent) * -1;
      }
      break;
  }
}

/**
 * Performs a calculation based on two numbers and an operator.
 * @param {number} n1 The first number.
 * @param {string} op The operator.
 * @param {number} n2 The second number.
 * @returns {number} The result of the calculation.
 */
function calculate(n1, op, n2) {
  let result = 0;
  switch (op) {
    case "add":
      result = n1 + n2;
      break;
    case "subtract":
      result = n1 - n2;
      break;
    case "multiply":
      result = n1 * n2;
      break;
    case "divide":
      result = n1 / n2;
      break;
    default:
      return n2;
  }
  // Round to handle floating point inaccuracies (e.g., 0.1 + 0.2)
  return Number(result.toPrecision(15));
}
