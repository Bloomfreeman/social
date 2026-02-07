module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ConversationMember",
    {
      conversation_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "conversation_members",
      timestamps: false
    }
  );
};
