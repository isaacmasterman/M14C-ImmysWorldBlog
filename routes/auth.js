const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Import the User model
const User = require('../models/User');

// Route for displaying the login page
router.get('/login', (req, res) => {
    // Render the login page
    res.render('login');
});

// Route for handling the login logic
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !user.checkPassword(password)) {
            // Redirect to login page with an error message (or handle this scenario appropriately)
            return res.redirect('/login');
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            // Redirect to the home page after successful login
            res.redirect('/');
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).redirect('/login'); // Redirect back on server error
    }
});

// Route for handling the logout logic
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/auth/login');
        });
    } else {
        res.status(404).end();
    }
});

// Route for displaying the signup page
router.get('/signup', (req, res) => {
    // Render the signup page
    res.render('signup');
});

// Route for handling the signup logic
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res._construct.status(500).send('Error saving session');
            }
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);

            // Redirect to the home page after successful login
            res.redirect('/');
        });

    } catch (error) {
        console.error('Error during signup:', error);
        if (!res.headersSent) {
            res.status(500).send('Error signing up');
        }
    }
});

module.exports = router;
