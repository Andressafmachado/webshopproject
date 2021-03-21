const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const Order = require("../models").order;
const Product = require("../models").product;
const bcrypt = require("bcrypt");
const authMiddleware = require("../auth/middleware");

const router = new Router();

//http :4000/users/login email='novo@gmail.com' password=vanessa
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

// //access the login user
// router.get("/me", authMiddleware, (req, res) => {
//   console.log(req.user);
//   const user = req.user.get({ plain: true });

//   delete user.password;
//   res.send(user);
// });

//access the login user
router.get("/me", authMiddleware, async (req, res) => {
  console.log(req.user);

  const user = req.user.get({ plain: true });
  delete user.password;
  const { id } = user;

  try {
    const userwithorders = await User.findByPk(id, {
      include: [Order],
    });
    if (!userwithorders) {
      res.status(404).send("User not found");
    } else {
      res.send(userwithorders);
      delete userwithorders.password;
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
