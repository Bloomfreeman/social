const express = require("express");
const router = express.Router();
const sequelize = require("../db/sequelize");
const auth=require("../middleware/auth");

router.post("/",auth, async (req, res) => {
  await sequelize.query(
    "INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)",
    { bind: [req.user.id, req.body.following_id] }
  );
  res.json({ message: "Followed" });
});

router.delete("/",auth, async (req, res) => {
  await sequelize.query(
    "DELETE FROM follows WHERE follower_id=$1 AND following_id=$2",
    { bind: [req.user.id, req.body.following_id] }
  );
  res.json({ message: "Unfollowed" });
});

module.exports=router;