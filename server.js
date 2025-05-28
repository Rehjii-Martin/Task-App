const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'tasks.json');

let tasks = [];

if (fs.existsSync(DATA_FILE)) {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    tasks = JSON.parse(data);
    console.log(`Loaded ${tasks.length} tasks from file.`);
  } catch (err) {
    console.error('Failed to load tasks from file:', err);
  }
}

app.use(express.static('public'));
app.use(express.json());

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Add a task
app.post('/api/tasks', (req, res) => {
  const task = { id: Date.now(), text: req.body.text, createdAt: new Date() };
  tasks.push(task);
  saveTasksToFile();
  res.status(201).json(task);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  saveTasksToFile();
  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// Update a task's text
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (req.body.text && req.body.text.trim() !== '') {
    tasks[index].text = req.body.text.trim();
  }

  res.json(tasks[index]);
  saveTasksToFile();
});

function saveTasksToFile() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}
