const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// In-memory data store for tasks
let tasks = [];

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files from the current directory (for frontend files like CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// API to get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// API to add a new task
app.post('/tasks', (req, res) => {
    const { task } = req.body; // Extract task from request body
    if (task) {
        tasks.push(task); // Add task to the tasks array
        res.status(201).json({ message: 'Task added successfully' });
    } else {
        res.status(400).json({ message: 'Task content is required' });
    }
});

// API to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params; // Extract ID from URL params
    const taskIndex = parseInt(id, 10); // Convert ID to integer

    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1); // Remove the task at the given index
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
