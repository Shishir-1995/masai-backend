const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

// Get tasks
const getTasks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 tasks per page if not provided

  const skip = (page - 1) * limit; // Skip the tasks for the previous pages

  // Fetch the tasks with pagination
  const tasks = await Task.find({ user: req.user.id })
    .skip(skip) // Skip the number of tasks for the previous pages
    .limit(limit); // Limit the number of tasks per page

  // Count total number of tasks for pagination info
  const totalTasks = await Task.countDocuments({ user: req.user.id });

  // Calculate total pages
  const totalPages = Math.ceil(totalTasks / limit);

  res.json({
    tasks,
    currentPage: page,
    totalPages,
    totalTasks,
  });
});

// Create task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    dueDate,
    user: req.user.id,
  });

  res.status(201).json(task);
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedTask);
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);

  console.log(task);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Task.findByIdAndDelete(taskId);
  res.json({ message: "Task removed" });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
