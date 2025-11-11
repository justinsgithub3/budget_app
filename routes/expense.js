import express from 'express';
import { getUserExpenses, putUserExpense, addUserExpense, deleteUserExpense } from '../controllers/expenseController.js';


const router = express.Router();

// get expenses
router.get('/', getUserExpenses);
router.put('/', putUserExpense); // update
router.post('/', addUserExpense)
router.delete('/', deleteUserExpense)


export default router;
