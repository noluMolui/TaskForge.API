import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/tasks.json');

async function readTasks() {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function writeTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
}

// GET /tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id/verify
router.get('/:id/verify', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!task.title) {
      const err = new Error('Verification failed: Task is missing a required title');
      err.status = 400;
      return next(err);
    }

    res.status(200).json({ message: 'Task verified successfully', task });
  } catch (error) {
    next(error);
  }
});

// POST /tasks
router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      const err = new Error('Title is required');
      err.status = 400;
      return next(err);
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
    next(error);
  }
});

// PUT /tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    const { title, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await writeTasks(tasks);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    tasks.splice(index, 1);
    await writeTasks(tasks);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;