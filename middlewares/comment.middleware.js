import Comment from '../models/comment.model.js'
import Post from '../models/post.model.js'

export const isCommentAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const comment = await Comment.findById(id)
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        if (comment.author != req.user._id) {
            return res.status(403).json({
                message: 'You are not authorized to perform this action'
            })
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const isCommentAuthorOrPostAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const comment = await Comment.findById(id)
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        const post = await Post.findById(comment.post)

        const isCommentAuthor = comment.author == req.user._id
        const isPostAuthor = post.author == req.user._id

        if (!isCommentAuthor && !isPostAuthor) {
            return res.status(403).json({
                message: 'You are not authorized to perform this action'
            })
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}