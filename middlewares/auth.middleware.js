import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET } = process.env

export const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.cookies
    if(!token) {
      return res.status(401).json({
        message: 'You are not logged in, please login first.'
      })
    }

    const user = jwt.verify(token, JWT_SECRET)
    req.user = user

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: 'You are not logged in, please login first.'
    })
  }
}

export const isAuthorized = (req, res, next) => {
  console.log('req.user._id:', req.user._id)
  console.log('req.params.id:', req.params.id)
  if(req.user._id != req.params.id) {
    return res.status(403).json({
      message: 'You are not authorized to perform this action'
    })
  }

  next()
}