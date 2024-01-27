const Event = require('../models/Event');
const { validationResult } = require('express-validator');

// Function to create a new event
const createEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, date, time, location, organizer } = req.body;

        const event = new Event({
            title,
            description,
            date,
            time,
            location,
            organizer,
        });

        await event.save();

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get details of a single event
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update an event
const updateEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const { title, description, date, time, location, organizer } = req.body;

        event.title = title;
        event.description = description;
        event.date = date;
        event.time = time;
        event.location = location;
        event.organizer = organizer;

        await event.save();

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete an event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.isActive = false;
        await event.save();

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
