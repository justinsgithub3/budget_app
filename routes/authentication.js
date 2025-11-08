import express from 'express';
import { createAccount, login } from '../controllers/authenticationController.js';

const router = express.Router();



// POST create account function
router.post('/', createAccount);
// POST login authentication
router.post('/login', login);

export default router;
