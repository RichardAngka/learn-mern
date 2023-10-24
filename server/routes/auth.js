const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function isValidPassword(password, storedHash) {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash === storedHash;
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || isValidPassword(password, user.password)) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "secret");

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();

    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
