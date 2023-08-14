import express from "express";
import { deleteOrder, getAllOrders, getMyOrders, placeOrder, updateOrder } from "../controllers/orderController.js";
import { isAuthenticated, isAuthorized } from "../middleware/auth.js";

//* routing

const router = express.Router();

//*  create product
router.post("/create-order",isAuthorized, placeOrder);

//* read product
router.get("/get-all-orders",isAuthorized, getAllOrders);

router.get("/get-my-orders",isAuthorized, getMyOrders);

// * update product
router.put("/order/:id",isAuthorized, updateOrder);

// * delete product
router.delete("/order/:id",isAuthorized, deleteOrder);

export default router;