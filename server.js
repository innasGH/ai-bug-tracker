const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let bugReports = [];

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

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

// Function to handle bug submissions   
// Create an Express.js API for bug tracking
