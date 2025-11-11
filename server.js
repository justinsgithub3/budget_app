import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
//import { promises as fs} from 'fs'; // allows for async file reading
import cookieParser from 'cookie-parser';
import logger from './middleware/logger.mjs';
import level from './routes/level.js';
import authentication from './routes/authentication.js';
import display from './routes/display.js';
import session from 'express-session';
import expense from './routes/expense.js';

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

// cookie middleware - used in /verify route for authentication
app.use(cookieParser(process.env.COOKIE_KEY));

// session middleware
app.use(
  session({
    name: "session",    
    secret: process.env.SESSION_KEY, // change this to something long and random
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

const port = process.env.PORT || 8080;

// parse json data
app.use(express.json());

// Select ejs middleware
// app.set('view engine', 'ejs');

// routes in this middlware regarding levels
//app.use('/level', level);
app.use('/verify', authentication);
app.use('/display', display); // reitterating levels for testing
app.use('/exp', expense) // anything dealing with expenses

app.get(['/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/index.html'));
})


// initialize a port.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
