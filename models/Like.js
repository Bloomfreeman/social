module.exports=(sequelize,DataTypes)=>{
    return sequelize.define(
      "Like",
      {
        user_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        post_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
      }  
    );
};