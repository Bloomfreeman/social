const express = require("express");
const router = express.Router();
// const Message = require("../models/Message")
// const ConversationMember = require("../models/ConversationMember")
const { Message, ConversationMember } = require("../models");

/**
 * SEND MESSAGE
 */
router.post("/", async (req, res) => {
  try {
    const { conversation_id, sender_id, content } = req.body;

    if (!conversation_id || !sender_id || !content) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // ensure sender is part of the conversation
    const member = await ConversationMember.findOne({
      where: { conversation_id, user_id: sender_id }
    });

    if (!member) {
      return res.status(403).json({ error: "Not a conversation member" });
    }

    const msg = await Message.create({
      conversation_id,
      sender_id,
      content
    });

    res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET MESSAGES IN CONVERSATION
 */
router.get("/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.findAll({
      where: { conversation_id: conversationId },
      order: [["created_at", "ASC"]]
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
