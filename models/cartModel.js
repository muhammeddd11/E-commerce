const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItem",
      required: true,
    },
  ],
  shipingAddress: {
    type: String,
    required: true,
  },
  shippingAddress2: String,
  city: {
    type: String,
    required: true,
  },
  zip: {
    typr: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
cartSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
cartSchema.set("toJSON", {
  virtuals: true,
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
