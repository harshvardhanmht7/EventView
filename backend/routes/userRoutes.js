import express from 'express'

const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'

import {registerUser, loginUser,getUserProfile, updateUserProfile} from '../controllers/userController.js'

// @desc    auth user and get token 
// @route   Post /api/users/login
// @access  Public
router.post('/',registerUser)

//router.route('/').post(registerUser)

router.post('/login',loginUser)

router.route('/profile').get(authMiddleware, getUserProfile).put(authMiddleware,updateUserProfile)



export default router 