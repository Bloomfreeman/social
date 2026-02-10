module.exports = (sequelize, DataTypes) => {
  const User= sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.TEXT, allowNull: false, unique: false }
  }, {
    tableName: "users",
    timestamps: false
  });
  // User.associate = models =>{
  //   User.hasMany(models.Post, {foreignkey:"user_id"});
  // };
  return User
};
