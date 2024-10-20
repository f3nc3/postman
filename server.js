// server.js
//mkdir my-node-server
//cd my-node-server
//npm init -y
//npm install express
//touch server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample data (in-memory database)
let todos = [];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Todo text is required' });
  }
  const newTodo = { id: todos.length + 1, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
