//constructor to make a valid expression
const calculator = {
  displayValue: '0', //string representing user input or result of an operation
  firstOperand: null, //first operand
  waitingForSecondOperand: false, //flag to check if the expression is good to be evaluated
  operator: null, //operator for expression
};

//to modify the calcy screen when any digits are clicked
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
	//set the screen to second input entered
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
	  //if the number is a non-zero number, we append to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
	console.log(calculator);
}

//to handle a decimal point
function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) return;

  // If the `displayValue` does not contain a decimal point
  // check if `displayValue` does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

// function to handle operators (3 scenes)
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue); //converting curent number into a parseFloat value
    
	
   //if user wants to change an operand to other then override the previous operand
   if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
    //if first operand is null, set it to the input value
  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  //set the waiting for second operand flag and operator as the nextOperator
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);   
}




const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

//function to set the calculator screen to 0
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

//for handling (0-9) (+,-,/,*,=) (.) (AC) listen for clicks on calculator
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  //return if a target doesnt match a button
  if (!target.matches('button')) {
    return;
  }
  //if target is an operator handle it with function
  if (target.classList.contains('operator')) {
    handleOperator(target.value);
		updateDisplay();
    return;
  }
  // if target is a . take care
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
		updateDisplay();
    return;
  }
  //if target is a AC
  if (target.classList.contains('allclear')) {
    resetCalculator();
		updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});


function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}





