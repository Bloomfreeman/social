const express = require("express");
const router = express.Router();
const sequelize = require("../db/sequelize");

router.post("/", async (req, res) => {
  await sequelize.query(
    "INSERT INTO likes (user_id, post_id) VALUES ($1, $2)",
    { bind: [req.body.user_id, req.body.post_id] }
  );
  res.json({ message: "Liked" });
});

router.delete("/", async (req, res) => {
  await sequelize.query(
    "DELETE FROM likes WHERE user_id=$1 AND post_id=$2",
    { bind: [req.body.user_id, req.body.post_id] }
  );
  res.json({ message: "Unliked" });
});

module.exports=router;
