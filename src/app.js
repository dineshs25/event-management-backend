const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { authenticateUser } = require('./middleware/authMiddleware');
const { PORT, MONGODB_URI } = require('./config/config');
const cors = require('cors');


const app = express();

// Connection to MongoDB
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

// Handeling MongoDB connection errors
db.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
});

// Once connected to MongoDB popping a Success message
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


//mention origins to give access
const allowedOrigins = [
    '*'
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);


// Routes
app.use('/users', userRoutes);
app.use('/events', authenticateUser, eventRoutes);
app.use('/tickets', authenticateUser, ticketRoutes);
app.use('/comments', authenticateUser, commentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;