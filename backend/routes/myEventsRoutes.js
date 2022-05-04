import express from 'express'

const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'

import {myEvents} from '../controllers/eventController.js'

router.route('/').get(authMiddleware,myEvents)

export default router