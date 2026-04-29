const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const genToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
    )
}

module.exports = genToken 