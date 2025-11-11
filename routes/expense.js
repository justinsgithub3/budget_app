import express from 'express';
import { getUserExpenses } from '../controllers/expenseController.js';


const router = express.Router();

// get expenses
router.get('/expenses', getUserExpenses);


export default router;
