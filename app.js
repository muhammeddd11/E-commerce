const express = require("express");
const userRouter = require("./routes/userRouter"); // Make sure the path is correct
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Mounting userRouter on the "/users" route
app.use("/users", userRouter);

// Catch-all route for undefined endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `${req.originalUrl} not found`,
  });
});

module.exports = app;
