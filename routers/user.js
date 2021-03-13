const express = require("express");
const User = require("../models").user;
const Order = require("../models").order;
const bcrypt = require("bcrypt");
const { Router } = express;

const router = new Router();

// router.get("/", (request, response) => response.send("Welcome to user!"));

router.get("/", async (req, res, next) => {
  try {
    console.log("Im getting all the users");
    const users = await User.findAll({
      include: [Order],
    });
    res.send(users);
  } catch (e) {
    next(e);
  }
});

//Create a new user
// http POST :4000/users/signup email="andressa@machado.com" password="andreia" firstName="andreia" lastName="machado" address="cmourao"
router.post("/signup", async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      phone,
      isAdmin,
    } = req.body;

    if (!email || !password || !firstName || !lastName || !address) {
      res.status(400).send("Must provide more info");
    } else {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        firstName,
        lastName,
        address,
        phone,
        isAdmin,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
