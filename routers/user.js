const express = require("express");
const User = require("../models").user;
const { Router } = express;
//const bcrypt = require("bcrypt");

const router = new Router();

// router.get("/", (request, response) => response.send("Welcome to user!"));

router.get("/", async (req, res, next) => {
  try {
    console.log("Im getting all the users");
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
