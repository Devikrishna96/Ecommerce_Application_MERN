const { addOrder, deleteOrder, viewAllOrders, getUserOrders, totalSales } = require("../../Controllers/orderController");
const authAdmin = require("../../Middlewares/authAdmin");
const authUser = require("../../Middlewares/authUser");

const orderRouter = require("express").Router();

orderRouter.post("/add", authUser, addOrder);
orderRouter.delete("/delete/:orderId", authAdmin, deleteOrder);
orderRouter.get("/all-orders",authAdmin, viewAllOrders);
orderRouter.get("/user-specific", authUser, getUserOrders);
orderRouter.get("/total-sales",authAdmin, totalSales);


//orderRouter.put('/order-status/:orderId/', authAdmin, updateOrderStatus);

module.exports = orderRouter;
