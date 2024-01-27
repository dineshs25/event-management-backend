const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createComment, getEventComments } = require('../controllers/commentController');
const { authenticateUser } = require('../middleware/authMiddleware');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Create a new comment for an event
router.post(
    '/',
    [
        authenticateUser,
        check('eventId', 'Event ID is required').not().isEmpty(),
        check('text', 'Comment text is required').not().isEmpty(),
    ],
    createComment
);


// Get all comments for a specific event
router.get('/event/:eventId', cacheMiddleware, getEventComments);

module.exports = router;
