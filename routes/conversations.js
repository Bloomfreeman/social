const express = require("express");
const router = express.Router();
// const Conversation=require("../models/Conversation")
// const ConversationMember=require("../models/ConversationMember")
const { Conversation, ConversationMember } = require("../models");


/**
 * CREATE DM
 */
router.post("/dm", async (req, res) => {
  try {
    const { user1_id, user2_id } = req.body;

    if (!user1_id || !user2_id) {
      return res.status(400).json({ error: "Both user IDs required" });
    }

    const convo = await Conversation.create({
      is_group: false,
      created_by: user1_id
    });

    await ConversationMember.bulkCreate([
      { conversation_id: convo.id, user_id: user1_id },
      { conversation_id: convo.id, user_id: user2_id }
    ]);

    res.status(201).json(convo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * CREATE GROUP CHAT
 */
router.post("/group", async (req, res) => {
  try {
    const { name, creator_id, members } = req.body;

    if (!name || !creator_id || !Array.isArray(members)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const convo = await Conversation.create({
      is_group: true,
      name,
      created_by: creator_id
    });

    const allMembers = [...new Set([creator_id, ...members])];

    await ConversationMember.bulkCreate(
      allMembers.map(user_id => ({
        conversation_id: convo.id,
        user_id
      }))
    );

    res.status(201).json(convo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET USER CONVERSATIONS
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const convos = await Conversation.findAll({
      include: {
        model: ConversationMember,
        where: { user_id: userId }
      }
    });

    res.json(convos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
