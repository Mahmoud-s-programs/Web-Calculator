let currentInput = "";
let operation = null;
let previousInput = "";

// ... existing JavaScript variables ...

function appendNumber(number) {
  if (currentInput === "0" && number === "0") return; // Prevent multiple leading zeros
  if (currentInput === "0" && number !== ".") currentInput = ""; // If current is zero, reset before new input
  currentInput = currentInput.toString() + number.toString();
  updateDisplay();
}

function chooseOperation(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operation = op;
  previousInput = currentInput;
  currentInput = "";
  updateDisplay();
}

function calculate() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "÷":
      computation = prev / current;
      break;
    case "×":
      computation = prev * current;
      break;
  }
  currentInput = computation.toString();
  operation = undefined;
  previousInput = "";
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("display");
  let displayValue = previousInput;
  if (operation != null) {
    displayValue += ` ${operation}`;
  }
  if (currentInput != null) {
    displayValue += ` ${currentInput}`;
  }
  display.value = displayValue.trim();
}

function clear() {
  currentInput = "0";
  operation = null;
  previousInput = "";
  updateDisplay();
}

// ... existing JavaScript for deleteNumber function ...

function deleteNumber() {
  if (currentInput !== "") {
    // If there is current input, remove the last digit
    currentInput = currentInput.slice(0, -1);
  } else if (operation !== null) {
    // If there is no current input but an operation is set, remove the operation
    operation = null;
    currentInput = previousInput;
    previousInput = "";
  }
  updateDisplay();
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}
