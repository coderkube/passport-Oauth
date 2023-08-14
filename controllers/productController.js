import Product from "../models/product_model.js";
import ErrorHandler from "../utils/errorHandler.js";

//* All the Product API functions

export const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(201).json({
    success: true,
    data: products,
  });
};

export const createProduct = async (req, res, next) => {
  console.log("response", req.body);
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    data: product,
  });
};

export const updateProduct = async (req, res) => {
  let updateProduct = await Product.findById(req.params.id);
  if (!updateProduct) {
    return res.status(500).json({
      success: false,
      message: "product not found.",
    });
  }
  updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: updateProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const deleteProduct = await Product.findByIdAndRemove(req.params.id);
  try {
    if (!deleteProduct) {
      return res.status(500).json({
        success: false,
        message: "product not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product delete successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product.",
    });
  }
};
