import express from 'express';
import logger from './middleware/logger.js';
import taskRoutes from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Apply global custom logging middleware
app.use(logger);

// Mount task routes
app.use('/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});