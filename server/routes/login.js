const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Modal/user_table");

const router = express.Router();


// API route for user login
router.post("/", async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    req.session.user = {
      userId: user._id,
      userName: user.user_name,
      userRole: user.user_data.user_role, 
    };

    console.log("Login request received from %s",req.session.user ? req.session.user.userName : "Unknown User");

    res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("Error in user login route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
