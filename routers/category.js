const express = require("express");
const Category = require("../models").category;
const Product = require("../models").product;
const { Router } = express;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("Im getting all the categories");
    const category = await Category.findAll({
      include: [Product],
    });
    res.send(category);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
