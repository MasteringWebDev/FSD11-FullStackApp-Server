import { Router } from 'express'
import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from '../controllers/user.controller.js'
// import { isAuthenticated } from '../middlewares/auth.middleware.js'
// import { isAccountOwner } from '../middlewares/user.middleware.js'

const router = Router()

router.get('/', fetchUsers)
router.get('/:id', fetchUser)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

// router.post('/signup', signupUser)
// router.post('/login', loginUser)
// router.patch('/:id', isAuthenticated, isAccountOwner, updateUser)
// router.delete('/:id', isAuthenticated, isAccountOwner, deleteUser)

export default router