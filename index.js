const express = require("express");
const { Router } = require("express");
const productRouter = require("./routers/product");
const userRouter = require("./routers/user");
const orderRouter = require("./routers/order");
const categoryRouter = require("./routers/category");
const authRouter = require("./routers/auth");
const adminRouter = require("./routers/admin");
const User = require("./models").user;
const port = 4000;
const app = express();
const cors = require("cors");

// Middlewares
const jsonParser = express.json();
app.use(jsonParser);
app.use(cors());

// Registering the router to the app
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/categories", categoryRouter);
app.use(authRouter);
app.use("/admin", adminRouter);

// Start server
app.listen(port);
console.log(`listen at the port ${port}`);
