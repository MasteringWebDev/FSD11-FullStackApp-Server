import { Router } from 'express'
import { fetchUsers, fetchUser, signupUser, loginUser, logoutUser, getCurrentUser, updateUser, deleteUser } from '../controllers/user.controller.js'
import { isAuthenticated, isAuthorized } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', fetchUsers)
router.get('/me', isAuthenticated, getCurrentUser)
router.get('/:id', fetchUser)

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

// Protected routes (Authentication + Authorization required)
router.patch('/:id', isAuthenticated, isAuthorized, updateUser)
router.delete('/:id', isAuthenticated, isAuthorized, deleteUser)

export default router