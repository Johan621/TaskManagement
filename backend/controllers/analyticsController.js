const Task = require("../models/Task");

const getAnalytics = async (req, res) => {
  try {
    const total = await Task.countDocuments({
      user: req.user._id,
    });

    const completed = await Task.countDocuments({
      user: req.user._id,
      status: "Done",
    });

    const pending = total - completed;

    res.json({
      totalTasks: total,
      completedTasks: completed,
      pendingTasks: pending,
      completionRate:
        total === 0
          ? 0
          : ((completed / total) * 100).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};