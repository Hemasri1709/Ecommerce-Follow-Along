const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const signUp = async (req, res) => {
    try {
    const {name, email, password} = req.body
    const user = await User.findOne({email})
    if (user) {
       return res.status(400).send("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name, 
        email,
        password: hashedPassword

    })

    await newUser.save()
    res.status(201).json({data: newUser, msg: "User created successfully"})
    console.log(newUser)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = signUp