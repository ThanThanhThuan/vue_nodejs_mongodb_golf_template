require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Event = require('./models/Event');
const Member = require('./models/Member');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Replace with your URI)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tiya-golf')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo Error:", err));
//mongodb://localhost:27017/

// --- ROUTES ---

// 1. Get All Events
app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// 2. Get Single Event
app.get('/api/events/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
});

// 3. Member Login (Mock Logic)
app.post('/api/login', (req, res) => {
    const { memberId, password } = req.body;
    // In real app, check DB and hash password
    if (memberId === "11002560" && password === "1234") {
        res.json({ success: true, token: "fake-jwt-token", user: "Michael" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

app.post('/api/membership', async (req, res) => {
    try {
        const { fullName, email, message } = req.body;

        // 1. Basic Validation
        if (!fullName || !email) {
            return res.status(400).json({ success: false, message: "Name and Email are required." });
        }

        // 2. Check if email already applied
        const existingMember = await Member.findOne({ email });
        if (existingMember) {
            return res.status(400).json({ success: false, message: "This email has already applied." });
        }

        // 3. Save to MongoDB
        const newMember = new Member({
            fullName,
            email,
            message
        });

        await newMember.save();

        console.log("New Member Saved:", newMember);
        res.status(201).json({ success: true, message: "Application received successfully!" });

    } catch (error) {
        console.error("Membership Error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
});

// 4. Contact Form
app.post('/api/contact', (req, res) => {
    console.log("Contact Received:", req.body);
    res.json({ success: true, message: "Message sent!" });
});

// Seed Data (Run once then remove)
app.get('/seed', async (req, res) => {
    await Event.deleteMany({});
    await Event.create([
        {
            title: "Private activities",
            date: "24",
            month: "Feb 2048",
            image: "images/professional-golf-player.jpg",
            description: "Lorem ipsum dolor sit amet...",
            location: "National Center, NYC",
            price: 250,
            category: "Private"
        },
        {
            title: "Group tournament activities",
            date: "28",
            month: "Feb 2048",
            image: "images/girl-taking-selfie-with-friends-golf-field.jpg",
            description: "Lorem ipsum dolor sit amet...",
            location: "National Center, NYC",
            price: 350,
            category: "Group"
        }
    ]);
    res.send("Database seeded");
});

// 5. Handle Membership Form Submission
app.post('/api/membership', (req, res) => {
    console.log("New Member Application:", req.body);
    // In a real app, save to DB or send email here
    res.json({ success: true, message: "Application received!" });
});

// 6. Handle Contact Form Submission
app.post('/api/contact', (req, res) => {
    console.log("New Contact Message:", req.body);
    res.json({ success: true, message: "Message sent!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));