const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticateUser } = require('../middleware/authMiddleware');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Create a new event
router.post(
    '/',
    [
        authenticateUser,
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty(),
        check('time', 'Time is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('organizer', 'Organizer is required').not().isEmpty(),
    ],
    createEvent
);

// Get all events
router.get('/', cacheMiddleware, getAllEvents);

// Get details of a single event by ID
router.get('/:id', getEventById);

// Update an event
router.put(
    '/:id',
    [
        authenticateUser,
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty(),
        check('time', 'Time is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('organizer', 'Organizer is required').not().isEmpty(),
    ],
    updateEvent
);

// Delete an event
router.delete('/:id', authenticateUser, deleteEvent);

module.exports = router;
