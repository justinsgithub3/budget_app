import express from 'express';
import { getLevel1 } from '../controllers/levelController.js';


const router = express.Router();

// GET level 1
router.get('/1', getLevel1);

export default router;
