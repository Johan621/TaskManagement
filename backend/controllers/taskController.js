const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      status: status || "Todo",
      priority: priority || "Medium",
      dueDate: dueDate || null,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tasks with search, filters, sorting and pagination
const getTasks = async (req, res) => {
  try {
    const { search, status, priority, sort = "createdAt", order = "desc" } = req.query;
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 6, 1), 50);

    const query = { user: req.user._id };

    if (status && status !== "All") {
      query.status = status;
    }

    if (priority && priority !== "All") {
      query.priority = priority;
    }

    if (search?.trim()) {
      query.title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const allowedSortFields = ["createdAt", "dueDate", "priority", "title"];
    const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    const total = await Task.countDocuments(query);
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    const tasks = await Task.find(query)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status, priority, dueDate } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate || null;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};