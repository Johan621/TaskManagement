import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", config);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics", config);
      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      await API.post(
        "/tasks",
        {
          title,
          description,
        },
        config
      );

      setTitle("");
      setDescription("");

      fetchTasks();
      fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, config);

      fetchTasks();
      fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchAnalytics();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Dashboard</h1>

      <h2>Analytics</h2>

      <p>Total Tasks: {analytics.totalTasks}</p>
      <p>Completed Tasks: {analytics.completedTasks}</p>
      <p>Pending Tasks: {analytics.pendingTasks}</p>
      <p>Completion Rate: {analytics.completionRate}%</p>

      <hr />

      <h2>Create Task</h2>

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createTask}>
        Add Task
      </button>

      <hr />

      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <button
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;