// server/models/Member.js
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Prevent duplicate applications from same email
    },
    message: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: 'Pending' // Pending, Approved, Rejected
    },
    applicationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Member', MemberSchema);