# TaskForge API

A backend REST API built with Node.js and Express for a task management application. This project is structured in four progressive stages covering server routing, asynchronous operations, file persistence, and centralized error handling.

---

## Features

* **RESTful Routing:** Full CRUD support with standard HTTP status codes (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`).
* **File System Persistence:** Utilizes Node's `fs.promises` to read and write data to `tasks.json`, ensuring data is saved across server restarts.
* **Asynchronous Verification:** Simulates an external check using `async/await`, `setTimeout`, and custom validation checks.
* **Custom Logging Middleware:** Globally logs incoming request methods, paths, and timestamps to the console.
* **Centralized Error Handling:** Uses `next(err)` to route errors to a single error-handling middleware block, preventing server crashes.
* **Static Asset Serving:** Serves a frontend user interface using `express.static`.

---

## Project Structure

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

---

## Installation & Running the Project

1. Clone the repository: `git clone <your-repository-url>`
2. Navigate into the project folder: `cd taskforge-api`
3. Install dependencies: `npm install`
4. Start the server: `node server.js`
5. Access the application: Open your browser and navigate to `http://localhost:3000` to view the task dashboard.

---

## API Endpoints Reference

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/tasks` | Retrieve all tasks | `200`, `500` |
| **GET** | `/tasks/:id` | Retrieve a single task by ID | `200`, `404`, `500` |
| **GET** | `/tasks/:id/verify` | Run an asynchronous verification check on a task | `200`, `400`, `404`, `500` |
| **POST** | `/tasks` | Create a new task (requires a title) | `201`, `400`, `500` |
| **PUT** | `/tasks/:id` | Update an existing task | `200`, `404`, `500` |
| **DELETE** | `/tasks/:id` | Remove a task by ID | `204`, `404`, `500` |

---

## Author
* **Noluthando Molui**