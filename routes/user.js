const express = require("express");
const router = express.Router();
// const User = require("../models/User");
// const { where } = require("sequelize");
const {User}=require("../models")

//Create user
router.post("/", async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password_hash: req.body.password
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//get by id
router.get("/id/:userId", async(req,res)=>{
    const {userId} = req.params;
    if (!userId) return res.status(404).json({ error: "User not found" });

    const user = await User.findAll({
      where:{id:userId},
      order:[["created_at", "ASC"]]
    });

    res.json(user);
});

//get by name
router.get("/name/:userName", async(req,res)=>{
    const {userName} = req.params;
    if (!userName) return res.status(404).json({ error: "User not found" });

    const user = await User.findAll({
      where:{username:userName},
      order:[["created_at", "ASC"]]
    });

    res.json(user);
});

//get all users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
