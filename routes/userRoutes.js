const express = require('express')
const { registerUser, loginUser } = require('../controllers/userController')
const authMiddleware = require('../middleware/authUser')
const Route = express.Router()

Route.post('/register', registerUser)
Route.post('/login', authMiddleware, loginUser)


module.exports = Route