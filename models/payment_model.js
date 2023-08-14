import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

paymentSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
  });

export const Payment = mongoose.model("Payment",paymentSchema);
export default Payment;
