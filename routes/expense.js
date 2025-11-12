import express from 'express';
import { getUserExpenses, putUserExpense, addUserExpense, deleteUserExpense, getSumUserExpenses } from '../controllers/expenseController.js';


const router = express.Router();

// get expenses
router.get('/', getUserExpenses);
router.put('/', putUserExpense); // update
router.post('/', addUserExpense)
router.delete('/', deleteUserExpense)
router.get('/total', getSumUserExpenses);


export default router;
