// job ka data structure he like kis type k card hoge ui me kya kya data exist krega

const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  notes: {
    type: String,
    default: ''
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)