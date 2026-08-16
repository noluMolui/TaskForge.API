import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Helper to get the absolute path to tasks.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/tasks.json');

// Helper function to read tasks from file
async function readTasks() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write tasks to file
async function writeTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
}

// GET /tasks - Return all tasks (Status: 200)
router.get('/', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

// GET /tasks/:id - Return a single task (Status: 200 or 404)
router.get('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /tasks/:id/verify - Stage 2 async verify endpoint
router.get('/:id/verify', async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Simulate slow external check
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!task.title) {
      return res.status(400).json({ error: 'Verification failed: Task is missing a required title' });
    }

    res.status(200).json({ message: 'Task verified successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Server error during verification' });
  }
});

// POST /tasks - Create a new task (Status: 201 Created)
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const tasks = await readTasks();
    const newTask = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id - Update a task (Status: 200 or 404)
router.put('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { title, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await writeTasks(tasks);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /tasks/:id - Remove a task (Status: 204 No Content or 404)
router.delete('/:id', async (req, res) => {
  try {
    const tasks = await readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(index, 1);
    await writeTasks(tasks);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;