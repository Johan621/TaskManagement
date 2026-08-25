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

- **Backend:** Render, using `backend/render.yaml`
- **Frontend:** Vercel, using `frontend/vercel.json` for React Router SPA fallback
- **Database:** MongoDB Atlas

### 1. Create the MongoDB database

Create a MongoDB Atlas cluster and database user. Copy the connection string for `MONGO_URI` and allow connections from your deployment service.

### 2. Deploy the backend to Render

Create a new Web Service from this GitHub repository. Set the service root directory to `backend`; Render can also use the checked-in `backend/render.yaml` configuration.

Required environment variables:

```text
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<long random secret>
```

The backend listens on Render's `PORT` and exposes:

```text
GET /api/...
```

The root health endpoint is:

```text
GET /
```

### 3. Deploy the frontend to Vercel

Import the same GitHub repository into Vercel and set the project root directory to `frontend`.

Build settings:

```text
Install Command: npm ci
Build Command: npm run build
Output Directory: dist
```

Set this environment variable in Vercel:

```text
VITE_API_URL=https://<your-render-service>.onrender.com/api
```

Redeploy after saving the environment variable.

### 4. Verify

Open the Vercel URL, register a user, log in, create a task, and confirm the dashboard/analytics requests succeed.

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
