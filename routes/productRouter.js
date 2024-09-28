const express = require("express");
const productcontroller = require("../controllers/productController");

const router = express.Router();
router
  .route("/")
  .get(productcontroller.getProducts)
  .post(productcontroller.addProduct);
router
  .route("/:id")
  .get(productcontroller.getProduct)
  .post(productcontroller.updateProduct)
  .delete(productcontroller.deleteProduct);

module.exports = router;
