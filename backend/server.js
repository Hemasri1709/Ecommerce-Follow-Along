const express = require("express")
const app = express()
const connectDB = require("./configurations/db")
const router = require("./routes/userRoute")


app.use(express.json())

app.get("/", (req, res) => {
    res.send("API is running")
})
app.use("/api/users", router)

connectDB()

app.listen(7000, () => {
    console.log("Server is listening on port 8000")
})
