import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.js';
import taskRoutes from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Serve static files from the public folder explicitly using path.join
app.use(express.static(path.join(__dirname, 'public')));

// Apply global custom logging middleware
app.use(logger);

// Mount task routes
app.use('/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});