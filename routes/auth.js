const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt'); // Install bcrypt for password hashing
const User = require('../models/user');

// Signup route (GET)
router.get('/signup', (req, res) => {
    res.render('signup'); 
});

// Signup route (POST)
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists'); 
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // 3. Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // 4. Redirect on success (adjust as needed)
        res.redirect('/auth/login'); 

    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user'); 
    }
});


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/auth/login' }),
    (req, res) => {
        // res.redirect('/app');
        res.redirect('/profile');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const passport = require('passport');

// // Login route (GET)
// router.get('/login', (req, res) => {
//     res.render('login'); 
// });

// // Login route (POST) - Handles authentication
// router.post('/login', 
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     (req, res) => {
//         // Redirect to Webpack app (assuming it's running on port 8080)
//         res.redirect('http://localhost:8080/'); 
//     }
// );

// // Logout route
// router.get('/logout', (req, res) => {
//     req.logout(); 
//     res.redirect('/login');
// });

// module.exports = router;
