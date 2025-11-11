import { pool } from '../database/pool.js';



export const getUserData = async (username) => { 
    const [rows] = await pool.query("SELECT user_password, full_name, user_id FROM users WHERE username = ?", [username]);
    return rows;
};

export const getExpenses = async (userId) => {
    const [expenses] = await pool.query("SELECT expense_id, description_exp, amount, date_exp FROM expenses WHERE user_id = ?", [userId]);
    return expenses;
};

export const getUID = async (username) => {
    const result = await pool.query("SELECT user_id FROM users WHERE username = ?", [username]);

}