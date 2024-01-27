const User = require('../models/User');
const authService = require('../services/authService');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Function to create a new user
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        user = new User({ username, password: await authService.hashPassword(password) });

        await user.save();

        const token = authService.generateToken(user);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to login a new user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'User Not Exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const token = authService.generateToken(user);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get a user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
