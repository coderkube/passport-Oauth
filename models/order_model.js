import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        hNo: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },

    orderItems: {
        cheeseBurger: {
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
        vegCheeseBurger: {
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
         grillCheeseBurger: {
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD",
    },
    paymentInfo: {
        type: mongoose.Schema.ObjectId,
        ref: "Payment",
    },
    paidAt: Date,
    itemsPrice: {
        type: Number,
        default: 0,
    },
    shippingCharges: {
        type: Number,
        default: 0,
    },
    taxPrice: {
        type: Number,
        default: 0,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        enum: ["Preparing", "Shipped", "Delivered"],
        default: "Preparing",
    },
    deliverAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
      },
});

orderSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
  });

export const Order = mongoose.model("Order",orderSchema);
export default Order;
