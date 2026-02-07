const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const User = require("./User")(sequelize, Sequelize.DataTypes);
const Conversation = require("./Conversation")(sequelize, Sequelize.DataTypes);
const ConversationMember = require("./ConversationMember")(sequelize, Sequelize.DataTypes);
const Message = require("./Message")(sequelize, Sequelize.DataTypes);

/* ASSOCIATIONS */
Conversation.hasMany(ConversationMember, { foreignKey: "conversation_id" });
ConversationMember.belongsTo(Conversation, { foreignKey: "conversation_id" });

Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

User.hasMany(ConversationMember, { foreignKey: "user_id" });
ConversationMember.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  sequelize,
  User,
  Conversation,
  ConversationMember,
  Message
};
