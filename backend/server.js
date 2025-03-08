const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();
const connectDB = require("./configurations/db");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

connectDB().then(() => {
    app.listen(4000, () => {
        console.log("Server is listening on port 4000" );
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
});