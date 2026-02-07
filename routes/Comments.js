const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  const comment = await Comment.create(req.body);
  res.json(comment);
});

router.get("/post/:post_id", async (req, res) => {
  const comments = await Comment.findAll({
    where: { post_id: req.params.post_id }
  });
  res.json(comments);
});
module.exports = router;