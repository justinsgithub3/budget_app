import path from 'path';
import { fileURLToPath } from 'url'; 
// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getCreatePage = async (req, res, next) => {  
    // if already logged in, redirect back home 
    if (req.session.userId) {
        return res.redirect("/");
    } 
    try {
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'authentication-views', 'createAcct.html'));
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({ error : e.message || 'Internal server error' });
    }
};

export const getLoginPage = async (req, res, next) => {
    // if already logged in, redirect back home 
    if (req.session.userId) {
        return res.redirect("/");
    } 
    try {
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'authentication-views', 'login.html'));
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({ error : e.message || 'Internal server error' });
    }
};

export const getLevel1 = async (req, res, next) => {    
    try {
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'level1.html'));
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({ error : e.message || 'Internal server error' });
    }
};

export const getLevel2 = async (req, res, next) => {    
    // authenticate user
    if (!req.session.userId) {
        return res.redirect('/display/login');
    }



    try {
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'level2.html'));
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({ error : e.message || 'Internal server error' });
    }
};
