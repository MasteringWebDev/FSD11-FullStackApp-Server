import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/user.routes.js'

const { PORT, MONGODB_URL } = process.env

const app = express()

app.use(cors({
  origin: 'http://localhost:5174'
}))
app.use(express.urlencoded())
app.use(express.json())
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({
    app: 'Full Stack App',
    now: new Date().toLocaleString()
  })
})

await mongoose.connect(MONGODB_URL)
console.log('Database connection established ✅')

app.listen(PORT, () => {
  console.log(`FullStackApp server is running on http://localhost:${PORT}`)
})