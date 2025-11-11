import path from 'path';
import { fileURLToPath } from 'url'; 
import { getExpenses } from '../database/queries.js';

// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// gets all expenses for a certain user
export const getUserExpenses = async (req, res, next) => {  
    // if user not logged in, redirect back home 
    if (!req.session.userId) {
        return res.json({err: "user not logged in."});
    } 
    try {
        const userId = req.session.userId;
        // get user id
        const expenses = await getExpenses(userId);
    
        res.json(
            {
                "status" : "success",
                "expenses": expenses
            }
        );
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
};