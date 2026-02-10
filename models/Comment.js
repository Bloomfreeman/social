module.exports=(sequelize,DataTypes)=>{
const Comment = sequelize.define("Comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  post_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  content: DataTypes.TEXT,
  created_at: DataTypes.DATE
}, {
  tableName: "comments",
  timestamps: false
});
return Comment;
};
