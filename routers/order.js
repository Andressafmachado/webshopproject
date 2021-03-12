const express = require("express");
const Order = require("../models").order;
const Product = require("../models").product;
const User = require("../models").user;
const { Router } = express;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("Im getting all the orders");
    const order = await Order.findAll({
      include: [Product, User],
    });
    res.send(order);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
