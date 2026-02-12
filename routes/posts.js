const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { Post, User,Comment,Like,sequelize } = require("../models");
const auth=require("../middleware/auth");

router.post("/",auth, upload.single("media"), async (req, res) => {
  try {
    const user_id = req.user.id;
    const { content } = req.body;

    let media_url = null;
    let media_type = null;

    if (req.file) {
      media_url = `/uploads/posts/${req.file.filename}`;
      media_type = req.file.mimetype.startsWith("image")
        ? "image"
        : "video";
    }

    const post = await Post.create({
      user_id,
      content,
      media_url,
      media_type
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//get all
router.get("/", async (req, res) => {
  try {
    const posts = await sequelize.query(
  `SELECT 
     p.*,
     u.username,
     (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS "likeCount",
     (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS "commentCount"
   FROM posts p
   JOIN users u ON u.id = p.user_id
   ORDER BY p.created_at DESC`,
  { type: sequelize.QueryTypes.SELECT }
);

res.json(posts);


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//get post by id
router.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const posts = await sequelize.query(
      `SELECT 
         p.id,
         p.user_id,
         p.content,
         p.media_url,
         p.media_type,
         p.created_at,
         u.username,
         COUNT(DISTINCT l.user_id) AS "likeCount",
         COUNT(DISTINCT c.user_id) AS "commentCount"
       FROM posts p
       JOIN users u ON u.id = p.user_id
       LEFT JOIN likes l ON l.post_id = p.id
       LEFT JOIN comments c ON c.post_id = p.id
       WHERE p.id = :postId
       GROUP BY p.id, u.id
       LIMIT 1`,
      {
        replacements: { postId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (posts.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(posts[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//get by user id
router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

     const posts = await sequelize.query(
      `SELECT 
         p.id,
         p.user_id,
         p.content,
         p.media_url,
         p.media_type,
         p.created_at,
         u.username,
         COUNT(DISTINCT l.user_id) AS "likeCount",
         COUNT(DISTINCT c.user_id) AS "commentCount"
       FROM posts p
       JOIN users u ON u.id = p.user_id
       LEFT JOIN likes l ON l.post_id = p.id
       LEFT JOIN comments c ON c.post_id = p.id
       WHERE p.user_id = :userId
       GROUP BY p.id, u.id
       ORDER BY p.created_at DESC`,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (posts.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/", async (req, res) => {
  await sequelize.query(
    "DELETE FROM posts WHERE id=$1",
    { bind: [req.body.id] }
  );
  res.json({ message: "post deleted" });
});

module.exports = router;
