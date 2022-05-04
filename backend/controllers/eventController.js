
import asyncHandler from 'express-async-handler'

import Event from '../models/eventModel.js'

// @desc    Fetch all Events
// @route   GET /api/events
// @access  Public

  const getEvents= asyncHandler(async (req, res) => {
    const events = await Event.find({})

    res.json(events)
  })


// @desc    Fetch single event
// @route   GET /api/events/:id
// @access  Public

const getEventById=  asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
   

    if (event) {
      res.json(event)
    } else {
      
      res.status(404)
      throw new Error('Event not found')
    }
  })




  const addEvent=asyncHandler(async(req,res)=>{

  const {name,description,time,place} =req.body
    const id=req.user._id
  if(name&&description&&time&&place){

    const event = await Event.create({
      user:id,
      name,
      description,
      time,
      place
    })
    if(event){

      res.json({
        user:id,
        name,
        description,
        time,
        place
      })

    }
   
  }
  else{
    res.status(401)
    throw new Error('Please fill all details !')
  }

  })



export {
    getEventById,
    getEvents,
    addEvent
}