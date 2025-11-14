import path from 'path';
import { fileURLToPath } from 'url'; 
import { getIncomes, putIncome, addIncome, deleteIncome, getSumOfIncomes } from '../database/incomeQueries.js';

// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// gets all incomes for a certain user
export const getUserIncomes = async (req, res, next) => {  
    // if user not logged in, redirect back home 
    if (!req.session.userId) {
        return res.json({err: "user not logged in."});
    } 
    try {
        const userId = req.session.userId;
        // get user id
        const incomes = await getIncomes(userId);
    
        res.json(
            {
                "status" : "success",
                "incomes": incomes
            }
        );
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
};

// update one income
export const putUserIncome = async (req, res, next) => {
    try {  
        const user = req.session.userId;
        if (!user) {
            return res.json({err: "user not logged in."});
        } 
        const data = req.body;
        
        const response = await putIncome(data); // pass income info and data to query

        res.json({"status" : "success"});
    } catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
}


export const addUserIncome = async (req, res, next) => {
    const user = req.session.userId;
    if (!user) {
        return res.json({err: "user not logged in."});
    } 
    try {

        const data = req.body;
        const response = await addIncome(data, user);

        res.json({"status" : "success"});

    } catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
}

export const deleteUserIncome = async (req, res, next) => {
    const user = req.session.userId;
    if (!user) {
        return res.json({err: "user not logged in."});
    } 
    try {
        const data = req.body;
        const response = await deleteIncome(data, user);
        res.json({"status" : "success"});

    } catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({"status": "no success"});
    }
}

export const getSumUserIncomes = async (req, res, next) => {
    const user = req.session.userId;
    if (!user) {
        return res.json({err: "user not logged in."});
    } 
    try {
        const response = await getSumOfIncomes(user);
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
