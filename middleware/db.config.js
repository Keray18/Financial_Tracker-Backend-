const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch((err) => console.log('MongoDB connection error:', err))
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1) // Exit the process with failure
    }
}

module.exports = connectDB