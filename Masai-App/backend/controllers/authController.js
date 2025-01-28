const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ username, password, role });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

module.exports = { registerUser, authUser };
