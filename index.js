import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'

const { PORT, MONGODB_URL, CLIENT_ORIGIN } = process.env

const app = express()

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true
}))
app.use(cookieParser())
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

/*
  # Token Storage Strategies
    1. Local Storage: Store the token in the browser's local storage. This is simple but vulnerable to XSS (Cross site scripting) attacks.
    2. Cookies: Store the token in an HTTP-only cookie. This is more secure against XSS attacks. JS cannot steal the token from an HTTP-only cookie.

  # Cookies
    - Setup to send and receive cookies from the server to the client and vice versa.
      1. Server
        - Add credentials: true to the CORS configuration
      2. Client
        - Add withCredentials: true to the axios request
    - To set/clear cookies:
      - res.cookie('token', token): Set the cookie
      - res.clearCookie('token'): Clear the cookie
    - To access cookies:
      - Use 'cookie-parser' middleware in the server
        - app.use(cookieParser())
        - req.cookies: Read the token from the request cookies
*/
