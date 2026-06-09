TaskFlow — Full-Stack Task Management App
A production-ready task management application built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, JWT Auth, Socket.IO, and Chart.js.

✨ Features
🔐 User Registration, Login & JWT Authentication
📋 Create, Edit, Delete, View Tasks
🏷️ Status: Pending / In Progress / Completed
⚡ Priority: Low / Medium / High / Critical
🔍 Search, Filter & Sort Tasks
📅 Due Date Management with Overdue Detection
📊 Analytics Dashboard with Chart.js (Doughnut, Bar, Line charts)
🌙 Dark / Light Theme Toggle
🔔 Toast Notifications
🗑️ Confirmation Modals
👤 User Profile & Settings Pages
🔌 Real-time Updates via Socket.IO
📱 Fully Responsive (Mobile, Tablet, Desktop)
✨ Smooth Animations with Framer Motion
💀 Loading Skeletons & Empty States
📁 Project Structure
taskmanager/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Auth & Task controllers
│   ├── middleware/     # JWT auth & error handler
│   ├── models/         # User & Task mongoose schemas
│   ├── routes/         # Auth & Task API routes
│   ├── server.js       # Express + Socket.IO server
│   ├── .env.example    # Environment variable template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── contexts/   # Auth, Theme, Socket contexts
    │   ├── hooks/      # useTasks custom hook
    │   ├── pages/      # All page components
    │   └── utils/      # API client & helpers
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
🚀 Installation & Setup
Prerequisites
Node.js v18+
MongoDB (local or MongoDB Atlas)
1. Backend Setup
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
2. Frontend Setup
cd frontend
npm install
npm run dev
3. Open the App
Visit: http://localhost:5173

🔧 Environment Variables (backend/.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
📡 API Endpoints
Auth
Method	Route	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get current user
PUT	/api/auth/profile	Update profile
PUT	/api/auth/password	Change password
Tasks
Method	Route	Description
GET	/api/tasks	Get all tasks (filterable)
POST	/api/tasks	Create task
GET	/api/tasks/:id	Get single task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
GET	/api/tasks/analytics	Get analytics data
Query Params for GET /api/tasks
status — pending, in-progress, completed
priority — low, medium, high, critical
search — text search in title/description
sort — field to sort by (prefix - for descending)
page — page number
limit — results per page
🛠️ Tech Stack
Layer	Technology
Frontend	React 18, Vite, Tailwind CSS
Animations	Framer Motion
Charts	Chart.js, react-chartjs-2
Routing	React Router v6
HTTP	Axios
Realtime	Socket.IO
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Auth	JWT, bcryptjs
Notifications	react-hot-toast
🏗️ Build for Production
# Frontend
cd frontend && npm run build

# Backend
cd backend && NODE_ENV=production npm start
