import { pool } from '../database/pool.js';


export const getUserData = async (username) => { 
    const [rows] = await pool.query("SELECT user_password, full_name, user_id FROM users WHERE username = ?", [username]);
    return rows;
};

export const getUID = async (username) => {
    const result = await pool.query("SELECT user_id FROM users WHERE username = ?", [username]);
}

