// get elements
const clearButton = document.querySelector("#clear");
const calculateButton = document.querySelector("#calculate");
const incomeInput = document.querySelector("#income-1")
const expenseInput = document.querySelector("#expense-1");
const profitInput = document.querySelector("#profit-1");





// add event listener to calculate
calculateButton.addEventListener('click', async () => {
    // calculate function
    calculateProfit();
})

// add event listener to clear
clearButton.addEventListener('click', async () => {
    // clear input fields
    incomeInput.value = "";
    expenseInput.value = "";
    profitInput.value = "";
})

async function calculateProfit() {

    // get income and expenses
    const income = incomeInput.value;
    const expenses = expenseInput.value;

    // find difference
    const profit = income - expenses;

    // set profit input
    profitInput.value = profit;


}