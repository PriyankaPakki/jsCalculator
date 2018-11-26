//constructor to make a valid expression
const calculator = {
  //debug: false,
  displayValue: '0', //string representing user input or result of an operation
  firstOperand: null, //first operand
  waitingForSecondOperand: false, //flag to check if the expression is good to be evaluated
  secondOperand: null,
  operator: null, //operator for expression
  previousString : "", //storing the previous calculation
};

var array = new Array();

//function to clear the previous string after keeping it in the array
function clearPreviousString(){
  calculator.previousString = "";
  calculator.operator = null;
};

//clearPreviousString();

//constructor to store the stack and displayString
const log = {
	displayString : "",
};

//to modify the calcy screen when any digits are clicked
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand, firstOperand } = calculator;

  //if first operand exists and is not equal to = 
  if (waitingForSecondOperand === true) // && firstOperand != '=') 
  {
	 //set the screen to second input entered
    calculator.secondOperand = digit;
    calculator.displayValue = calculator.secondOperand;
    calculator.waitingForSecondOperand = false;
  } 
  else {
	  //if the number is a non-zero number, we append to it
     
     calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
     calculator.firstOperand = calculator.displayValue;
  }
  console.log(calculator);
}

//to handle a decimal point
function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) 
    return;

  // If the `displayValue` does not contain a decimal point
  // check if `displayValue` does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point to first operand
    calculator.displayValue += dot;
	  calculator.firstOperand += ".";
  }
}



// function to handle operators (3 scenes)
function handleOperator(nextOperator) {
  var { firstOperand, secondOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue); //converting curent number into a number value
    
	calculator.displayValue = nextOperator;
	console.log(calculator);
	
   /*//if user wants to change an operator to other then override the previous operand
   if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
	  console.log(calculator);
    return;
  }*/

  //if first operand is null, set it to the input value
  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } 

  if (operator) {
    firstOperand = firstOperand || 0;
    const secondOperand = inputValue;
    const result = performCalculation[operator](firstOperand, secondOperand);
    calculator.displayValue = String(result);
    
    if(operator != '=')
	  {
      calculator.previousString += String(firstOperand)+ String(operator) + String(secondOperand) + String('=') + String(result);
      array.push(calculator.previousString);
      updateLog();
      clearPreviousString();


    }
    else
    {
      calculator.firstOperand = result;
      calculator.operator = null;
    }
    console.log(calculator.previousString);
    	
  }

  //set the waiting for second operand flag and operator as the nextOperator
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  
  console.log(calculator);  
  console.log(array); 
 
}




const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => parseFloat(firstOperand) + parseFloat(secondOperand),

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

//function to set the calculator screen to 0
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

function updateLog()
{  
   // (var i = array.length - 1; i >= 0; i--) {
    //array =  array.reverse();
    var i = array.length -1;
    var ul = document.getElementById("items");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(array[i]));
    ul.appendChild(li);
  //}
}

//for handling (0-9) (+,-,/,*,=) (.) (AC) listen for clicks on calculator
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  //return if a target doesnt match a button
  if (!target.matches('button')) {
    return;
  }
  //if target is an operator handle it with function
  //if(target.classList.contains('operator') && target.value === '=') {
  //  calculator.waitingForSecondOperand = false;
  //}
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
  if (target.classList.contains('clear')) {
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
  calculator.previousString = "";
  calculator.operator = null;
  console.log(calculator);
}



