import express from 'express';
import { getUserExpenses, putUserExpense, addUserExpense } from '../controllers/expenseController.js';


const router = express.Router();

// get expenses
router.get('/', getUserExpenses);
router.put('/', putUserExpense); // update
router.post('/', addUserExpense)


export default router;
