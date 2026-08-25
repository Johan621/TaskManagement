import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Analytics from "../components/Analytics";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const initialAnalytics = {
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  completionRate: 0,
};

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit: 6,
        search,
        status,
        priority,
        sort,
        order,
      };

      const res = await API.get("/tasks", { ...config, params });
      setTasks(res.data.tasks);
      setPagination(res.data.pagination);
    } catch (err) {
      if (err.response?.status === 401) {
        handleUnauthorized();
        return;
      }

      setError(err.response?.data?.message || "Could not load tasks");
    } finally {
      setLoading(false);
    }
  }, [page, search, status, priority, sort, order, token, handleUnauthorized]);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await API.get("/analytics", config);
      setAnalytics(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        handleUnauthorized();
      }
    }
  }, [token, handleUnauthorized]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchTasks();
    fetchAnalytics();
  }, [token, navigate, fetchTasks, fetchAnalytics]);

  const handleTaskCreated = async () => {
    setPage(1);
    await fetchTasks();
    await fetchAnalytics();
  };

  const handleTaskUpdated = async () => {
    await fetchTasks();
    await fetchAnalytics();
  };

  const handleTaskDeleted = async () => {
    if (tasks.length === 1 && page > 1) {
      setPage((current) => current - 1);
      return;
    }

    await fetchTasks();
    await fetchAnalytics();
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setSort("createdAt");
    setOrder("desc");
    setPage(1);
  };

  return (
    <div className="app-shell">
      <Navbar />

      <main className="dashboard-page">
        <section className="page-heading">
          <div>
            <p className="eyebrow">Task workspace</p>
            <h1>Task Dashboard</h1>
            <p className="muted-text">
              Create, organize and track your work in one place.
            </p>
          </div>
        </section>

        <Analytics data={analytics} />

        <section className="dashboard-grid">
          <TaskForm onTaskCreated={handleTaskCreated} config={config} />

          <div className="task-section">
            <div className="section-header">
              <div>
                <p className="eyebrow">Your tasks</p>
                <h2>Task List</h2>
              </div>
              <span className="task-count">{pagination.total} total</span>
            </div>

            <div className="filters-card">
              <input
                className="control"
                placeholder="Search by title"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />

              <select
                className="control"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
              >
                <option value="All">All status</option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <select
                className="control"
                value={priority}
                onChange={(event) => {
                  setPriority(event.target.value);
                  setPage(1);
                }}
              >
                <option value="All">All priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select
                className="control"
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
              >
                <option value="createdAt">Created date</option>
                <option value="dueDate">Due date</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>

              <select
                className="control"
                value={order}
                onChange={(event) => {
                  setOrder(event.target.value);
                  setPage(1);
                }}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>

              <button className="button button-secondary" onClick={clearFilters}>
                Clear
              </button>
            </div>

            {error && <div className="message error-message">{error}</div>}

            {loading ? (
              <div className="empty-state">Loading tasks...</div>
            ) : (
              <TaskList
                tasks={tasks}
                config={config}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            )}

            {!loading && pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  className="button button-secondary"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  className="button button-secondary"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
