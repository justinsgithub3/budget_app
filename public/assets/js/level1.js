// get elements
const clearButton = document.querySelector("#clear");
const calculateButton = document.querySelector("#calculate");
const incomeInput = document.querySelector("#income-1")
const expenseInput = document.querySelector("#expense-1");
const profitInput = document.querySelector("#profit-1");

const inputsDiv = document.querySelector("#inputs");

const incomesDiv = document.querySelector("#incomes");
const expensesDiv = document.querySelector("#expenses");

const expenseBtn = document.querySelector("#expense-btn");
const incomeBtn = document.querySelector("#income-btn");



// add event listener to calculate
calculateButton.addEventListener('click', async () => {
    // calculate function
    calculateProfit();
})

// add event listener to clear
clearButton.addEventListener('click', async () => {
    // get all income & expense inputs
    const allIncomeInputs = document.querySelectorAll(".income-input");
    const allExpenseInputs = document.querySelectorAll(".expense-input");

    // clear the input value
    allIncomeInputs.forEach((e) => {
        e.value = "";
    });


    // clear the input value
    allExpenseInputs.forEach((e) => {
        e.value = "";
    });

    // clear profit input
    profitInput.value = "";
})

// add event listener to add a blank incomes field
incomeBtn.addEventListener('click', async () => {
    // create income input element
    const newIncomeEle = document.createElement("input");
    newIncomeEle.setAttribute("class", "income-input");
    newIncomeEle.setAttribute("min", "0");
    newIncomeEle.setAttribute("type", "number");

    // append to container
    incomesDiv.appendChild(newIncomeEle);
});

// add event listener to add a blank expenses field
expenseBtn.addEventListener('click', async () => {
    // create expense input element
    const newExpenseEle = document.createElement("input");
    newExpenseEle.setAttribute("class", "expense-input");
    newExpenseEle.setAttribute("min", "0");
    newExpenseEle.setAttribute("type", "number");

    // append to container
    expensesDiv.appendChild(newExpenseEle);
});


async function calculateProfit() {
    // get all income & expense inputs
    const allIncomeInputs = document.querySelectorAll(".income-input");
    const allExpenseInputs = document.querySelectorAll(".expense-input");


    // calculate income
    let income = 0; // accumulator
    allIncomeInputs.forEach((e) => {

        let value = parseInt(e.value);
        
        if (isNaN(value)) {
            value = 0; // if not a number, treat as 0
        } 

        income += value;
    });

    // calculate expenses
    let expenses = 0;
    allExpenseInputs.forEach((e) => {
        
        let value = parseInt(e.value);
        
        if (isNaN(value)) {
            value = 0; // if not a number, treat as 0
        } 

        expenses += value;
    });
    

    // calculate difference
    const profit = income - expenses;
    console.log(income, expenses, profit)
    
    // display profit
    profitInput.value = profit;

}