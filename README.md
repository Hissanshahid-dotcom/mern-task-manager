# Task Manager App (MERN Stack)

A full-stack task management app with user authentication and CRUD operations.

## Tech Stack
- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt password hashing

## Features
- User registration & login (JWT-based auth)
- Create, read, update, delete tasks
- Task priority (low/medium/high) and status (pending/in-progress/completed)
- Filter tasks by status
- Due dates
- Responsive dashboard UI

---

## Setup Instructions

### 1. MongoDB Setup
1. Go to https://mongodb.com/cloud/atlas and create a free account.
2. Create a free (M0) cluster.
3. Under "Database Access," create a database user with a username/password.
4. Under "Network Access," allow access from anywhere (0.0.0.0/0) for development.
5. Click "Connect" -> "Drivers" -> copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager
   ```

### 2. Backend Setup
```bash
cd backend
npm install
```

Edit the `.env` file and paste your MongoDB connection string:
```
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/taskmanager
JWT_SECRET=change_this_to_any_random_long_string
```

Run the backend:
```bash
npm install -g nodemon   # optional, for auto-restart
nodemon server.js
# or simply:
node server.js
```

Backend will run on `https://merntaskmanagerbackend-rgk2jhpf.b4a.run`

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Use the App
1. Open `http://localhost:5173` in your browser.
2. Register a new account.
3. Start adding, editing, completing, and deleting tasks.

---

## Project Structure
```
task-manager-app/
├── backend/
│   ├── models/         # Mongoose schemas (User, Task)
│   ├── routes/         # Express routes (auth, tasks)
│   ├── middleware/      # JWT auth middleware
│   ├── server.js        # Entry point
│   └── .env             # Environment variables (DB, JWT secret)
└── frontend/
    ├── src/
    │   ├── pages/        # Login, Register, Dashboard
    │   ├── components/   # TaskForm, TaskItem, PrivateRoute
    │   ├── context/       # Auth context (global user state)
    │   ├── api.js          # Axios instance with JWT interceptor
    │   └── App.jsx
    └── index.html
```

## Customization Ideas (to make this YOUR portfolio piece)
- Change the color theme in `frontend/src/index.css` (search/replace `#5b6cff`)
- Add categories/tags to tasks
- Add a "search tasks" feature
- Add pagination for large task lists
- Deploy backend to Render/Railway and frontend to Vercel/Netlify, then add the live link to your portfolio

## Deployment (for your portfolio link)
- **Backend:** Render.com or Railway.app (free tiers available)
- **Frontend:** Vercel.com or Netlify.com (free, connects directly to GitHub)
- **Database:** MongoDB Atlas (already free tier)

Once deployed, push the code to your own GitHub repo and add the live demo link + GitHub link to your Upwork/Fiverr profile.
