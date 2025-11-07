import express from 'express';
import { getLevel1 , getLevel2 } from '../controllers/levelController.js';


const router = express.Router();

// GET level 1
router.get('/1', getLevel1);
// GET level 2
router.get('/2', getLevel2);

export default router;
