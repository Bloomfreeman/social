const express = require("express");
const sequelize = require("./db/sequelize");
const postRoutes = require("./routes/posts");
const commentRoutes= require("./routes/Comments");
const likeRoutes = require("./routes/likes");
const followRoutes = require("./routes/follows");
const conversationRoutes = require("./routes/conversations");
const messagesRoutes = require("./routes/messages");
const usersRoutes = require("./routes/user");

const app = express();
app.use(express.json());

// Test DB connection
sequelize.authenticate()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB error:", err));

app.use("/posts", postRoutes);
app.use("/users", usersRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/follows",followRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messagesRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
