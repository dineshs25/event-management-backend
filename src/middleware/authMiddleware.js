const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Function to verify a user token
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

module.exports = { authenticateUser };
