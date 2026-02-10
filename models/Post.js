module.exports=(sequelize,DataTypes)=>{
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
    },
    media_url:{
      type:DataTypes.TEXT
    },
    media_type:{
      type:DataTypes.STRING
    }
  },
  {
    tableName: "posts",     // exact DB table name
    timestamps: false       // because we use created_at manually
  }
);
// Post.associate = models => {
// Post.belongsTo(models.User, { foreignKey: "user_id" });
// Post.hasMany(models.Comment, { foreignKey: "post_id" });
// Post.hasMany(models.Like, { foreignKey: "post_id" });
// };

return Post;
};
