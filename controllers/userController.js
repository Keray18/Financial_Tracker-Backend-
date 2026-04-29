const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const genToken = require('../utility/generateToken')


// Register
const registerUser = async (req, res) => {
    try {
        const { name, mail, password, confirmPassword } = req.body 
        if(password != confirmPassword) return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name: name,
            mail,
            password: hashedPassword
        })

        const token = genToken(user._id)

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                mail: user.mail
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: err.message
        })
    }
}

// Login
const loginUser = async (req, res) => {
    try {
        const { mail, password } = req.body 
        const user = await User.findOne({ mail })

        if(!user) return res.status(404).json({
            success: false,
            message: "User does not exist!"
        })

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched) return res.status(401).json({
            success: false,
            message: "Invalid Credentials!"
        })

        const token = genToken(user._id)

        res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            token,
            user: {
                id: user._id,
                name: user.name,
                mail: user.mail 
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}

