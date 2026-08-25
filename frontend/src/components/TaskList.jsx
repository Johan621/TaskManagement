import { useState } from "react";
import API from "../services/api";

const statusOptions = ["Todo", "In Progress", "Done"];
const priorityOptions = ["Low", "Medium", "High"];

function TaskList({ tasks, config, onTaskUpdated, onTaskDeleted }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [busyId, setBusyId] = useState(null);

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const updateTask = async (id) => {
    try {
      setBusyId(id);

      await API.put(
        `/tasks/${id}`,
        {
          ...editForm,
          title: editForm.title.trim(),
          dueDate: editForm.dueDate || null,
        },
        config
      );

      cancelEditing();
      await onTaskUpdated();
    } finally {
      setBusyId(null);
    }
  };

  const quickStatusUpdate = async (task, newStatus) => {
    try {
      setBusyId(task._id);
      await API.put(
        `/tasks/${task._id}`,
        { status: newStatus },
        config
      );
      await onTaskUpdated();
    } finally {
      setBusyId(null);
    }
  };

  const deleteTask = async (id) => {
    const shouldDelete = window.confirm("Delete this task?");

    if (!shouldDelete) return;

    try {
      setBusyId(id);
      await API.delete(`/tasks/${id}`, config);
      await onTaskDeleted();
    } finally {
      setBusyId(null);
    }
  };

  if (!tasks.length) {
    return <div className="empty-state">No tasks match your filters.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => {
        const isEditing = editingId === task._id;
        const isBusy = busyId === task._id;

        return (
          <article className="task-card" key={task._id}>
            {isEditing ? (
              <div className="edit-form">
                <input
                  className="control"
                  value={editForm.title}
                  onChange={(event) =>
                    setEditForm({ ...editForm, title: event.target.value })
                  }
                />

                <textarea
                  className="control textarea"
                  rows="3"
                  value={editForm.description}
                  onChange={(event) =>
                    setEditForm({ ...editForm, description: event.target.value })
                  }
                />

                <div className="form-row">
                  <select
                    className="control"
                    value={editForm.status}
                    onChange={(event) =>
                      setEditForm({ ...editForm, status: event.target.value })
                    }
                  >
                    {statusOptions.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>

                  <select
                    className="control"
                    value={editForm.priority}
                    onChange={(event) =>
                      setEditForm({ ...editForm, priority: event.target.value })
                    }
                  >
                    {priorityOptions.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  className="control"
                  type="date"
                  value={editForm.dueDate}
                  onChange={(event) =>
                    setEditForm({ ...editForm, dueDate: event.target.value })
                  }
                />

                <div className="task-actions">
                  <button
                    className="button button-primary"
                    onClick={() => updateTask(task._id)}
                    disabled={isBusy || !editForm.title.trim()}
                  >
                    {isBusy ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="button button-secondary"
                    onClick={cancelEditing}
                    disabled={isBusy}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="task-card-top">
                  <div>
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                  </div>
                  <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>

                <div className="task-meta">
                  <label>
                    Status
                    <select
                      className="status-control"
                      value={task.status}
                      disabled={isBusy}
                      onChange={(event) => quickStatusUpdate(task, event.target.value)}
                    >
                      {statusOptions.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>

                  <span>
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                  </span>
                </div>

                <div className="task-actions">
                  <button className="button button-secondary" onClick={() => startEditing(task)}>
                    Edit
                  </button>
                  <button className="button button-danger" onClick={() => deleteTask(task._id)} disabled={isBusy}>
                    {isBusy ? "Working..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default TaskList;
