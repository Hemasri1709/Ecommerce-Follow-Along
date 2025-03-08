const Cart = require("../models/cartModel");
const User = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.cart = cart._id;
        await user.save();

        res.status(200).json({ message: "Product added to cart successfully!" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "An error occurred while adding the product to the cart.", error: error.message });
    }
};

const getCartProducts = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart) {
            console.log("Cart not found for user:", userId); // Debugging line
            return res.status(404).json({ message: "Cart not found" });
        }

        console.log("Fetched cart products:", cart.products); // Debugging line
        res.status(200).json(cart.products);
    } catch (error) {
        console.error("Error fetching cart products:", error);
        res.status(500).json({ message: "An error occurred while fetching the cart products.", error: error.message });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            const updatedCart = await Cart.findOne({ user: userId }).populate("products.product");
            res.status(200).json(updatedCart.products);
        } else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ message: "An error occurred while updating the quantity.", error: error.message });
    }
};

module.exports = { addToCart, getCartProducts, updateQuantity };
