import { useState } from "react";
import API from "../services/api";

const emptyForm = {
  title: "",
  description: "",
  status: "Todo",
  priority: "Medium",
  dueDate: "",
};

function TaskForm({ onTaskCreated, config }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await API.post(
        "/tasks",
        {
          ...form,
          title: form.title.trim(),
          dueDate: form.dueDate || null,
        },
        config
      );

      setForm(emptyForm);
      await onTaskCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create task");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="form-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">New item</p>
          <h2>Create Task</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <label>
          Title
          <input
            className="control"
            name="title"
            placeholder="e.g. Finish project documentation"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            className="control textarea"
            name="description"
            placeholder="Add a short description"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />
        </label>

        <div className="form-row">
          <label>
            Status
            <select className="control" name="status" value={form.status} onChange={handleChange}>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </label>

          <label>
            Priority
            <select className="control" name="priority" value={form.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>

        <label>
          Due Date
          <input
            className="control"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </label>

        {error && <div className="message error-message">{error}</div>}

        <button className="button button-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Task"}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
