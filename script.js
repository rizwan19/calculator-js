class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement)
    {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear()
    {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }
    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number)
    {
        if(number === '.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation)
    {
        if(this.currentOperand === '')
            return;
        if(this.previousOperand !== '')
            this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute()
    {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current))
            return;
        else if(this.operation === '+')
        {
            console.log("in plus");
            computation = prev + current;
        }
        else if(this.operation === '-')
            computation = prev - current;
        else if(this.operation === '*')
        {
            console.log("mul");
            computation = prev*current;
        }
        else if(this.operation === '÷')
            computation = prev / current;
        else
            return;
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''; 
    }
    updateDisplay()
    {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation != null)
        {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else
            this.previousOperandTextElement.innerText = '';
    }
}





const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', function(){
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', function(){
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', function(){
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', function(){
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', function(){
    calculator.delete();
    calculator.updateDisplay();
})