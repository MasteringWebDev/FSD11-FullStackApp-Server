import Post from '../models/post.model.js'
import User from '../models/user.model.js'

export const fetchPosts = async (req, res) => {
  try {
    const { userId } = req.query

    const query = {}
    if(userId) {
      query.author = userId
    }

    const posts = await Post.find(query).populate('author', 'name username avatar')

    res.json({ posts })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const fetchPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id).populate('author', 'name username avatar')

    res.json({ post })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body
    const { user } = req

    await Post.create({ content, image, author: user._id })
    res.json({
      message: 'Post created successfully'
    })
  } catch (error) {
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

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { content, image } = req.body
    await Post.findByIdAndUpdate(id, { content, image })
    res.json({
      message: 'Post updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    await Post.findByIdAndDelete(id)
    res.json({
      message: 'Post deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}