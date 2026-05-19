import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ MongoDB Connected Successfully')
})
.catch((err) => {
    console.log('❌ MongoDB Connection Error')
    console.log(err)
})

// Routes
app.get('/', (req, res) => {
    res.send('Server Running...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})