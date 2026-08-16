Markdown# TaskForge API

A robust backend REST API built with Node.js and Express for a task management application. This project demonstrates advanced backend concepts including Express routing, custom middleware, asynchronous programming with `async/await`, file system persistence using `fs.promises`, serving static files, and centralized error handling.

---

## Features

* **RESTful Architecture:** Complete CRUD operations supporting proper HTTP status codes (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`).
* **File Persistence:** Data is read from and written to a local `tasks.json` database using `fs.promises`, ensuring data survives server restarts.
* **Asynchronous Operations & Verification:** Includes a simulated slow-running external check (`/verify`) using promises and `setTimeout` with robust input validation.
* **Custom Logging Middleware:** Globally logs every incoming request's method, endpoint path, and timestamp to the console.
* **Centralized Error Handling:** All errors are routed cleanly through a dedicated error-handling middleware using `next(err)` to prevent server crashes and eliminate raw stack traces.
* **Static Frontend:** Serves a simple HTML dashboard via `express.static` that dynamically fetches and displays current tasks[cite: 1].

---

## Project Structure

```text
taskforge-api/
├── data/
│   └── tasks.json
├── middleware/
│   ├── errorHandler.js
│   └── logger.js
├── public/
│   └── index.html
├── routes/
│   └── tasks.js
├── package.json
├── README.md
└── server.js
Installation & SetupClone the repository:Bashgit clone <your-repository-url>
cd taskforge-api
Install dependencies:Bashnpm install
Run the server:For production:Bashnpm start+
For development:Bashnode server.js
Access the application:Open your browser and navigate to http://localhost:3000 to view the frontend task dashboard[cite: 1].API Endpoints ReferenceMethodEndpointDescriptionStatus CodesGET/tasksRetrieve all tasks from tasks.json[cite: 1]200, 500GET/tasks/:idRetrieve a single task by its unique ID[cite: 1]200, 404, 500GET/tasks/:id/verifyRun an asynchronous verification check (delayed 1.5s) on a task[cite: 1]200, 400, 404, 500POST/tasksCreate a new task (requires a title field)[cite: 1]201, 400, 500PUT/tasks/:idUpdate an existing task's title or completion status[cite: 1]200, 404, 500DELETE/tasks/:idRemove a task by its unique ID[cite: 1]204, 404, 500AuthorNoluthando Molui