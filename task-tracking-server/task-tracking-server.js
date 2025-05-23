// task-tracking-server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [
  { id: "1", userName: "Alice", userEmail: "alice@example.com" },
  { id: "2", userName: "Bob", userEmail: "bob@example.com" }
];

let tasks = [
  { id: "101", title: "Setup project", description: "Initial repo setup", dueDate: "2025-05-05", priority: "high", status: "open", assignedUser: "1" },
  { id: "102", title: "Write docs", description: "Document API usage", dueDate: "2025-05-10", priority: "medium", status: "in-progress", assignedUser: "2" }
];

const makeUserResponse = (user) => ({
  ...user,
  _links: {
    self: { href: `/users/${user.id}` },
    update: { href: `/users/${user.id}`, method: "PUT", args: ["userName", "userEmail"] },
    delete: { href: `/users/${user.id}`, method: "DELETE" }
  }
});

const makeTaskResponse = (task) => ({
  ...task,
  _links: {
    self: { href: `/tasks/${task.id}` },
    update: { href: `/tasks/${task.id}`, method: "PUT", args: ["title", "description", "dueDate", "priority", "status", "assignedUser"] },
    complete: { href: `/tasks/${task.id}/complete`, method: "POST" }
  }
});

// ROOT ROUTE
app.get('/', (req, res) => {
  res.json({
    _links: {
      tasks: { href: "/tasks" },
      users: { href: "/users" }
    }
  });
});

// USER ROUTES
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  res.json(user ? makeUserResponse(user) : {});
});

app.post('/users', (req, res) => {
  const newUser = { id: String(Date.now()), ...req.body };
  users.push(newUser);
  res.status(201).json(makeUserResponse(newUser));
});

app.put('/users/:id', (req, res) => {
  users = users.map(u => u.id === req.params.id ? { ...u, ...req.body } : u);
  const updatedUser = users.find(u => u.id === req.params.id);
  res.json(makeUserResponse(updatedUser));
});

app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== req.params.id);
  res.status(204).end();
});

app.get('/users', (req, res) => {
  res.json({
    items: users.map(makeUserResponse),
    _links: {
      self: { href: "/users" },
      create: { href: "/users", method: "POST", args: ["userName", "userEmail"] }
    }
  });
});

// TASK ROUTES
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  res.json(task ? makeTaskResponse(task) : {});
});

app.post('/tasks', (req, res) => {
  const newTask = { id: String(Date.now()), ...req.body };
  tasks.push(newTask);
  res.status(201).json(makeTaskResponse(newTask));
});

app.put('/tasks/:id', (req, res) => {
  tasks = tasks.map(t => t.id === req.params.id ? { ...t, ...req.body } : t);
  const updatedTask = tasks.find(t => t.id === req.params.id);
  res.json(makeTaskResponse(updatedTask));
});

app.post('/tasks/:id/complete', (req, res) => {
  tasks = tasks.map(t => t.id === req.params.id ? { ...t, status: 'completed' } : t);
  const completedTask = tasks.find(t => t.id === req.params.id);
  res.json(makeTaskResponse(completedTask));
});

app.get('/tasks', (req, res) => {
  const { status, assignedUser } = req.query;
  let filtered = tasks;
  if (status) filtered = filtered.filter(t => t.status === status);
  if (assignedUser) filtered = filtered.filter(t => t.assignedUser === assignedUser);
  res.json({
    items: filtered.map(makeTaskResponse),
    _links: {
      self: { href: "/tasks" },
      create: { href: "/tasks", method: "POST", args: ["title", "description", "dueDate", "priority", "status", "assignedUser"] },
      filterByStatus: { href: "/tasks?status=STATUS" },
      filterByUser: { href: "/tasks?assignedUser=USER_ID" }
    }
  });
});

app.listen(port, () => {
  console.log(`Task Tracking API listening at http://localhost:${port}`);
});

