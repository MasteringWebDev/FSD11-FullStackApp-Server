import Comment from '../models/comment.model.js'
import Post from '../models/post.model.js'
import User from '../models/user.model.js'

export const fetchComments = async (req, res) => {
  try {
    const { postId } = req.query

    if(!postId) {
      return res.status(400).json({
        message: 'Please provide a postId as query parameter'
      })
    }

    const comments = await Comment.find({ post: postId }).select('content author').populate('author', 'name username avatar')

    res.json({ comments })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export const createComment = async (req, res) => {
  try {
    const { content, post } = req.body
    const { user } = req

    const existingPost = await Post.findById(post)
    if(!existingPost) {
      return res.status(404).json({
        message: 'Post not found'
      })
    }

    await Comment.create({ content, author: user._id, post })
    res.json({
      message: 'Comment added successfully'
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

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params
    const { content } = req.body

    await Comment.findByIdAndUpdate(id, { content })

    res.json({
      message: `Comment updated successfully`
    })
  } catch (error) {
    res.status(500).json({
        message: 'Something went wrong'
    })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params

    await Comment.findByIdAndDelete(id)

    res.json({
      message: `Comment deleted successfully`
    })
  } catch (error) {
    res.status(500).json({
        message: 'Something went wrong'
    })
  }
}