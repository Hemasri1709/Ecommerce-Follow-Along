const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user) {
            console.log("User not found")
            return res.status(400).json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            console.log("Invalid credentials")
            return res.status(400).json({message: "Invalid credentials"})
            
        }

        res.status(200).json({message: "User logged in successfully"})
        console.log(user)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

module.exports = login