const express = require("express");
const User = require("../models").user;
// const Order = require("../models").order;
// const Product = require("../models").product;
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

    if (!email || !password) {
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

//GET an user by id
//OPEN AT THE BROWSER localhost:4000/user/id
router.get("/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [Order],
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
