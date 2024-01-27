const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { purchaseTicket, getUserTickets } = require('../controllers/ticketController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Purchase a ticket
router.post(
    '/',
    [
        authenticateUser,
        check('eventId', 'Event ID is required').not().isEmpty(),
        check('type', 'Ticket type is required').not().isEmpty(),
        check('price', 'Price is required').isNumeric(),
        check('quantity', 'Quantity is required').isNumeric(),
    ],
    purchaseTicket
);

// Get user's purchased tickets
router.get('/user', authenticateUser, getUserTickets);

module.exports = router;
