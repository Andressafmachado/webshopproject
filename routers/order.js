const express = require("express");
const Order = require("../models").order;
const Product = require("../models").product;
const User = require("../models").user;
const { Router } = express;

const router = new Router();

//all orders
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

//order by id
router.get("/:orderId", async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const oneOrder = await Order.findByPk(orderId, {
      include: [Product, User],
    });
    if (!oneOrder) {
      res.status(404).send("User not found");
    } else {
      res.send(oneOrder);
    }
  } catch (e) {
    next(e);
  }
});

//Create a new order
// http POST :4000/orders status="confirmed"
router.post("/", async (req, res, next) => {
  try {
    const { status, userId } = req.body;

    if (!status || !userId) {
      res.status(400).send("Must provide more info");
    } else {
      const newOrder = await Order.create({
        status,
      });
      res.json(newOrder);
    }
  } catch (e) {
    next(e);
  }
});

//Update an order
//at terminal http PUT :4000/orders/1 name="Andreia"
router.put("/:orderId", async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const orderToUpdate = await Order.findByPk(orderId);
    if (!orderToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedOrder = await orderToUpdate.update(req.body);
      res.json(updatedOrder);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
