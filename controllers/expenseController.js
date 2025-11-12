import path from 'path';
import { fileURLToPath } from 'url'; 
import { getExpenses, putExpense, addExpense, deleteExpense, getSumOfExpenses } from '../database/queries.js';

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

// update one expense
export const putUserExpense = async (req, res, next) => {
    try {  
        const user = req.session.userId;
        if (!user) {
            return res.json({err: "user not logged in."});
        } 
        const data = req.body;
        
        const response = await putExpense(data); // pass expense info and data to query

        res.json({"status" : "success"});
    } catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
}

export const addUserExpense = async (req, res, next) => {
    const user = req.session.userId;
    if (!user) {
        return res.json({err: "user not logged in."});
    } 
    try {

        const data = req.body;
        const response = await addExpense(data, user);

        res.json({"status" : "success"});

    } catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
}

export const deleteUserExpense = async (req, res, next) => {
    const user = req.session.userId;
    if (!user) {
        return res.json({err: "user not logged in."});
    } 
    try {
        const data = req.body;
        const response = await deleteExpense(data, user);
        res.json({"status" : "success"});

    } catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
}

export const getSumUserExpenses = async (req, res, next) => {
    const user = req.session.userId;
    if (!user) {
        return res.json({err: "user not logged in."});
    } 
    try {
        const response = await getSumOfExpenses(user);
        const total = response.total;

        res.json(
            {
                "status" : "success",
                "total": total
            }
        );

    } catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
}