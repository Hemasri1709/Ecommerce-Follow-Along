const express = require("express");
const { placeOrder, getUserOrders, cancelOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/place-order", placeOrder);
router.get("/user-orders/:email", getUserOrders); // Add endpoint to get user orders
router.post("/cancel-order", cancelOrder); // Add endpoint to cancel order

module.exports = router;
