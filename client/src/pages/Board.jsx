import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import Navbar from '../components/Navbar'
import API from '../utils/api'

const COLUMNS = ['Applied', 'Interviewing', 'Offer', 'Rejected']

const COLUMN_STYLES = {
  Applied: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    badge: 'bg-blue-500/20 text-blue-400',
    dot: 'bg-blue-400'
  },
  Interviewing: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    badge: 'bg-yellow-500/20 text-yellow-400',
    dot: 'bg-yellow-400'
  },
  Offer: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    badge: 'bg-green-500/20 text-green-400',
    dot: 'bg-green-400'
  },
  Rejected: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    badge: 'bg-red-500/20 text-red-400',
    dot: 'bg-red-400'
  }
}

const Board = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    company: '', role: '', status: 'Applied', notes: ''
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs')
      setJobs(res.data.jobs)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddJob = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/jobs', form)
      setJobs([...jobs, res.data.job])
      setForm({ company: '', role: '', status: 'Applied', notes: '' })
      setShowForm(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`)
      setJobs(jobs.filter(job => job._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    const newStatus = destination.droppableId

    setJobs(jobs.map(job =>
      job._id === draggableId ? { ...job, status: newStatus } : job
    ))

    try {
      await API.put(`/jobs/${draggableId}`, { status: newStatus })
    } catch (err) {
      console.log(err)
    }
  }

  const getJobsByStatus = (status) =>
    jobs.filter(job => job.status === status)

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl font-bold animate-pulse">loading your board... ✨</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">

      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
      </div>

      <Navbar />

      <div className="relative max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">board</span> 🎯
            </h1>
            <p className="text-gray-400 mt-1">{jobs.length} applications tracked</p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black px-6 py-3 rounded-xl transition text-sm"
          >
            + add job ✨
          </button>
        </div>

        {/* Add Job Form */}
        {showForm && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">
            <h3 className="text-white font-black text-xl mb-4">new application 📝</h3>
            <form onSubmit={handleAddJob} className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Google"
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 transition placeholder-gray-600"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Role</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Frontend Developer"
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 transition placeholder-gray-600"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 transition"
                >
                  {COLUMNS.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">Notes</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Found on LinkedIn..."
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 transition placeholder-gray-600"
                />
              </div>

              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black px-8 py-3 rounded-xl transition"
                >
                  add it ✨
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-white/5 text-gray-400 font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-4 gap-4">
            {COLUMNS.map(column => (
              <div key={column} className={`${COLUMN_STYLES[column].bg} border ${COLUMN_STYLES[column].border} rounded-2xl p-4`}>

                {/* Column Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${COLUMN_STYLES[column].dot}`}></div>
                    <h3 className="text-white font-black text-sm">{column}</h3>
                  </div>
                  <span className={`${COLUMN_STYLES[column].badge} text-xs font-bold px-2 py-1 rounded-full`}>
                    {getJobsByStatus(column).length}
                  </span>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={column}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[200px] space-y-3 rounded-xl transition ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}
                    >
                      {getJobsByStatus(column).map((job, index) => (
                        <Draggable key={job._id} draggableId={job._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 cursor-grab transition ${snapshot.isDragging ? 'shadow-2xl scale-105 border-purple-500/50' : 'hover:border-white/20'}`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="text-white font-black text-sm">{job.company}</p>
                                  <p className="text-gray-400 text-xs mt-1">{job.role}</p>
                                  {job.notes && (
                                    <p className="text-gray-600 text-xs mt-2 italic">"{job.notes}"</p>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleDelete(job._id)}
                                  className="text-gray-600 hover:text-red-400 transition text-xs"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Board