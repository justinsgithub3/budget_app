import { pool } from '../database/pool.js';

// gets the sum of all incomes for a user
export const getIncomes = async (userId) => {
    const [incomes] = await pool.query("SELECT income_id, description_inc, amount, date_inc FROM incomes WHERE user_id = ?", [userId]);
    return incomes;
};

export const putIncome = async (data) => {
    const incomeId = data.id;
    const newDescription = data.new_description;
    const newAmount = data.new_amount;
    const newDate = data.new_date;

    const result = await pool.query(
       `UPDATE incomes
        SET description_inc = ?, amount = ?, date_inc = ?
        WHERE income_id = ?`,
        [newDescription, newAmount, newDate, incomeId]);

    return result;
}

export const addIncome = async (data, userId) => {
    //const incomeId = data.new_id;
    const newDescription = data.new_description;
    const newAmount = data.new_amount;
    const newDate = data.new_date;
    const result = await pool.query(
       `INSERT INTO incomes (user_id, description_inc, amount, date_inc)
        VALUES (?, ?, ?, ?)`,
        [userId, newDescription, newAmount, newDate]);
    return result;
}

export const deleteIncome = async (data, userId) => {
    // verify with userId
    // data will just be data.income_id
    const incomeId = data.id;
    const result = await pool.query(
        `DELETE FROM incomes
         WHERE income_id = ? AND user_id = ?`,
         [incomeId, userId]);
    return result;
}

export const getSumOfIncomes = async (userId) => {
    // verify with userId
    const [response] = await pool.query(
       `SELECT SUM(amount) AS total
        FROM incomes 
        WHERE user_id = ?`,
        [userId]);
    return response[0];
}