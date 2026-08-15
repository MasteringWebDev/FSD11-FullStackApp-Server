import User from '../models/user.model.js'

// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config()
// const { JWT_SECRET } = process.env

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')

    res.json({
      users
    })
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

    res.json({
      user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, username, email, avatar } = req.body

    await User.create({ name, username, email, avatar })

    res.status(201).json({
      message: 'User created successfully'
    })
  } catch (error) {
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

// export const signupUser = async (req, res) => {
//   try {
//     const { name, username, email, password } = req.body

//     const encryptedPassword = await bcrypt.hash(password, 10)

//     const newUser = await User.create({ name, username, email, password: encryptedPassword })

//     const { _id } = newUser
//     const token = jwt.sign({ _id, name, username }, JWT_SECRET, { expiresIn: 60 * 60 })

//     res.status(201).json({
//       message: 'User registered successfully',
//       token
//     })
//   } catch (error) {
//     if (error.name === 'MongoServerError' && error.code === 11000) {
//       const field = Object.keys(error.keyPattern)[0];
//       return res.status(400).json({
//         message: 'Invalid input',
//         errors: `A user with that ${field} already exists`
//       })
//     }

//     if(error.name == 'ValidationError') {
//       const errorMessages = Object.values(error.errors).map(err => err.message)
//       return res.status(400).json({
//         message: 'Invalid input',
//         errors: errorMessages
//       })
//     }
    
//     res.status(500).json({
//         message: 'Something went wrong'
//     })
//   }
// }

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     const user = await User.findOne({ email })
//     if(!user) {
//       return res.status(400).json({
//         message: 'Invalid credentials'
//       })
//     }

//     const pwdMatched = await bcrypt.compare(password, user.password)
//     if(!pwdMatched) {
//       return res.status(400).json({
//         message: 'Invalid credentials'
//       })
//     }

//     const { _id, name, username } = user
//     const token = jwt.sign({ _id, name, username }, JWT_SECRET, { expiresIn: 60 * 60 })
    
//     res.json({
//       message: `${username} logged in successfully!`,
//       token
//     })
//   } catch (error) {
//     res.status(500).json({
//         message: 'Something went wrong'
//     })
//   }
// }