import express from 'express'

const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'

import {getEventById,getEvents,addEvent} from '../controllers/eventController.js'

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
router.get('/',getEvents)

// @desc    Fetch single event
// @route   GET /api/event/:id
// @access  Public
router.get('/:id',getEventById)


router.route('/addEvent').post(authMiddleware,addEvent)


export default router