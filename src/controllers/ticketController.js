const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const { validationResult } = require('express-validator');

// Function to purchase a ticket
const purchaseTicket = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { eventId, type, price, quantity } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const ticket = new Ticket({
            user: req.user.id,
            event: eventId,
            type,
            price,
            quantity,
        });

        await ticket.save();

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get user's purchased tickets
const getUserTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user.id }).populate('event', 'title date time location');

        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { purchaseTicket, getUserTickets };
