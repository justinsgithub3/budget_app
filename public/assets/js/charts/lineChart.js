export async function createLineChart(data) {
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