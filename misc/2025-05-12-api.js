// app.js - Node.js API generated from ALPS profile
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let users = [
  { id: 1, userName: "Alice", userEmail: "alice@example.com" },
  { id: 2, userName: "Bob", userEmail: "bob@example.com" }
];
// app.js - Node.js API generated from ALPS profile
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let users = [
  { id: 1, userName: "Alice", userEmail: "alice@example.com" },
  { id: 2, userName: "Bob", userEmail: "bob@example.com" }
];

let tasks = [
  { id: 1, title: "Write report", description: "Weekly report", dueDate: "2025-05-14", priority: "high", status: "open", assignedUser: 1 },
  { id: 2, title: "Fix bug", description: "UI bug fix", dueDate: "2025-05-13", priority: "medium", status: "in-progress", assignedUser: 2 }
];

// Root
app.get('/', (req, res) => {
  res.json({
    _links: {
      users: { href: "/users" },
      tasks: { href: "/tasks" }
    }
  });
});

// Users
app.get('/users', (req, res) => {
  res.json(users.map(u => ({ ...u, _links: userLinks(u.id) })));
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) res.json({ ...user, _links: userLinks(user.id) });
  else res.status(404).end();
});

app.post('/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json({ ...newUser, _links: userLinks(newUser.id) });
});

app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json({ ...users[index], _links: userLinks(users[index].id) });
  } else res.status(404).end();
});

app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).end();
});

// Tasks
app.get('/tasks', (req, res) => {
  const { status, user } = req.query;
  let filtered = tasks;
  if (status) filtered = filtered.filter(t => t.status === status);
  if (user) filtered = filtered.filter(t => t.assignedUser == user);
  res.json(filtered.map(t => ({ ...t, _links: taskLinks(t.id) })));
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) res.json({ ...task, _links: taskLinks(task.id) });
  else res.status(404).end();
});

app.post('/tasks', (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.status(201).json({ ...newTask, _links: taskLinks(newTask.id) });
});

app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json({ ...tasks[index], _links: taskLinks(tasks[index].id) });
  } else res.status(404).end();
});

// Mark complete
app.put('/tasks/:id/complete', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.status = "completed";
    res.json({ ...task, _links: taskLinks(task.id) });
  } else res.status(404).end();
});

// Hypermedia link builders
function userLinks(id) {
  return {
    self: { href: `/users/${id}` },
    update: { href: `/users/${id}`, method: "PUT", args: ["userName", "userEmail"] },
    delete: { href: `/users/${id}`, method: "DELETE" }
  };
}

function taskLinks(id) {
  return {
    self: { href: `/tasks/${id}` },
    update: { href: `/tasks/${id}`, method: "PUT", args: ["title", "description", "dueDate", "priority", "status", "assignedUser"] },
    complete: { href: `/tasks/${id}/complete`, method: "PUT" }
  };
}

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));

let tasks = [
  { id: 1, title: "Write report", description: "Weekly report", dueDate: "2025-05-14", priority: "high", status: "open", assignedUser: 1 },
  { id: 2, title: "Fix bug", description: "UI bug fix", dueDate: "2025-05-13", priority: "medium", status: "in-progress", assignedUser: 2 }
];

// Root
app.get('/', (req, res) => {
  res.json({
    _links: {
      users: { href: "/users" },
      tasks: { href: "/tasks" }
    }
  });
});

// Users
app.get('/users', (req, res) => {
  res.json(users.map(u => ({ ...u, _links: userLinks(u.id) })));
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) res.json({ ...user, _links: userLinks(user.id) });
  else res.status(404).end();
});

app.post('/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json({ ...newUser, _links: userLinks(newUser.id) });
});

app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json({ ...users[index], _links: userLinks(users[index].id) });
  } else res.status(404).end();
});

app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).end();
});

// Tasks
app.get('/tasks', (req, res) => {
  const { status, user } = req.query;
  let filtered = tasks;
  if (status) filtered = filtered.filter(t => t.status === status);
  if (user) filtered = filtered.filter(t => t.assignedUser == user);
  res.json(filtered.map(t => ({ ...t, _links: taskLinks(t.id) })));
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) res.json({ ...task, _links: taskLinks(task.id) });
  else res.status(404).end();
});

app.post('/tasks', (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.status(201).json({ ...newTask, _links: taskLinks(newTask.id) });
});

app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json({ ...tasks[index], _links: taskLinks(tasks[index].id) });
  } else res.status(404).end();
});

// Mark complete
app.put('/tasks/:id/complete', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.status = "completed";
    res.json({ ...task, _links: taskLinks(task.id) });
  } else res.status(404).end();
});

// Hypermedia link builders
function userLinks(id) {
  return {
    self: { href: `/users/${id}` },
    update: { href: `/users/${id}`, method: "PUT", args: ["userName", "userEmail"] },
    delete: { href: `/users/${id}`, method: "DELETE" }
  };
}

function taskLinks(id) {
  return {
    self: { href: `/tasks/${id}` },
    update: { href: `/tasks/${id}`, method: "PUT", args: ["title", "description", "dueDate", "priority", "status", "assignedUser"] },
    complete: { href: `/tasks/${id}/complete`, method: "PUT" }
  };
}

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));

