const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://guthulahemasri410:Hemasri1709@cluster0.tfekj.mongodb.net/Honey-Ecommerce")
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB", error.message)
        process.exit(1)
    }
}

module.exports = connectDB