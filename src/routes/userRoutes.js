const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Register a new user
router.post(
    '/',
    [
        check('username', 'Please enter a valid username').isLength({ min: 3 }),
        check('password', 'Please enter a valid password').isLength({ min: 6 }),
    ],
    registerUser
);

// User login
router.post('/login', loginUser);

// Get user profile
router.get('/profile', authenticateUser, getUserProfile);

module.exports = router;
