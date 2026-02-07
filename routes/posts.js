const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create post
router.post("/", async (req, res) => {
  try {
    const post = await Post.create({
      user_id: req.body.user_id,
      content: req.body.content
    });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

//Repost
router.post("/:id/repost", async (req, res) => {
  const original = await Post.findByPk(req.params.id);
  if (!original) return res.status(404).json({ error: "Post not found" });

  const repost = await Post.create({
    user_id: req.body.user_id,
    repost_of: original.id,
    content: original.content
  });

  res.json(repost);
});


//Delete post
router.delete("/:id", async (req, res) => {
  const deleted = await Post.destroy({
    where: { id: req.params.id }
  });

  if (!deleted) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ message: "Post deleted" });
});


module.exports = router;

