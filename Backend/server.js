import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import companyRoutes from "./routes/companyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cors from 'cors'

dotenv.config()

const app = express()
// Middleware
app.use(cors())
// MongoDB Connection
app.use(express.json());

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
// routes
app.use("/api/companies", companyRoutes);

app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})