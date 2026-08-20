import { Router } from 'express'
import { fetchComments, createComment, updateComment, deleteComment } from '../controllers/comment.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
import { isCommentAuthor, isCommentAuthorOrPostAuthor } from '../middlewares/comment.middleware.js'

const router = Router()

router.get('/', fetchComments)
router.post('/', isAuthenticated, createComment)
router.patch('/:id', isAuthenticated, isCommentAuthor, updateComment)
router.delete('/:id', isAuthenticated, isCommentAuthorOrPostAuthor, deleteComment)

export default router