const express = require("express");
const userRouter = require("./routes/userRouter"); // Make sure the path is correct
const app = express();
const cors = require("cors");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
// Mounting userRouter on the "/users" route
app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
// Catch-all route for undefined endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `${req.originalUrl} not found`,
  });
});

module.exports = app;
