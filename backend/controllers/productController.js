const Product = require("../models/productModel");
const path = require("path");
const fs = require("fs");

const addProduct = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);

        const { name, description, price, email } = req.body;
        let images = [];

        if (req.files && req.files.images) {
            const uploadPath = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }

            if (Array.isArray(req.files.images)) {
                images = req.files.images.map(file => {
                    const filePath = path.join(uploadPath, file.name);
                    file.mv(filePath);
                    console.log("File uploaded to:", filePath); // Add this line
                    return file.name;
                });
            } else {
                const filePath = path.join(uploadPath, req.files.images.name);
                req.files.images.mv(filePath);
                console.log("File uploaded to:", filePath); // Add this line
                images = [req.files.images.name];
            }
        }

        const newProduct = new Product({
            name,
            description,
            price,
            images,
            email,
        });

        await newProduct.save();

        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "An error occurred while adding the product.", error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "An error occurred while fetching products.", error: error.message });
    }
};

const getProductsByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        console.log("Fetching products for email:", email); // Debugging line
        const products = await Product.find({ email });
        console.log("Fetched products:", products); // Debugging line
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "An error occurred while fetching products.", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "An error occurred while fetching the product.", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, email } = req.body;
        let images = req.body.images;

        if (req.files && req.files.images) {
            const uploadPath = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }

            if (Array.isArray(req.files.images)) {
                images = req.files.images.map(file => {
                    const filePath = path.join(uploadPath, file.name);
                    file.mv(filePath);
                    return file.name;
                });
            } else {
                const filePath = path.join(uploadPath, req.files.images.name);
                req.files.images.mv(filePath);
                images = [req.files.images.name];
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, images, email },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "An error occurred while updating the product.", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "An error occurred while deleting the product.", error: error.message });
    }
};

module.exports = { addProduct, getAllProducts, getProductsByEmail, getProductById, updateProduct, deleteProduct };

