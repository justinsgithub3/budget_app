import express from 'express';
import { getUserProfit, getUserAccounts, getUserMonthExpenses,
         getUserWeekExpenses                                        } from '../controllers/overviewController.js';

const router = express.Router();

// get incomes
router.get('/', getUserProfit);
router.get('/acc', getUserAccounts);
router.get('/month', getUserMonthExpenses);
router.get('/week', getUserWeekExpenses);

export default router;