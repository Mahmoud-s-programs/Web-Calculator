let currentInput = "";
let operation = null;
let previousInput = "";


function appendNumber(number) {
  if (currentInput === "0" && number === "0") return; 
  if (currentInput === "0" && number !== ".") currentInput = ""; 
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
  if (isNaN(prev) || isNaN(current)) {
      displayError("Invalid Input");
      return;
  }
  switch (operation) {
      case '+':
          computation = prev + current;
          break;
      case '-':
          computation = prev - current;
          break;
      case '÷':
          if (current === 0) {
              displayError("Cannot divide by zero");
              return;
          }
          computation = prev / current;
          break;
      case '×':
          computation = prev * current;
          break;
      default:
          displayError("Unknown operation");
          return;
  }
  currentInput = computation.toString();
  operation = undefined;
  previousInput = '';
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

function deleteNumber() {
  if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
  } else if (operation !== null) {
    operation = null;
    currentInput = previousInput;
    previousInput = "";
  }
  updateDisplay();
}

function clearAll() {
  currentInput = "";
  previousInput = "";
  operation = null;
  updateDisplay();
}

function calculatePercentage() {
  if (currentInput !== "") {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    appendNumber(event.key);
  } else if (event.key === ".") {
    appendNumber(event.key);
  } else if (event.key === "+") {
    chooseOperation("+");
  } else if (event.key === "-") {
    chooseOperation("-");
  } else if (event.key === "*" || event.key === "x") {
    chooseOperation("×");
  } else if (event.key === "/") {
    chooseOperation("÷");
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Backspace") {
    deleteNumber();
  } else if (event.key === "Escape") {
    clearAll();
  }
  event.preventDefault(); 
});

function displayError(message) {
  const display = document.getElementById('display');
  display.value = message;
  display.classList.add('error');
  setTimeout(() => display.classList.remove('error'), 2000);
  currentInput = '';
  previousInput = '';
  operation = null;
}

