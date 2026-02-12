const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");
const {sequelize}=require("../models");

router.post("/posts/:id/comments", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    await sequelize.query(
      `INSERT INTO comments (post_id, user_id, content, created_at)
       VALUES (:postId, :userId, :content, NOW())`,
      {
        replacements: { postId, userId, content }
      }
    );

    res.json({ message: "Comment added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;

    const comments = await sequelize.query(
      `
      SELECT
        c.id,
        c.content,
        c.created_at,
        u.id AS user_id,
        u.username
      FROM comments c
      JOIN users u ON u.id = c.user_id
      WHERE c.post_id = :postId
      ORDER BY c.created_at ASC
      `,
      {
        replacements: { postId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/comments/:id", auth, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    const result = await sequelize.query(
      `
      DELETE FROM comments
      WHERE id = :commentId AND user_id = :userId
      `,
      {
        replacements: { commentId, userId }
      }
    );

    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;