import path from 'path';
import { fileURLToPath } from 'url'; 
// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const createAccount = async (req, res, next) => {    
    try {
        // receives a post request with username and password
        
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({ error : e.message || 'Internal server error' });
    }
};

export const login = async (req, res, next) => {   
    try {
        console.log(req);
        const username = req.body.username;
        const password = req.body.password;
        const rePassword = req.body.re_password;
        const email = req.body.email;
        const fullName = req.body.full_name;

        // receives a post request with username and password
        res.json({  username: username, 
                    password: password,
                    rePassword: rePassword,
                    email: email,
                    full_name: fullName
                });
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({ error : e.message || 'Internal server error' });
    }
}
