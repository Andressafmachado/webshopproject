const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");
// const authMiddleware = require("../auth/middleware");

const router = new Router();

//http :4000/login email='novo@gmail.com' password=vanessa
router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    console.log("email test:", email);
    console.log("password test:", password);
    const user = await User.findOne({ where: { email } });
    // CHECK YOURSELF response.send(user);
    console.log("password test:", password);
    console.log("user.password test:", user.password);

    const passwordCorrect = bcrypt.compareSync(password, user.password);

    if (!passwordCorrect) {
      return response.status(400).send("Wrong password");
    }

    const data = { userId: user.id };
    const jwt = toJWT(data);

    return response.send({ jwt });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
