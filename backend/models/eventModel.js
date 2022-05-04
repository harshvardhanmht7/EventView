import mongoose from 'mongoose'

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   
    time: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model('Event', eventSchema)

export default Event