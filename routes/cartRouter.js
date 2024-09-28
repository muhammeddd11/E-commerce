const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
router.use("/").post(cartController.addToCart);

module.exports = router;
