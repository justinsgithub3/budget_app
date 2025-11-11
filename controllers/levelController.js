import path from 'path';
import { fileURLToPath } from 'url'; 
// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
    try {
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'level2.html'));
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({ error : e.message || 'Internal server error' });
    }
};

