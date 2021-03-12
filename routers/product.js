const express = require("express");
const Product = require("../models").product;
const { Router } = express;

const router = new Router();

// router.get("/", (request, response) => response.send("Welcome to products!"));

router.get("/", async (req, res, next) => {
  try {
    console.log("Im getting all the products");
    const products = await Product.findAll();
    res.send(products);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
