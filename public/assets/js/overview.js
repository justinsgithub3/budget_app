const header = document.querySelector(".header");
// create element to add current user's name
const nameEle = document.createElement("p");
//get name from session storage
const name = sessionStorage.getItem('name')
nameEle.textContent = name;

// get list of children
let list = header.children;
// append as second to last child in container
header.insertBefore(nameEle, list[list.length-1]);

const logoutAnch = document.querySelector("#logout-anchor");
// handle logout
logoutAnch.addEventListener("click", async (e) => {
    sessionStorage.clear();
})

const totalDiv = document.querySelector("#total-div");
// global so it can go from fetched and into the chart
const incomes = [];
const expenses = [];

document.addEventListener("DOMContentLoaded", async () => {
  await reDisplayProfit();

  const data = await getAccounts();
  await createPlotChart(data);
  await createLineChart(data);
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

    return data;
  }
  catch (e) 
  {
    console.log('error getting accounts')
  }

}

async function createLineChart(data) {
  const avgIncomes = data.avgIncomes;
  const avgExpenses = data.avgExpenses;



    const xyAvgIncomes = avgIncomes.map(avgIncome => ({
    x: new Date(avgIncome.income_date),       // x-axis = date
    y: parseFloat(avgIncome.avg_daily_amount) // y-axis = amount (as number)
  }));

  const xyAvgExpenses = avgExpenses.map(avgExpense => ({
    x: new Date(avgExpense.expense_date),       // x-axis = date
    y: parseFloat(avgExpense.avg_daily_amount)  // y-axis = amount (as number)
  }));

  new Chart("myLineChart", {
  type: "line",
  data: 
  {
    datasets: [
      {
      label: "income",
      pointRadius: 4,
      pointBackgroundColor: "rgba(0,255,0, 1)",   // point color
      borderColor: "rgba(0,255,0,1)",             // line color and border of each point
      backgroundColor: "rgba(0,255,0,1)",         // legend fill
      data: xyAvgIncomes
      },
      {
      label: "expense",
      pointRadius: 4,
      pointBackgroundColor: "rgba(255,0,0,1)",    // point color
      borderColor: "rgba(255,0,0,1)",             // line color and border of each point
      backgroundColor: "rgba(255,0,0,1)",         // legend fill
      data: xyAvgExpenses
      }

  ]
  },
  options: 
  {
    plugins: {
          title: {
            display: true,
            text: "daily average",
            font: {
              size: 20,
              weight: "bold"
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        },
    responsive: false,
    maintainAspectRatio: false,
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


async function createPlotChart(data) {
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

  new Chart("myPlotChart", {
  type: "scatter",
  data: 
  {
    datasets: [
      {
      label: "income",
      pointRadius: 4,
      pointBackgroundColor: "rgba(0,255,0, 1)",   // color of each point
      borderColor: "rgba(0,255,0,1)",             // line border of each point
      data: xyIncomes
      },
      {
      label: "expense",
      pointRadius: 4,
      pointBackgroundColor: "rgba(255,0,0,1)",    // color of each point
      borderColor: "rgba(255,0,0,1)",             // line border of each point
      data: xyExpenses
      }

  ]
  },
  options: 
  {
        plugins: {
          title: {
            display: true,
            text: "all recorded values",
            font: {
              size: 20,
              weight: "bold"
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        },
    responsive: false,
    maintainAspectRatio: false, 
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