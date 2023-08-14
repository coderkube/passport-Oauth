import { asyncError } from "../middleware/error.js";
import Order from "../models/order_model.js";
import ErrorHandler from "../utils/errorHandler.js";

// //* All the Orders API functions

export const getAllOrders = async (req, res, next) => {
    const orders = await Order.find();
    res.status(201).json({
      success: true,
      data: orders,
    });
  };
  
  export const getMyOrders = async (req, res, next) => {
    const orders = await Order.find({
      user: req.user.user_id,
    }).populate("user","name");
    // .populate("user","name")
console.log(orders);
    res.status(201).json({
      success: true,
       data: orders,
    });
  };

export const placeOrder = asyncError(
  async (req, res, next) => {
    console.log("response", req.body);

    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingCharges,
      totalAmount
    } = req.body;

  const user = req.user.user_id;

  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    shippingCharges,
    taxPrice,
    totalAmount,
    user
  };

  const order = await Order.create(orderOptions);

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully via Cash On Delivery",
      data: order,
    });
  }
);
  

export const updateOrder = asyncError(async (req, res) => {
  let updateOrder = await Order.findById(req.params.id);
  if (!updateOrder) {
    return res.status(500).json({
      success: false,
      message: "order not found.",
    });
  }
  updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: updateOrder,
  });
});

export const deleteOrder = asyncError(async (req, res) => {
  const deleteOrder = await Order.findByIdAndRemove(req.params.id);
  try {
    if (!deleteOrder) {
      return res.status(500).json({
        success: false,
        message: "order not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order delete successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the order.",
    });
  }
});
