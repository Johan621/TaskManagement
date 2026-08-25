# Task Management System

A simple MERN task management application built for the SDE assignment.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT

## Features

- User registration and login
- JWT-based protected routes
- Create, view, edit and delete tasks
- Task status: Todo, In Progress, Done
- Task priority: Low, Medium, High
- Due dates
- Search by title
- Filter by status and priority
- Sorting and pagination
- Task analytics
- Responsive dashboard

## Project Structure

```text
TaskManagement/
├── backend/
└── frontend/
```

## Backend Setup

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend uses `http://localhost:5000/api` for the local backend.

## API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

Task listing supports `search`, `status`, `priority`, `sort`, `order`, `page`, and `limit` query parameters.

### Analytics

```text
GET /api/analytics
```

## Notes

Do not commit `.env` or `node_modules` to GitHub.
