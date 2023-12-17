const express = require('express');
const router = express.Router();

// Import models
const { Post, User, Comment } = require('../models');

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

// Route to display a specific post along with its comments
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [User]
                },
                {
                    model: User
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('post-details', { post, logged_in: req.session.logged_in });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Error loading the post');
    }
});

// Route to handle creating a new post
router.post('/create-post', isAuthenticated, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.user_id // Assuming user id is stored in session
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating the post');
    }
});

// Route to handle adding a comment
router.post('/post/:id/comment', isAuthenticated, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            postId: req.params.id,
            userId: req.session.user_id // Assuming user id is stored in session
        });

        res.redirect(`/post/${req.params.id}`);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Error adding the comment');
    }
});

module.exports = router;
