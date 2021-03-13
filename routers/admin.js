const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");
// const authMiddleware = require("../auth/middleware");
const router = new Router();

// router.get("/", (request, response) => response.send("Welcome to admin area!"));

//http :4000/secret Authorization:"Bearer JWThere"
router.get("/", async (request, response, next) => {
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

    const user = await User.findByPk(userId);
    if (!user) {
      return response.status(400).send("You are not a user.");
    }

    console.log("user test:", user);

    const message = `Welcome to the secret area ${user.firstName}`;
    response.send(message);
  } catch (error) {
    console.log(error);

    response.send(400);
  }
});

//Create a new user
// http POST :4000/users email="andressa@machado.com" password="andreia" firstName="andreia" lastName="machado" address="cmourao"
router.post("/", async (req, res, next) => {
  try {
    const { name, price, imageUrl, description } = req.body;

    if (!name || !price) {
      res.status(400).send("Must provide more info");
    } else {
      const newProduct = await User.create({
        name,
        price,
        imageUrl,
        description,
      });
      res.json(newProduct);
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
