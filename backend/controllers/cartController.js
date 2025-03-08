const mongoose = require('mongoose');
const Cart = require('../models/Cart');

const addProductToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: mongoose.Types.ObjectId(userId) });

        if (!cart) {
            cart = new Cart({ userId: mongoose.Types.ObjectId(userId), products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Error adding product to cart' });
    }
};

const getCart = async (req, res) => {
    const { userId } = req.query;
    console.log('Fetching cart for user:', userId);

    try {
        const cart = await Cart.findOne({ userId: mongoose.Types.ObjectId(userId) }).populate('products.productId');
        if (!cart) {
            console.log('Cart not found for user:', userId);
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        console.error(error.stack); // Add this line to log the stack trace
        res.status(500).json({ error: 'Error fetching cart' });
    }
};

module.exports = { addProductToCart, getCart };
