import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory array with a valid task and a broken task (missing title) for Stage 2
let tasks = [
  {
    id: uuidv4(),
    title: 'Learn Express Routing',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    completed: false,
    createdAt: new Date().toISOString()
  }
];

// GET /tasks - Return all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - Return a single task
router.get('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// POST /tasks - Create a new task
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a task
router.put('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE /tasks/:id - Remove a task
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});
// GET /tasks/:id/verify - Simulate a slow external check using async/await
router.get('/:id/verify', async (req, res) => {
  try {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Simulate a slow external check (delayed by 1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if the task is missing the required title
    if (!task.title) {
      return res.status(400).json({ error: 'Verification failed: Task is missing a required title' });
    }

    res.json({ message: 'Task verified successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Server error during verification' });
  }
});


export default router;