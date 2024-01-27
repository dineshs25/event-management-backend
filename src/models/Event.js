const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: String,
    location: String,
    organizer: String,
});

module.exports = mongoose.model('Event', eventSchema);
