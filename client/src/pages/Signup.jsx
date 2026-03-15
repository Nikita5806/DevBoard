import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await API.post('/auth/register', { name, email, password })
      login(res.data.user, res.data.token)
      navigate('/board')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">

      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Board</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">your job hunt. organized. ✨</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-black text-white mb-1">
            create account 🚀
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            join and start tracking fr fr 💅
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nikita Kanwar"
                className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition placeholder-gray-600"
                required
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@cool.com"
                className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition placeholder-gray-600"
                required
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition placeholder-gray-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-3 rounded-xl transition duration-200 disabled:opacity-50 text-lg tracking-tight mt-2"
            >
              {loading ? 'creating... ⏳' : "sign me up ✨"}
            </button>
          </form>

          <p className="text-gray-500 text-center mt-6 text-sm">
            already in the club?{' '}
            <Link to='/login' className="text-purple-400 font-bold hover:text-pink-400 transition">
              login here →
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Signup