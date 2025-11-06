import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
//import { promises as fs} from 'fs'; // allows for async file reading
//import cookieParser from 'cookie-parser';
import logger from './middleware/logger.mjs';
//import images from './routes/images.js';
//import displays from './routes/displays.js';
import level from './routes/level.js';

// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

// Logger middleware
app.use(logger);
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

const port = process.env.PORT || 8080;

// parse json data
app.use(express.json());

// Select ejs middleware
// app.set('view engine', 'ejs');

// routes in this middlware regarding levels
app.use('/level', level);



app.get(['/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/index.html'));
})

app.get(['/first'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/level1.html'));
});

// initialize a port.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
