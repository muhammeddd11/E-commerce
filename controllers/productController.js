const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      summary: req.body.summary,
      coverImage: req.body.coverImage,
      productCode: req.body.productCode,
      stock: req.body.stock,
    });
    res.status(200).json({
      status: "success",
      message: "A new product have been created",
      newProduct,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "An error occurred",
      err,
    });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      status: "success",
      message: "products have been retrieved successfully",
      length: products.length,
      products,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "An error occurred",
      err,
    });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });

    res.status(200).json({
      status: "success",
      message: "A product has been retrieved successfully",
      product,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "An error occurred",
      err,
    });
  }
};
