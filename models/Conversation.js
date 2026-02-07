module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Conversation",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      is_group: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "conversations",
      timestamps: false
    }
  );
};
