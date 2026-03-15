import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/api'

const Dashboard = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

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

  // Stats calculation
  const total = jobs.length
  const applied = jobs.filter(j => j.status === 'Applied').length
  const interviewing = jobs.filter(j => j.status === 'Interviewing').length
  const offers = jobs.filter(j => j.status === 'Offer').length
  const rejected = jobs.filter(j => j.status === 'Rejected').length
  const responseRate = total > 0 ? Math.round(((interviewing + offers) / total) * 100) : 0

  const stats = [
    {
      label: 'total applied',
      value: total,
      emoji: '📨',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400'
    },
    {
      label: 'interviewing',
      value: interviewing,
      emoji: '🎯',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400'
    },
    {
      label: 'offers received',
      value: offers,
      emoji: '🎉',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400'
    },
    {
      label: 'rejected',
      value: rejected,
      emoji: '😔',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400'
    },
    {
      label: 'response rate',
      value: `${responseRate}%`,
      emoji: '📊',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      text: 'text-pink-400'
    },
    {
      label: 'still waiting',
      value: applied,
      emoji: '⏳',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl font-bold animate-pulse">loading stats... 📊</p>
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
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight">
            your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">stats</span> 📊
          </h1>
          <p className="text-gray-400 mt-1">here's how your job hunt is going fr fr</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${stat.bg} border ${stat.border} rounded-2xl p-6 backdrop-blur`}
            >
              <div className="text-3xl mb-3">{stat.emoji}</div>
              <p className={`text-5xl font-black ${stat.text} mb-2`}>{stat.value}</p>
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Progress Bar Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-black text-xl mb-6">application breakdown 🎯</h3>

          {[
            { label: 'Applied', value: applied, total, color: 'bg-blue-500' },
            { label: 'Interviewing', value: interviewing, total, color: 'bg-yellow-500' },
            { label: 'Offer', value: offers, total, color: 'bg-green-500' },
            { label: 'Rejected', value: rejected, total, color: 'bg-red-500' },
          ].map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 text-sm font-semibold">{item.label}</span>
                <span className="text-gray-400 text-sm">{item.value} / {item.total}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: item.total > 0 ? `${(item.value / item.total) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivation Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6">
          <h3 className="text-white font-black text-xl mb-2">
            {offers > 0 ? '🎉 you got an offer!' :
             interviewing > 0 ? '🔥 you are in interviews!' :
             total > 0 ? '💪 keep applying!' :
             '🚀 start your journey!'}
          </h3>
          <p className="text-gray-400">
            {offers > 0 ? 'Congratulations! All that hard work paid off 🎊' :
             interviewing > 0 ? `${interviewing} company is interested in you. Go crush those interviews!` :
             total > 0 ? `You've applied to ${total} companies. Response rate is ${responseRate}%. Keep going!` :
             'Add your first job application on the Board page and start tracking!'}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard