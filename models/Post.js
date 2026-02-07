const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATE
    },
    repost_of: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: "posts",     // exact DB table name
    timestamps: false       // because we use created_at manually
  }
);

module.exports = Post;
