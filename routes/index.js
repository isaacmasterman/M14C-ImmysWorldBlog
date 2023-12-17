const express = require('express');
const router = express.Router();

// Import models
const { Post, User, Comment } = require('../models');

// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

// Dashboard route
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const userPostsData = await Post.findAll({
            where: {
                userId: req.session.user_id // Assuming the user ID is stored in session
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        const userPosts = userPostsData.map(post => post.get({ plain: true }));

        res.render('dashboard', { userPosts });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).send('Error loading the dashboard');
    }
});

// Home page route
router.get('/', async (req, res) => {
    try {
        // Fetch all posts along with the User details
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'], // Include only username from User
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'] // Include username for each comment
                    }
                }
            ],
            order: [['createdAt', 'DESC']], // Optional: to order posts by creation date
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized posts into Handlebars template
        res.render('home', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error loading the home page');
    }
});

// Route to display the new post form
router.get('/new-post', (req, res) => {
    if (!req.session.logged_in) {
        // Redirect to login page if not logged in
        return res.redirect('/login');
    }
    
    res.render('new-post');
});

module.exports = router;
