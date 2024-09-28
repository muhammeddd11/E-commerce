const Cart = require("../models/cartModel");
const cartItem = require("../models/cartItemModel");
exports.addToCart = async (req, res) => {
  try {
    const cartItems = req.body.cartItems.map(async (item) => {
      let newItem = await cartItem.create({
        quantity: item.quantity,
        product: item.body,
      });
      return item._id;
    });
    let cart = await Cart.create({
      cartItems: req.body.cartItems,
      shipingAddress: req.body.shipingAddress,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      phone: req.body.phone,
      country: req.body.country,
      user: req.body.user,
    });
    res.status(200).json({
      status: "success",
      message: "A cart has been created successfully",
      cart,
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: "An error has been occurred",
      err,
    });
  }
};
