import { pool } from '../database/pool.js';



export const getUserData = async (userId) => { 
    const [rows] = await pool.query("SELECT user_id, username, user_password, email, full_name FROM users WHERE user_id = ?", [userId]);
    console.log(rows);
}