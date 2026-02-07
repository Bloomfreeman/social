module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Message",
    {
      conversation_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: "messages",
      timestamps: false
    }
  );
};
