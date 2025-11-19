import express from 'express';
import {    getCreatePage,  getLoginPage,   getLevel1, 
            getLevel2,      getIncomePage,  getOverview,
            getSettings                                   } from '../controllers/displayController.js';


const router = express.Router();

// get create account page
router.get('/create', getCreatePage);
// get login page
router.get('/login', getLoginPage)
// get stupid simple budget page
router.get('/level1', getLevel1);
// get spending tracker
router.get('/level2', getLevel2);
// income tracker
router.get('/income', getIncomePage);
// overview page
router.get('/overview', getOverview);
// settings page
router.get('/settings', getSettings);

export default router;


