const { PaymentFunction } = require("../../Controllers/paymentController");
const authUser = require("../../Middlewares/authUser");

const paymentRouter = require("express").Router();

paymentRouter.post("/", authUser, PaymentFunction);



module.exports = paymentRouter;
