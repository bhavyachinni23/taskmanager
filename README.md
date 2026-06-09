# TaskFlow – Full-Stack Task Management Application

TaskFlow is a full-stack task management application built to help users organize, track, and manage their work efficiently. The platform provides secure authentication, real-time updates, analytics, and a responsive user experience across desktop and mobile devices.

## Overview

TaskFlow enables users to create, manage, and monitor tasks through an intuitive interface. It combines modern frontend technologies with a scalable backend architecture to deliver a reliable productivity solution.

## Features

### Authentication and Security

* User Registration and Login
* JWT Authentication
* Password Hashing with bcrypt
* Protected Routes

### Task Management

* Create Tasks
* Edit Tasks
* Delete Tasks
* View and Track Tasks
* Task Status Management (Pending, In Progress, Completed)
* Priority Management (Low, Medium, High, Critical)

### Organization and Productivity

* Search Tasks
* Filter Tasks
* Sort Tasks
* Due Date Tracking
* Overdue Task Detection

### Analytics

* Task Statistics Dashboard
* Interactive Charts
* Progress Tracking
* Productivity Insights

### User Experience

* Responsive Design
* Dark and Light Theme Support
* Smooth Animations
* Toast Notifications
* Confirmation Modals
* Loading Skeletons
* Empty State Handling

### Real-Time Functionality

* Live Updates Using Socket.IO
* Instant Data Synchronization

### User Profile

* Profile Management
* Account Settings
* Password Updates

## Technology Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* React Router
* Axios
* Framer Motion
* Chart.js
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO
* bcryptjs

## Project Structure

```text
taskflow/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── hooks/
    │   ├── pages/
    │   └── utils/
    └── public/
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

## API Capabilities

### Authentication

* Register User
* Login User
* Get Current User
* Update Profile
* Change Password

### Tasks

* Create Task
* Retrieve Tasks
* Update Task
* Delete Task
* Analytics Data
* Filtering and Sorting
* Pagination

## Build for Production

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend
npm start
```

## License

This project was developed for educational, portfolio, and learning purposes.
