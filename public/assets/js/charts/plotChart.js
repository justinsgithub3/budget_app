export async function createPlotChart(data) {
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
    responsive: true,
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
          beginAtZero: true,
          ticks: {
            stepSize: 20,
          },
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