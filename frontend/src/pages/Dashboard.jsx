import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (taskData) => {
    try {
      if (editingTask) {
        const res = await API.put(`/tasks/${editingTask._id}`, taskData);
        setTasks(tasks.map((t) => (t._id === editingTask._id ? res.data : t)));
        setEditingTask(null);
      } else {
        const res = await API.post('/tasks', taskData);
        setTasks([res.data, ...tasks]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const res = await API.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Manager</h1>
        <div className="header-right">
          <span>Hi, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="form-panel">
          <h2>{editingTask ? 'Edit Task' : 'New Task'}</h2>
          <TaskForm
            onSubmit={handleAddOrUpdate}
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />
        </aside>

        <main className="tasks-panel">
          <div className="filter-bar">
            {['all', 'pending', 'in-progress', 'completed'].map((f) => (
              <button
                key={f}
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <p>Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="empty-state">No tasks found. Add one!</p>
          ) : (
            <div className="task-list">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
