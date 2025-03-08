const express = require("express");
const { addToCart, getCartProducts, updateQuantity } = require("../controllers/cartController");
const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCartProducts);
router.post("/update-quantity", updateQuantity);

module.exports = router;
