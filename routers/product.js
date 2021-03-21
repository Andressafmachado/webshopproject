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

//GET a product by id
//OPEN AT THE BROWSER localhost:4000/product/id
router.get("/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).send("User not found");
    } else {
      res.send(product);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
