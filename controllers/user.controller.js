import User from '../models/user.model.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const { JWT_SECRET } = process.env
const JWT_EXPIRATION = 60*60

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')

    res.json({ users })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const fetchUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password')

    if(!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json({ user })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const signupUser = async (req, res) => {
  try {
    const { name, username, email, password, avatar } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ name, username, email, password: encryptedPassword, avatar })

    const { _id } = newUser
    const token = jwt.sign({ _id, name, username, avatar }, JWT_SECRET, { expiresIn: JWT_EXPIRATION })

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: JWT_EXPIRATION * 1000
    })
    res.status(201).json({
      message: `@${username} registered successfully!`
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'MongoServerError' && error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: 'Invalid input',
        errors: `A user with that ${field} already exists`
      })
    }

    if(error.name == 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        message: 'Invalid input',
        errors: errorMessages
      })
    }
    
    res.status(500).json({
        message: 'Something went wrong'
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if(!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      })
    }

    const pwdMatched = await bcrypt.compare(password, user.password)
    if(!pwdMatched) {
      return res.status(400).json({
        message: 'Invalid credentials'
      })
    }

    const { _id, name, username, avatar } = user
    const token = jwt.sign({ _id, name, username, avatar }, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: JWT_EXPIRATION * 1000
    })
    res.json({
      message: `@${username} logged in successfully!`
    })
  } catch (error) {
    res.status(500).json({
        message: 'Something went wrong'
    })
  }
}

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token')

    res.json({
      message: 'You have successfully logged out!',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const getCurrentUser = async (req, res) => {
  res.json({
    user: req.user,
  })
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, avatar } = req.body
    await User.findByIdAndUpdate(id, { name, avatar })
    res.json({
      message: 'User details updated'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.json({
      message: 'User deleted',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}