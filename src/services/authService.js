const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Function to create a hash passowrd
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Function to create a new token
const generateToken = (user) => {
    const payload = { user: { id: user.id } };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

module.exports = { hashPassword, generateToken };