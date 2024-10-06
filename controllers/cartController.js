const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemModel");
const stride = require("stride")(process.env.STRIDE_API_KEY); //pass the secret key to get stride object;
exports.addToCart = async (req, res) => {
  try {
    const cartItems = Promise.all(
      req.body.cartItems.map(async (item) => {
        let newItem = await CartItem.create({
          quantity: item.quantity,
          product: item.product,
        });
        return newItem._id;
      })
    );
    const cartItemIdsResolved = await cartItems;
    const totalPrices = await Promise.all(
      cartItemIdsResolved.map(async (cartItemId) => {
        const cartItem = await CartItem.findById(cartItemId).populate(
          "product",
          "price"
        );
        console.log(cartItem);
        const totalPrice = cartItem.product.price * cartItem.quantity;
        return totalPrice;
      })
    );
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    let cart = await Cart.create({
      cartItems: cartItemIdsResolved,
      shippingAddress: req.body.shippingAddress,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      phone: req.body.phone,
      country: req.body.country,
      user: req.body.user,
      totalPrice: totalPrice,
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
      err: err.message,
    });
  }
};
exports.getCarts = async (req, res) => {
  try {
    const cartsList = await Cart.find()
      .populate("user", "name")
      .sort({ date: -1 })
      .populate({ path: "cartItems", populate: "product" });
    if (!cartsList) {
      return res.status(404).json({
        status: "fail",
        message: "No carts found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "A carts have been retrieved",
      length: cartsList.length,
      cartsList,
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: "An error has been occurred",
      err: err.message,
    });
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("user", "name");
    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "No carts found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "A carts have been retrieved",
      length: cart.length,
      cart,
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: "An error has been occurred",
      err: err.message,
    });
  }
};
exports.updateCart = async (req, res) => {
  const doc = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  if (!doc) {
    return res.status(404).json({
      status: "fail",
      message: "No cart found",
    });
  }
  res.status(201).json({
    status: "success",
    message: "your cart has been updated",
    doc,
  });
};
exports.deleteCart = async (req, res) => {
  const doc = await Cart.findByIdAndDelete(req.params.id);
  if (!doc) {
    return res.status(404).json({
      status: "fail",
      message: "No cart found",
    });
  }

  res.status(204).json({
    status: "success",
    message: "Your cart has been deleted successfully",
  });
};
exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await Cart.aggregate([
      {
        $group: {
          _id: null, // Grouping by null means we are aggregating all documents together
          totalSales: { $sum: "$totalPrice" }, // Correctly referencing the totalPrice field in the Cart model
        },
      },
    ]);

    // Check if totalSales array has data
    if (!totalSales || totalSales.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No total sales found",
      });
    }

    // Send the total sales amount back
    res.status(200).json({
      status: "success",
      message: "Total sales retrieved successfully",
      totalSales: totalSales[0].totalSales, // Access the total sales sum from the array
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "An error has occurred",
      err: err.message,
    });
  }
};
exports.getCheckoutSession = async (req, res) => {
  //get currently cart
  const cart = await Cart.findById(req.params.cartID);
  // create checkout session
  const session = await stride.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/`,
    //customer_email: req.user.email
    client_reference_id: req.params.cartID,
  });
  //create session as response
  res.status(200).json({
    status: "success",
    message: "payment request created successfully ",
    session,
  });
};
