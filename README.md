# TaskForge API

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