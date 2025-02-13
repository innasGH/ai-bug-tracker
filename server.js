const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

let bugReports = [];

// API Routes
app.post('/report-bug', (req, res) => {
    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const bug = { id: bugReports.length + 1, title, description, priority, status: "Open" };
    bugReports.push(bug);
    res.json({ message: "Bug report submitted successfully", bug });
});

app.get('/bugs', (req, res) => {
    res.json(bugReports);
});

// Explicitly bind to 0.0.0.0 to ensure it's reachable
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

// Log any errors when trying to bind
server.on('error', (err) => {
    console.error(`Error binding to port ${PORT}:`, err);
});
