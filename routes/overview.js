import express from 'express';
import { getUserProfit, getUserAccounts } from '../controllers/overviewController.js';

const router = express.Router();

// get incomes
router.get('/', getUserProfit);
router.get('/acc', getUserAccounts);

export default router;