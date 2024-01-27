const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    type: String,
    price: Number,
    quantity: Number,
});

module.exports = mongoose.model('Ticket', ticketSchema);
