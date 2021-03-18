const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const Product = require("../models").product;
const bcrypt = require("bcrypt");
// const authMiddleware = require("../auth/middleware");
const router = new Router();

// router.get("/", (request, response) => response.send("Welcome to admin area!"));

//http :4000/admin Authorization:"Bearer JWThere" +
// add new product
router.post("/", async (request, response, next) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response
        .status(400)
        .send("You must include an authorization header");
    }

    const parts = authorization.split(" ");
    const bearer = parts[0] === "Bearer";

    if (!bearer) {
      return response.status(400).send("You must be the bearer");
    }

    const hasJwt = parts[1] && parts[1].length;
    if (!hasJwt) {
      return response.status(400).send("You must include a JWT");
    }

    const data = toData(parts[1]);
    const { userId } = data;
    const { userIsAdmin } = data;

    // if (userIsAdmin === false) {
    //   return response.status(400).send("You are not Admin");
    // }

    const user = await User.findByPk(userId);
    if (!user) {
      return response.status(400).send("You are not a user.");
    }

    console.log("user test:", user);

    const message = `Welcome to the secret area ${user.firstName}`;

    const { name, price, imageUrl, description } = request.body;

    if (!name || !price) {
      response.status(400).send("Must provide more info");
    } else {
      const newProduct = await Product.create({
        name,
        price,
        imageUrl,
        description,
      });
      response.json(newProduct);
    }

    // response.send(message);
  } catch (error) {
    console.log(error);

    next(error);
  }
});

module.exports = router;

//http :4000/admin Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxNTU5MzQzMywiZXhwIjoxNjE1NjAwNjMzfQ.Y2riMAKMSeNx6qOg4qyW48RtWYOHLg4Ql9P3sYTGe7c" name="newprodc" price=400
