import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: [3, 'Invalid name. Name must be at least 3 characters long.']
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  avatar: {
    type: String,
    default: 'https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D'
  }
})

const User = mongoose.model('User', userSchema)

export default User