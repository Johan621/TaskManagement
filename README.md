# Task Management System

A simple MERN task management application built for the SDE assignment.

## Live Demo

🌐 Frontend: https://task-management-theta-ashen.vercel.app

⚙️ Backend API: https://taskmanagement-7q0o.onrender.com

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

## Local Setup

### Backend

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

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend uses `http://localhost:5000/api` unless `VITE_API_URL` is set.

## Production Deployment

The project is set up for a split deployment:

- **Backend:** Render
- **Frontend:** Vercel
- **Database:** MongoDB Atlas

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

### Analytics

```text
GET /api/analytics
```

## Notes

Do not commit `.env` or `node_modules` to GitHub.
