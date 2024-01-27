const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { authenticateUser } = require('./middleware/authMiddleware');
const { PORT, MONGODB_URI } = require('./config/config');
const cacheMiddleware = require('./middleware/cacheMiddleware');

const app = express();

// Connection to MongoDB
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

// Handeling MongoDB connection errors
db.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit the application on connection error
});

// Once connected to MongoDB popping a Success message
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

// app.use(cacheMiddleware);

// Routes
app.use('/users', userRoutes);
app.use('/events', authenticateUser, eventRoutes);
app.use('/tickets', authenticateUser, ticketRoutes);
app.use('/comments', authenticateUser, commentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
