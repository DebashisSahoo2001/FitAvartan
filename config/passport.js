// ./config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = function(passport) { // Export a function that accepts 'passport'
    passport.use(new LocalStrategy({
            usernameField: 'username'
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) { return done(null, false); } 


                console.log('User found:', user); 
                console.log('Hashed Password from database:', user.password);
                console.log('User found:', password); 

                const isMatch = await bcrypt.compare(password, user.password);
                console.log("isMatch value:", isMatch);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                done(error);
            }
        }
    ));

    // passport.serializeUser((user, done) => done(null, user.id));
    // passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user))); 
    passport.serializeUser(async (user, done) => {
        done(null, user.id); // Assuming your User model has an 'id' property
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);  
        }
    });

    // console.log('Passport instance received:', passport); // Keep this for logging
};
