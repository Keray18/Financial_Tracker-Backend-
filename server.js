const express = require('express')
const connectDB = require('./middleware/db.config')
const user = require('./routes/userRoutes')


const port = process.env.PORT || 3000

const app = express()
connectDB()

// middleware
app.use(express.json())


// Routes
app.use('/api', user)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})