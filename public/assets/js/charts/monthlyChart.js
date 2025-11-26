export async function createMonthlyChart(data) {

// get existing chart instance
let monthlyChart = Chart.getChart("chart-filtered");

// destroy if exists
  if (monthlyChart) {
    monthlyChart.destroy();
  }

  //const incomes = data.incomes;
  const expenses = data.month_expenses;

  /*
  const xyIncomes = incomes.map(income => ({
    x: new Date(income.date_inc),       // x-axis = date
    y: parseFloat(income.amount)        // y-axis = amount (as number)
  }));
  */

  const xyExpenses = expenses.map(expense => ({
    x: new Date(expense.date_exp),       // x-axis = date
    y: parseFloat(expense.amount)        // y-axis = amount (as number)
  }));

  monthlyChart = new Chart("chart-filtered", {
  type: "scatter",
  data: 
  {
    datasets: [
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
            text: "monthly values",
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