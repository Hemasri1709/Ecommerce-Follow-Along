const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://vimlabhatt97:KVSs75@cluster0.q8t0m.mongodb.net/sujal-ecommerce")
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB", error.message)
        process.exit(1)
    }
}

module.exports = connectDB