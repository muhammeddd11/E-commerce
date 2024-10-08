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
    if (!products) {
      return res.status(404).json({
        status: "fail",
        message: "No Product(s) found",
      });
    }
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
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "No Product(s) found",
      });
    }
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
exports.updateProduct = async (req, res) => {
  try {
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: "Document not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Document has been successfully updated",
      doc,
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: "An error occurred",
      err,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const doc = await Product.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({
        status: "fail",
        message: "Document not found",
      });
    }

    res.status(204).json({
      status: "success",
      message: "Document has been deleted",
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: "An error occurred ",
    });
  }
};
