
const totalDiv = document.querySelector("#total-div");
// global so it can go from fetched and into the chart
const incomes = [];
const expenses = [];

document.addEventListener("DOMContentLoaded", async () => {
  await reDisplayProfit();

  const data = await getAccounts();
  await createChart(data);
})


async function getAccounts () {
  try 
  {
    const res = await fetch('/ovrv/acc');
    const data = await res.json();
    const expenses = data.expenses;
    const incomes = data.incomes;
    const avgExpenses = data.avgExpenses;
    const avgIncomes = data.avgIncomes;
    console.log(`------- expenses --------`);
    console.log(expenses);
    console.log(`------- incomes --------`);
    console.log(incomes)
    console.log(`------- income avg --------`);
    console.log(avgIncomes)
    console.log(`------- expense avg --------`);
    console.log(avgExpenses)

    return data;
  }
  catch (e) 
  {
    console.log('error getting accounts')
  }

}


async function createChart(data) {
  const incomes = data.incomes;
  const expenses = data.expenses;

  const xyIncomes = incomes.map(income => ({
    x: new Date(income.date_inc),       // x-axis = date
    y: parseFloat(income.amount)        // y-axis = amount (as number)
  }));

  const xyExpenses = expenses.map(expense => ({
    x: new Date(expense.date_exp),       // x-axis = date
    y: parseFloat(expense.amount)        // y-axis = amount (as number)
  }));

  new Chart("myChart", {
  type: "scatter",
  data: 
  {
    datasets: [
      {
      label: "income",
      pointRadius: 4,
      pointBackgroundColor: "rgba(0,255,0, 1)",
      data: xyIncomes
      },
      {
      label: "expense",
      pointRadius: 4,
      pointBackgroundColor: "rgba(255,0,0,1)",
      data: xyExpenses
      }

  ]
  },
  options: 
  {
    scales: 
    {
      x: 
        {
          type: 'time', 
          time: {
            unit: 'day',          // adjust to 'month'/'week' if needed
            tooltipFormat: 'yyyy-MM-dd'
          },
          title: {
            display: true,
            text: 'date'
          }
        },
      y: 
        {
          title: 
          {
            display: true,
            text: 'amount'
          }
        }
    }
  }
});

}

// gets profit
async function getProfit() {

  try 
  {
    const res = await fetch('/ovrv');
    const data = await res.json();
    const profit = data.profit;
    return profit;
  }
  catch (e) 
  {
    console.log('error getting profit')
  }

}

// redisplays profit
async function reDisplayProfit() {

  let profit = await getProfit();

  // clear inside elements
  totalDiv.innerHTML = '';

  const totalLabel = document.createElement('p');
  totalLabel.textContent = 'profit';

  const totalAmount = document.createElement('p');
  totalAmount.textContent = profit;

  totalDiv.appendChild(totalLabel);
  totalDiv.appendChild(totalAmount);
}