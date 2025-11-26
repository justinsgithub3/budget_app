import path from 'path';
import { fileURLToPath } from 'url'; 
import { getProfit, getIncomes, getExpenses, 
         getExpenseAvg, getIncomeAvg, getMonthExp,
         getWeekExp                                  } from '../database/overviewQueries.js';

// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// gets all incomes for a certain user
export const getUserProfit = async (req, res, next) => {  
    // if user not logged in, redirect back home 
    if (!req.session.userId) {
        return res.json({err: "user not logged in."});
    } 
    try {
        const userId = req.session.userId;
        // get user id
        const data = await getProfit(userId);
        const profit = data[0].profit;
        console.log(profit)
        res.json(
            {
                "status" : "success",
                "profit": profit
            }
        );
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
};

// gets all expenses for a certain user
export const getUserAccounts = async (req, res, next) => {  
    // if user not logged in, redirect back home 
    const userId = req.session.userId;
    if (!userId) {
        return res.json({err: "user not logged in."});
    } 
    try {

        const incomes = await getIncomes(userId);
        const expenses = await getExpenses(userId);
        const avgExpenses = await getExpenseAvg(userId);
        const avgIncomes = await getIncomeAvg(userId);

        res.json(
            {
                "status" : "success",
                "incomes": incomes,
                "expenses": expenses,
                "avgExpenses": avgExpenses,
                "avgIncomes": avgIncomes
            }
        );
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
};


// gets all expenses for the selected month
export const getUserMonthExpenses = async (req, res, next) => {  

    const month = req.query.month;
    const year = req.query.year;


    // if user not logged in, redirect back home 
    const userId = req.session.userId;
    if (!userId) {
        return res.json({err: "user not logged in."});
    } 
    try {

    if (!month || !year) {
        return res.json({err: "invalid dates."});
    }

        const [monthExp] = await getMonthExp(userId, month, year);

        console.log(monthExp)
        res.json(
            {
                "status" : "success",
                "month_expenses": monthExp
            }
        );
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
};

// gets all expenses for the selected month
export const getUserWeekExpenses = async (req, res, next) => {  

    // or just get start date and add 7

    const start = req.query.start;
    const end = req.query.end;


    // if user not logged in, redirect back home 
    const userId = req.session.userId;
    if (!userId) {
        return res.json({err: "user not logged in."});
    } 
    try {

    if (!start || !end) {
        return res.json({err: "invalid dates."});
    }

        const [weekExp] = await getWeekExp(userId, start, end);

        console.log(weekExp)
        res.json(
            {
                "status" : "success",
                "week_expenses": weekExp
            }
        );
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
};