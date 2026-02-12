const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const { Conversation, ConversationMember } = require("../models");


/**
 * CREATE DM
 */
router.post("/dm",auth, async (req, res) => {
  try {
    const user1_id=req.user.id;
    const { user2_id } = req.body;

    if (!user2_id) {
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
router.post("/group",auth, async (req, res) => {
  try {
    const creator_id=req.user.id;
    const { name, members } = req.body;

    if (!name || !Array.isArray(members)) {
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
router.get("/my",auth, async (req, res) => {
  try {
    const userId = req.user.id;

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
