const express = require("express");
const Category = require("../models").category;
const Product = require("../models").product;
const { Router } = express;

const router = new Router();

router.get("/:categoryId", async (req, res, next) => {
  try {
    console.log("I'm in the category page");

    const categoryId = parseInt(req.params.categoryId);
    const category = await Category.findByPk(categoryId, {
      include: [Product],
    });
    if (!category) {
      res.status(404).send("category not found");
    } else {
      res.send(category);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
