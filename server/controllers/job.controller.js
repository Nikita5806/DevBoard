const Job = require('../models/job.js')

// ADD JOB
const addJob = async (req, res) => {
  try {
    const { company, role, status, notes, appliedDate } = req.body

    const job = await Job.create({
      userId: req.user.id,
      company,
      role,
      status,
      notes,
      appliedDate
    })

    res.status(201).json({
      message: 'Job added successfully',
      job
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// GET ALL JOBS
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id })

    res.status(200).json({ jobs })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// UPDATE JOB
const { company, role, status, notes, appliedDate } = req.body

const job = await Job.findOneAndUpdate(
  { _id: req.params.id, userId: req.user.id },
  { company, role, status, notes, appliedDate },
  { new: true }
)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.status(200).json({
      message: 'Job updated successfully',
      job
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.status(200).json({ message: 'Job deleted successfully' })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { addJob, getJobs, updateJob, deleteJob }