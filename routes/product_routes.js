import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";

//* routing

 const router = express.Router();

//*  create product
router.post("/create-pro", createProduct);

//* read product
router.get("/get-pro", getProducts);

// * update product
router.put("/product/:id", updateProduct);

// * delete product
router.delete("/product/:id", deleteProduct);

export default router;