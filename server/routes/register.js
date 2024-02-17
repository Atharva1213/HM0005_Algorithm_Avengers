const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../Modal/user_table");

const router = express.Router();

// Middleware to check for unique email
const checkUniqueEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ error: 'Email already exists' });
    }

    next();
  } catch (error) {
    console.error('Error in checkUniqueEmail middleware:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware to check for unique username
const checkUniqueUsername = async (req, res, next) => {
  try {
    const { user_name } = req.body;
    const existingUser = await User.findOne({ user_name });

    if (existingUser) {
      return res.status(401).json({ error: 'Username already exists' });
    }

    next();
  } catch (error) {
    console.error('Error in checkUniqueUsername middleware:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// API route for user registration
router.post("/", checkUniqueUsername, checkUniqueEmail, async (req, res) => {
  try {
    const { user_name, email, password, user_data } = req.body;
    const lastUser = await User.findOne().sort({ user_id: -1 }).exec();
    const newUser_id = lastUser ? lastUser.user_id + 1 : 1;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      user_id: newUser_id,
      user_name,
      email,
      password: hashedPassword,
      user_data,
    });

    await newUser.save();
    res.json({ message: "User Added Successfully" });
  } catch (error) {
    console.error('Error in user registration route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
