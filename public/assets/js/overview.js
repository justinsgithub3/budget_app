import { createPlotChart } from './charts/plotChart.js';
import { createLineChart } from './charts/lineChart.js';
import { createMonthlyChart } from './charts/monthlyChart.js';
import { createWeeklyChart } from './charts/weeklyChart.js';

const header = document.querySelector(".header");
// create element to add current user's name
const nameEle = document.createElement("p");
//get name from session storage
const name = sessionStorage.getItem('name')
nameEle.textContent = name;

// flag for filter
let filter_global = 'week';

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

  // display overall profit at bottom
  await displayProfit();

  // get data for income, expenses, avgIncome and avgExpenses  
  const data = await getAccounts();
  // create both charts
  await createPlotChart(data);
  await createLineChart(data);

  // populates classes with dates
  //await initialDateFilter();
  await addWeekClass();
  // makes first query to populate 
  await initialQuery();

  // adds event listener to filter
  filterType();

  // adds event listener to next and previous buttons
  navigateButtons();

})
 


async function initialQuery(){
  let currentDiv = document.querySelector(".current");
  if (currentDiv.id == 'week') {
    await addWeekClass();
    await makeWeekQuery();
  }
  if (currentDiv.id == 'month') {
    await addMonthClass();
    await makeQuery();
  }

}

async function removeWeekClasses() {
  let currentDiv = document.querySelector(".current");
  let startClass = [...currentDiv.classList].find(c => c.startsWith("start_"));
  let start = parseInt(startClass.split("_")[1]);
  currentDiv.classList.remove(startClass);

  let endClass = [...currentDiv.classList].find(c => c.startsWith("end_"));
  let end = parseInt(endClass.split("_")[1]);
  currentDiv.classList.remove(endClass);

}
async function removeMonthClasses() {
  let currentDiv = document.querySelector(".current");

  let monthClass = [...currentDiv.classList].find(c => c.startsWith("month_"));
  currentDiv.classList.remove(monthClass);
  
  let yearClass = [...currentDiv.classList].find(c => c.startsWith("year_"));
  currentDiv.classList.remove(yearClass);


}

// add event listeners to monthly-weekly filter
async function filterType() {
    let selectDiv = document.querySelector("#filter");

    let currentDiv = document.querySelector(".current");

    selectDiv.addEventListener("change", async () => {
      filter_global = selectDiv.value;

      if (selectDiv.value == 'month') {
        // if new filter is month ---
        currentDiv.id = 'month';
        // remove classes
        await removeWeekClasses();
        await addMonthClass();
        await makeQuery();
      }
      else {
        // if new filter is week ---
        currentDiv.id = 'week';
        await removeMonthClasses();
        await addWeekClass();
        await makeWeekQuery();
      }
    })
}
// add event listeners to the next and previous buttons
async function navigateButtons() {
    let prevDiv = document.querySelector("#previous");
    let nextDiv = document.querySelector("#next");
    let currentDiv = document.querySelector(".current");
    // previous button
    prevDiv.addEventListener("click", async () => {
      console.log("previous");
      console.log(currentDiv.id);
      if (currentDiv.id == 'month') {
        getPreviousMonth();
        await makeQuery();
      }
      if (currentDiv.id == 'week') {
        getPreviousWeek();
        await makeWeekQuery();
      }
    });
    // next button
    nextDiv.addEventListener("click", async () => {
      console.log("next");
      console.log(currentDiv.id);

      if (currentDiv.id == 'month') {
        getNextMonth();
        await makeQuery();
      }
      if (currentDiv.id == 'week') {
        getNextWeek();
        await makeWeekQuery();
      }
    });
}

// for the week
async function getOverviewStart() {

  let currentDiv = document.querySelector(".current");
  let startClass = [...currentDiv.classList].find(c => c.startsWith("start_"));
  let start = startClass.split("_")[1]; 

  return start;
}
// for the week
async function getOverviewEnd() {

  let currentDiv = document.querySelector(".current");
  let endClass = [...currentDiv.classList].find(c => c.startsWith("end_"));
  let end = endClass.split("_")[1]; 

  return end
}

async function getOverviewMonth() {
  let currentDiv = document.querySelector(".current");
  let monthClass = [...currentDiv.classList].find(c => c.startsWith("month_"));
  let month = parseInt(monthClass.split("_")[1]);
  return month
}
async function getOverviewYear() {
  let currentDiv = document.querySelector(".current");
  let yearClass = [...currentDiv.classList].find(c => c.startsWith("year_"));
  let year = parseInt(yearClass.split("_")[1]);
  return year
}

// display the current month
async function displayMonth(month, year) {

  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr',
                      'May', 'June', 'July', 'Aug', 
                      'Sept', 'Oct', 'Nov', 'Dec']

  const currentDiv = document.querySelector(".current");
  currentDiv.textContent = ""; // clear current text
  currentDiv.textContent = `${monthArray[month-1]} ${year}`;
}



// display the current month
async function displayWeek(start, end) {

  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr',
                      'May', 'June', 'July', 'Aug', 
                      'Sept', 'Oct', 'Nov', 'Dec'];
  
  console.log(start);
  console.log(end);

  const startDate = new Date(start);
  const endDate   = new Date(end);

  // get month and day
  const startMonth = monthArray[startDate.getMonth()];
  const startDay   = startDate.getDate();

  const endMonth = monthArray[endDate.getMonth()];
  const endDay   = endDate.getDate();
      
  const displayText = `${startMonth} ${startDay} - ${endMonth} ${endDay}`;


  const currentDiv = document.querySelector(".current");
  currentDiv.textContent = ""; // clear current text
  currentDiv.textContent = displayText;

  // Jan 2 - Jan 9
}




async function makeQuery() {
  let currentDiv = document.querySelector(".current");
  // ensure it is the month filter
  if (currentDiv.id == 'month') {
    let month = await getOverviewMonth();
    let year = await getOverviewYear();
    let expenses = await getMonthExp(month, year); // query for data
    await createMonthlyChart(expenses);
    await displayMonth(month, year);
  }
}

async function makeWeekQuery() {
  let currentDiv = document.querySelector(".current");
  // ensure it is the week filter
  if (currentDiv.id == 'week') {

    let start = await getOverviewStart();
    let end = await getOverviewEnd();

    console.log(start, end)

    let expenses = await getWeekExp(start, end);
    await createWeeklyChart(expenses);
    await displayWeek(start, end);
  }
}

async function getNextYear() {
  let currentDiv = document.querySelector(".current");
  let yearClass = [...currentDiv.classList].find(c => c.startsWith("year_"));
  let year = parseInt(yearClass.split("_")[1]);
  currentDiv.classList.remove(yearClass);

  year += 1;

  currentDiv.classList.add(`year_${year}`);
}

async function getPreviousYear() {
  let currentDiv = document.querySelector(".current");
  let yearClass = [...currentDiv.classList].find(c => c.startsWith("year_"));
  let year = parseInt(yearClass.split("_")[1]);
  currentDiv.classList.remove(yearClass);

  year -= 1;

  currentDiv.classList.add(`year_${year}`);
}

async function getNextMonth() {
  let currentDiv = document.querySelector(".current");
  let monthClass = [...currentDiv.classList].find(c => c.startsWith("month_"));
  let month = parseInt(monthClass.split("_")[1]);
  currentDiv.classList.remove(monthClass);

  month += 1;

  if (month == 13) {
    month = 1
    getNextYear();
  }
  currentDiv.classList.add(`month_${month}`);
}


async function getPreviousMonth() {
  let currentDiv = document.querySelector(".current");
  let monthClass = [...currentDiv.classList].find(c => c.startsWith("month_"));
  let month = parseInt(monthClass.split("_")[1]);
  currentDiv.classList.remove(monthClass);

  month -= 1;

  if (month == 0) {
    month = 12
    getPreviousYear();
  }
  currentDiv.classList.add(`month_${month}`);
}

async function getPreviousWeek() {
  let currentDiv = document.querySelector(".current");

  // start date
  let startClass = [...currentDiv.classList].find(c => c.startsWith("start_"));
  let start = startClass.split("_")[1]; 
  // remove current week
  currentDiv.classList.remove(startClass);

  const startObj = new Date(start);
  let prevStart = new Date(startObj);
  prevStart.setDate(prevStart.getDate() - 6);

  // end date
  let endClass = [...currentDiv.classList].find(c => c.startsWith("end_"));
  let end = endClass.split("_")[1]; 
  // remove current week
  currentDiv.classList.remove(endClass);

  const endObj = new Date(end);
  let prevEnd = new Date(endObj);
  prevEnd.setDate(prevEnd.getDate() - 6);



  // format date so it is just 'yyyy-mm-dd'
  prevStart = prevStart.getFullYear() + '-' +
                String(prevStart.getMonth() + 1).padStart(2, '0') + '-' +
                String(prevStart.getDate()).padStart(2, '0');

  prevEnd = prevEnd.getFullYear() + '-' +
              String(prevEnd.getMonth() + 1).padStart(2, '0') + '-' +
              String(prevEnd.getDate()).padStart(2, '0');


  // assigning new week to dom
  currentDiv.classList.add(`start_${prevStart}`);
  currentDiv.classList.add(`end_${prevEnd}`);

}


async function getNextWeek() {
  let currentDiv = document.querySelector(".current");

  // start date
  let startClass = [...currentDiv.classList].find(c => c.startsWith("start_"));
  let start = startClass.split("_")[1]; 
  // remove current week
  currentDiv.classList.remove(startClass);

  const startObj = new Date(start);
  let prevStart = new Date(startObj);
  prevStart.setDate(prevStart.getDate() + 8);

  // end date
  let endClass = [...currentDiv.classList].find(c => c.startsWith("end_"));
  let end = endClass.split("_")[1]; 
  // remove current week
  currentDiv.classList.remove(endClass);

  const endObj = new Date(end);
  let prevEnd = new Date(endObj);
  prevEnd.setDate(prevEnd.getDate() + 8);



  // format date so it is just 'yyyy-mm-dd'
  prevStart = prevStart.getFullYear() + '-' +
                String(prevStart.getMonth() + 1).padStart(2, '0') + '-' +
                String(prevStart.getDate()).padStart(2, '0');

  prevEnd = prevEnd.getFullYear() + '-' +
              String(prevEnd.getMonth() + 1).padStart(2, '0') + '-' +
              String(prevEnd.getDate()).padStart(2, '0');


  // assigning new week to dom
  currentDiv.classList.add(`start_${prevStart}`);
  currentDiv.classList.add(`end_${prevEnd}`);

}


async function addWeekClass() {
  let currentDiv = document.querySelector(".current");
  if (currentDiv.id = 'week') {

    const dateArray = await getCurrentWeek();

    let start = dateArray[0];
    let end = dateArray[1];

    currentDiv.classList.add(`start_${start}`);
    currentDiv.classList.add(`end_${end}`);

  }
}

async function addMonthClass() {
  let currentDiv = document.querySelector(".current");
  // if month is selected
  if (currentDiv.id == 'month') {
    let month = await getCurrentMonth();
    let year = await getCurrentYear();

    currentDiv.classList.add(`month_${month}`);
    currentDiv.classList.add(`year_${year}`);
  } 
}

async function getCurrentWeek() {
  const now = new Date();
  const day = now.getDay();

  // start of week
  let startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - day);
  // format date so it is just 'yyyy-mm-dd'
  startOfWeek = startOfWeek.getFullYear() + '-' +
                String(startOfWeek.getMonth() + 1).padStart(2, '0') + '-' +
                String(startOfWeek.getDate()).padStart(2, '0');

  // end of week
  let endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + (6 - day));

  endOfWeek = endOfWeek.getFullYear() + '-' +
              String(endOfWeek.getMonth() + 1).padStart(2, '0') + '-' +
              String(endOfWeek.getDate()).padStart(2, '0');
 
  const dateArray = [startOfWeek, endOfWeek];

  return dateArray
}



// adds current month # and year # to the .current div    
async function getCurrentMonth() {
  const d = new Date();
  let month = d.getMonth()+1; // [0-11]
  return month
}

async function getCurrentYear() {
  const d = new Date();
  let year = d.getFullYear();
  return year;
}



// if fetching weekly
async function getWeekExp (start, end) {
  try 
  {
    const res = await fetch(`/ovrv/week?start=${start}&end=${end}`);  
    const weeklyExpenses = await res.json();
    console.log(weeklyExpenses)
    return weeklyExpenses;

  } 
  catch (e)
  {
    console.log('error getting selected weeks expenses')
  }
}

// if fetching monthly
async function getMonthExp (month, year) {
  try 
  {

    console.log(month);
    console.log(year)

    const res = await fetch(`/ovrv/month?month=${month}&year=${year}`);  
    const monthlyExpenses = await res.json();
    return monthlyExpenses;

  } 
  catch (e)
  {
    console.log('error getting selected months expenses')
  }
}


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
async function displayProfit() {

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
























