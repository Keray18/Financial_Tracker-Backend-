const express = require('express')
const { registerUser, loginUser } = require('../controllers/userController')
const authMiddleware = require('../middleware/authUser')
const Router = express.Router()

Router.post('/register', registerUser)
Router.post('/login', authMiddleware, loginUser)


module.exports = Router