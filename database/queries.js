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

export const putExpense = async (data) => {
    const expenseId = data.id;
    const newDescription = data.new_description;
    const newAmount = data.new_amount;
    const newDate = data.new_date;

    const result = await pool.query(
       `UPDATE expenses
        SET description_exp = ?, amount = ?, date_exp = ?
        WHERE expense_id = ?`,
        [newDescription, newAmount, newDate, expenseId]);

    return result;
}

export const addExpense = async (data, userId) => {
    //const expenseId = data.new_id;
    const newDescription = data.new_description;
    const newAmount = data.new_amount;
    const newDate = data.new_date;
    const result = await pool.query(
       `INSERT INTO expenses (user_id, description_exp, amount, date_exp)
        VALUES (?, ?, ?, ?)`,
        [userId, newDescription, newAmount, newDate]);
    return result;
}

export const deleteExpense = async (data, userId) => {
    // verify with userId
    // data will just be data.expense_id
    const expenseId = data.id;
    const result = await pool.query(
        `DELETE FROM expenses
         WHERE expense_id = ? AND user_id = ?`,
         [expenseId, userId]);
    return result;
}