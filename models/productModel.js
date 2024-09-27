const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "A product must have a category"],
    trim: true,
    maxLength: 15,
  },
  summary: {
    type: String,
    required: [true, "Must have a summary"],
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    select: false,
  },
  price: {
    type: Number,
    required: [true, "Must have a price"],
  },
  images: [String],
  coverImage: {
    type: String,
    requird: [true, "Must have a cover image"],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    max: [5, "Rate should be less than or equal 5"],
    min: [1, "Rate should be more than or equal 1"],
  },
  productCode: {
    type: String,
    unique: true,
    required: [true, "Must have a product code"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the stock of the quantity"],
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
