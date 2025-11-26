import { pool } from '../database/pool.js';



export const getProfit = async (userId) => {
    const [profit] = await pool.query(`SELECT getProfit(?) AS profit`, [userId]);
    return profit;
};

export const getExpenses = async (userId) => {
    const [expenses] = await pool.query(   `SELECT expense_id, amount, date_exp 
                                            FROM expenses 
                                            WHERE user_id = ?
                                            ORDER BY date_exp`, [userId]);
    return expenses;
};

export const getIncomes = async (userId) => {
    const [incomes] = await pool.query(    `SELECT income_id, description_inc, amount, date_inc 
                                            FROM incomes 
                                            WHERE user_id = ?
                                            ORDER BY date_inc`, [userId]);
    return incomes;
};

export const getExpenseAvg = async (userId) => {
    const [expenseAvg] = await pool.query( `SELECT 
                                            DATE(date_exp) AS expense_date,
                                            AVG(amount) AS avg_daily_amount
                                            FROM expenses
                                            WHERE user_id = ?
                                            GROUP BY DATE(date_exp)
                                            ORDER BY expense_date`, [userId]);
    return expenseAvg;
};

export const getIncomeAvg = async (userId) => {
    const [incomeAvg] = await pool.query(  `SELECT 
                                            DATE(date_inc) AS income_date,
                                            AVG(amount) AS avg_daily_amount
                                            FROM incomes
                                            WHERE user_id = ?
                                            GROUP BY DATE(date_inc)
                                            ORDER BY income_date`, [userId]);
    return incomeAvg;
};

export const getMonthExp = async (userId, month, year) => {
    const [monthExp] = await pool.query(`CALL getMonthExp(?, ?, ?)`
                                        , [userId, month, year]);
    return monthExp;
};

export const getWeekExp = async (userId, startDate, endDate) => {
    const [weekExp] = await pool.query(`CALL getWeekExp(?, ?, ?)`
                                        , [userId, startDate, endDate]);
    // startDate and endDate define the boundaries of which expenses are selected
    console.log(weekExp)
    return weekExp;
}