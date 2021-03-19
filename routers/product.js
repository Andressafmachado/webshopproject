const express = require("express");
const Product = require("../models").product;
const Category = require("../models").category;

const { Router } = express;
const router = new Router();

// router.get("/", (request, response) => response.send("Welcome to products!"));

router.get("/", async (req, res, next) => {
  try {
    // res.header("Access-Control-Allow-Origin", "*");
    console.log("Im getting all the products");
    const products = await Product.findAll({
      include: [Category],
    });
    res.send(products);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
