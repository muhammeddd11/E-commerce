const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
router.route("/").post(cartController.addToCart).get(cartController.getCarts);
router
  .route("/:id")
  .get(cartController.getCart)
  .post(cartController.updateCart)
  .delete(cartController.deleteCart);
router.route("/totalSales").get(cartController.getTotalSales);
module.exports = router;
