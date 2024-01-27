const Comment = require('../models/Comment');
const Event = require('../models/Event');
const { validationResult } = require('express-validator');

// Function to create a new comment
const createComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { eventId, text } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const comment = new Comment({
            user: req.user.id,
            event: eventId,
            text,
        });

        await comment.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get comments for a specific event
const getEventComments = async (req, res) => {
    try {
        const comments = await Comment.find({ event: req.params.eventId }).populate('user', 'username');

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createComment, getEventComments };
