const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sequelize } = require("../models");

const JWT_SECRET = "super_secret_key"; // move to .env later

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const users = await sequelize.query(
    `SELECT * FROM users WHERE username = :username LIMIT 1`,
    {
      replacements: { username },
      type: sequelize.QueryTypes.SELECT
    }
  );

  if (users.length === 0) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = users[0];

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;
