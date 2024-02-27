// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const connectDB = require('./db');
// const authRoutes = require('./routes/auth');
// const path = require('path');


// const app = express();

// // Connect to MongoDB
// connectDB();

// // Session middleware
// app.use(session({
//     secret: 'your strong secret', // Use a strong secret
//     resave: false,
//     saveUninitialized: false
// }));

// // Passport setup
// // console.log('Passport:', passport);

// app.use(passport.initialize());
// app.use(passport.session()); 
// require('./config/passport')(passport);

// // View engine (EJS)
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Routes
// app.use('/auth', authRoutes);
// app.get('/', (req, res) => {
//     res.render('login');
// });
// app.get('/app', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('app'); 
//     } else {
//         res.redirect('/'); // Redirect to login if not authenticated
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 3000; // Use an environment variable for the port
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./db');
const authRoutes = require('./routes/auth'); 
const path = require('path');

const mongoose = require('mongoose'); // Add mongoose
const User = require('./models/user.js');
const Score = require('./models/score.js');


const app = express();

// Connect to MongoDB
connectDB();
// app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
// Session middleware
app.use(session({
    secret: 'your strong secret', // Use a strong secret
    resave: false,
    saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session()); 
require('./config/passport')(passport); 

// View engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes); // Mount the authRoutes router with '/auth' base path
app.get('/', (req, res) => {
    res.render('login');
});
app.get('/profile', (req, res) => {
    res.render('profile');
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/app', (req, res) => {
    if (req.isAuthenticated()) {
        // res.render('app'); 
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.redirect('/auth/login'); // Redirect to login within the '/auth' routes
    }
});


app.post('/save-score', async (req, res) => {
    try {
        // Assuming you have an authenticated user (req.user)

        const newScore = new Score({
            // ... score data ...
            userId: req.user._id 
        });
        await newScore.save(); 
        res.status(201).send('Score saved!');  
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).send('Error saving score.');
    }
});


// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
