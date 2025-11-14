import express from 'express';
import { getUserIncomes, putUserIncome, addUserIncome, deleteUserIncome, getSumUserIncomes } from '../controllers/incomeController.js';


const router = express.Router();

// get incomes
router.get('/', getUserIncomes);
router.put('/', putUserIncome); // update
router.post('/', addUserIncome)
router.delete('/', deleteUserIncome)
router.get('/total', getSumUserIncomes);


export default router;
