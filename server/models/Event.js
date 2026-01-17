const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    date: String,     // e.g., "24"
    month: String,    // e.g., "Feb 2048"
    image: String,    // Path to image
    description: String,
    location: String,
    price: Number,
    category: String, // 'Private', 'Group', etc.
});

module.exports = mongoose.model('Event', EventSchema);