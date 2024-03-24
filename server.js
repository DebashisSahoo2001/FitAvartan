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
app.get('/profile', async(req, res) => {
            const userId = req.user._id;
        const scores = await Score.find({ userId: userId }); 

        res.render('profile', { user: req.user, scores: scores });
    // res.render('profile');
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
// In your server.js 
app.use(express.json()); // Add this middleware


app.post('/save-score', async (req, res) => {
    try {
        // Assuming you have an authenticated user (req.user)
        console.log(req.body);
        console.log(req.user);
        const newScore = new Score({
            // ... score data ...
            // userId: req.user._id
            nameWorkout: req.body.nameWorkout,
            duration: req.body.duration,
            repetition: req.body.repetition,
            date: req.body.date, // Or convert to a Date object if necessary
            userId: req.user._id
        });
        // console.log('pre hi');
        // await newScore.save();
        // console.log('post hi');
        console.log('Created Score document:', newScore);  // Log the score

        const savedScore = await newScore.save(); // await the save operation
        console.log('Saved Score:', savedScore);

        res.status(201).send('Score saved!');  

    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).send('Error saving score.');
    }
});

app.get('/fetch-scores', async (req, res) => {
    try {
        const userId = req.user._id;
        const scores = await Score.find({ userId: userId });
        res.json(scores); // Send the scores as JSON
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).send('Error fetching scores.');
    }
});


// app.get('/profile', passport.authenticate('local'), async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.redirect('/login'); // Redirect if not authenticated
//         }

//         const userId = req.user._id;
//         const scores = await Score.find({ userId: userId }); 

//         res.render('profile', { user: req.user, scores: scores });
//     } catch (error) {
//         console.error('Error fetching scores:', error);
//         // Handle error (e.g., display an error message to the user)
//     }
// });



// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}: Click to open in browser:`);
    console.log(`http://localhost:${PORT}`);
});
