const express = require('express')
const connectDB = require('./middleware/db.config')
const user = require('./routes/userRoutes')
const transaction = require('./routes/transactionRoutes')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()


const port = process.env.PORT || 3000

const app = express()
connectDB()

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))

// middleware
app.use(express.json())


// Routes
app.use('/api', user)
app.use('/api', transaction)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})