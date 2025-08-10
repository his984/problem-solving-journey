// --- 1. DOM Elements ---
const buttonsContainer = document.querySelector(".buttons");
const displayElement = document.querySelector(".display");

// --- 2. Calculator State Variables ---
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// --- 3. Main Event Listener (Event Delegation) ---
buttonsContainer.addEventListener("click", function (event) {
  const clickedButton = event.target;

  // Make sure the click was on a button
  if (clickedButton.matches("button")) {
    const type = clickedButton.dataset.type;
    const value = clickedButton.dataset.value;

    // --- !! NEW !! Error Guard Clause ---
    // If the screen shows an error, only allow the 'clear-all' button to work.
    if (displayElement.textContent === "ERR" && value !== "clear-all") {
      return;
    }

    // --- A. Handle NUMBER buttons ---
    if (type === "number") {
      // Prevent multiple decimal points
      if (value === "." && displayElement.textContent.includes(".")) {
        return;
      }
      // Prevent exceeding 8 digits when appending
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

    // --- B. Handle OPERATOR buttons ---
    else if (type === "operator") {
      firstOperand = parseFloat(displayElement.textContent);
      operator = value;
      waitingForSecondOperand = true;
    }

    // --- C. Handle EQUALS button ---
    else if (type === "action" && value === "equals") {
      if (firstOperand === null || operator === null) {
        return;
      }

      const secondOperand = parseFloat(displayElement.textContent);

      if (operator === "divide" && secondOperand === 0) {
        displayElement.textContent = "Infinity";
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
    }

    // --- D. Handle ALL CLEAR (AC) button ---
    else if (type === "action" && value === "clear-all") {
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
      displayElement.textContent = "0";
    }

    // --- E. Handle CLEAR (C) button (Backspace) ---
    else if (type === "action" && value === "clear") {
      const currentDisplay = displayElement.textContent;
      if (currentDisplay.length <= 1) {
        displayElement.textContent = "0";
      } else {
        displayElement.textContent = currentDisplay.slice(0, -1);
      }
    }

    // --- F. Handle PLUS-MINUS button ---
    else if (type === "action" && value === "plus-minus") {
      if (displayElement.textContent !== "0") {
        displayElement.textContent =
          parseFloat(displayElement.textContent) * -1;
      }
    }
  }
});

// --- 4. Calculation Function ---
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
      return n2; // If no operator, return the current number
  }

  // Round to handle floating point inaccuracies and remove trailing zeros
  return Number(result.toPrecision(15));
}
