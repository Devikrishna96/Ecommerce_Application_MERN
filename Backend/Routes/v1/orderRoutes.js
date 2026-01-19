const express = require("express");
const orderRouter = express.Router();

const {
  addOrder,
  getOrderById,
  getUserOrders,
  updateOrderPaymentStatus,
} = require("../../Controllers/orderController");

const authUser = require("../../Middlewares/authUser");
const authAdmin = require("../../Middlewares/authAdmin");

// -------------------------
// Add Order (manual / COD)
// -------------------------
orderRouter.post("/add", authUser, addOrder);

// -------------------------
// Get Order by ID
// -------------------------


// -------------------------
// Get User-specific Orders
// -------------------------
orderRouter.get("/user-specific", authUser, getUserOrders);

// -------------------------
// Update Payment Status (after success page / Stripe webhook)
// -------------------------
orderRouter.put("/update-payment-status", authUser, updateOrderPaymentStatus);

// -------------------------
// Admin: View All Orders (if needed)
// -------------------------
orderRouter.get("/all-orders", authAdmin, async (req, res) => {
  const Order = require("../../Models/orderModel");
  try {
    const orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

orderRouter.get("/:id", authUser, getOrderById);
module.exports = orderRouter;
