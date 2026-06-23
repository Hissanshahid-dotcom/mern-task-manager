export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const priorityColors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-item-header">
        <h3>{task.title}</h3>
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-meta">
        <span className={`status-badge status-${task.status}`}>{task.status}</span>
        {task.dueDate && (
          <span className="due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="task-actions">
        <button onClick={() => onToggleStatus(task)}>
          {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
