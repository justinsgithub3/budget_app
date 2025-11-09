// get elements
const clearButton = document.querySelector("#clear");
const calculateButton = document.querySelector("#calculate");
const incomeInput = document.querySelector("#income-1")
const expenseInput = document.querySelector("#expense-1");
const profitInput = document.querySelector("#profit-1");
const header = document.querySelector(".header");

const inputsDiv = document.querySelector("#inputs");

const incomesDiv = document.querySelector("#incomes");
const expensesDiv = document.querySelector("#expenses");

const expenseBtn = document.querySelector("#expense-btn");
const incomeBtn = document.querySelector("#income-btn");



// add event listener to calculate
calculateButton.addEventListener('click', async () => {

    const profitLabel = document.querySelector("#profit-label");
    // change profit label back to 'gains' and font color to black
    profitLabel.textContent = 'Gains';
    profitInput.style.color = 'black';

    // calculate function
    calculateProfit();
})

// add event listener to clear
clearButton.addEventListener('click', async () => {
    clearForm();
})



// add event listener to add a blank incomes field
incomeBtn.addEventListener('click', async () => {
    // create income input element
    const newIncomeEle = document.createElement("input");
    newIncomeEle.setAttribute("class", "income-input");
    newIncomeEle.setAttribute("class", "added")
    newIncomeEle.setAttribute("min", "0");
    //newIncomeEle.setAttribute("type", "number");

    // get list of children
    let list = incomesDiv.children;
    // append as second to last child in container
    incomesDiv.insertBefore(newIncomeEle, list[list.length-1]);
});

// add event listener to add a blank expenses field
expenseBtn.addEventListener('click', async () => {
    // create expense input element
    const newExpenseEle = document.createElement("input");
    newExpenseEle.setAttribute("class", "expense-input");
    newExpenseEle.setAttribute("class", "added")
    newExpenseEle.setAttribute("min", "0");
    //newExpenseEle.setAttribute("type", "number");

    // get list of children
    let list = expensesDiv.children;
    // append as second to last child in container
    expensesDiv.insertBefore(newExpenseEle, list[list.length-1]);
});


async function calculateProfit() {
    // get all income & expense inputs
    const allIncomeInputs = document.querySelectorAll(".income-input");
    const allExpenseInputs = document.querySelectorAll(".expense-input");
    const profitLabel = document.querySelector("#profit-label");


    // calculate income
    let income = 0; // accumulator
    allIncomeInputs.forEach((e) => {

        let value = e.value.replace(/[^0-9.]/g, '');
        value = parseInt(value);

        if (isNaN(value)) {
            value = 0; // if not a number, treat as 0
        } 

        income += value;
    });

    // calculate expenses
    let expenses = 0;
    allExpenseInputs.forEach((e) => {
        
        let value = e.value.replace(/[^0-9.]/g, '');
        value = parseInt(value);
        
        if (isNaN(value)) {
            value = 0; // if not a number, treat as 0
        } 

        expenses += value;
    });

    // calculate difference
    const profit = income - expenses;

    // if value is less than 0, change font color to red
    // change 'gains' to 'losses'
    if (profit < 0) {
        profitInput.style.color = 'red';
        profitLabel.textContent = 'Losses';
    };

    // display profit
    profitInput.value = profit;

}


// resets form to default
function clearForm() {
    // get all income & expense inputs
    const allIncomeInputs = document.querySelectorAll(".income-input");
    const allExpenseInputs = document.querySelectorAll(".expense-input");

    const profitLabel = document.querySelector("#profit-label");


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

    // change profit label back to 'gains' and font color to black
    profitLabel.textContent = 'Gains';
    profitInput.style.color = 'black';

    // remove all extra inputs class:'added'
    const addedEle = document.querySelectorAll(".added");

    addedEle.forEach((element) => {
        element.remove();
    })

}


document.addEventListener("DOMContentLoaded", async () => {

    // create element to add current user's name
    const nameEle = document.createElement("p");
    //get name from session storage
    const name = sessionStorage.getItem('name')
    nameEle.textContent = name;

    header.appendChild(nameEle);
})
