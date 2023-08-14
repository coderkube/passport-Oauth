import mongoose from "mongoose";

// * product schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}); 

productSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// * product model
const Product = mongoose.model("Product", productSchema);
export default Product;
