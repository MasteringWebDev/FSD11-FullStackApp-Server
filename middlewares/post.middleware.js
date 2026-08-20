import Post from '../models/post.model.js'

export const isPostAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if(!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        if(post.author != req.user._id) {
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