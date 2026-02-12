const express = require("express");
const router = express.Router();
const auth =require("../middleware/auth")
const { Message, ConversationMember } = require("../models");

/**
 * SEND MESSAGE
 */
router.post("/",auth, async (req, res) => {
  try {
    const sender_id=req.user.id;
    const { conversation_id, content } = req.body;

    if (!conversation_id || !content) {
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
router.get("/:conversationId",auth, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId=req.user.id;
    const member = await ConversationMember.findOne({
      where: { conversation_id: conversationId,user_id: userId},
    });
    if (!member){
      return res.status(403).json({error:"Not a conversation member"});
    }
    const messages=await Message.findAll({
      where:{conversationId:conversationId},
      order:[["created_at","ASC"]]
    })
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
