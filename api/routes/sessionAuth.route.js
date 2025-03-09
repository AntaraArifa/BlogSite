import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const router = express.Router();

// Session Sign-Up
router.post("/session-signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // Automatically log in the user by creating a session
  req.session.userId = newUser._id;

  res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, email: newUser.email } });
});

// Session Login
router.post("/session-login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.userId = user._id;
  res.json({ message: "Logged in successfully", user: { id: user._id, email: user.email } });
});

// Session Logout
router.post("/session-logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// Get Profile (Protected Route)
router.get("/session-profile", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(req.session.userId).select("-password");
  res.json(user);
});

export default router;
