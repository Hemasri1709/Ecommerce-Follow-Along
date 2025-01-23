const User = require('../models/userModel');

const signup = async (req, res) => {
    try{
    const { name, email, password, dateOfBirth,file } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(400).send("User already exists");
        return;   
    }   

    const newUser = new User({
        name,
        email,
        password,
        dateOfBirth,
        file
    });

    await newUser.save()
    res.status(201).send({data: newUser, message: 'User created successfully' });

    }catch (error) {
        res.status(500).send({ message: error.message });
        }
        
};
module.exports = {signup};



