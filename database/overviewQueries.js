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