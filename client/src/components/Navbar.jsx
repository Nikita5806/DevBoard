import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5 px-6 py-4 relative z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <h1 className="text-xl font-black text-white tracking-tight">
          Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Board</span>
        </h1>

        <div className="flex items-center gap-6">
          <Link to='/board' className="text-gray-400 hover:text-white transition text-sm font-semibold">
            Board
          </Link>
          <Link to='/dashboard' className="text-gray-400 hover:text-white transition text-sm font-semibold">
            Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">
              hey, {user?.name} 👋
            </span>
            <button
              onClick={handleLogout}
              className="bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 px-4 py-2 rounded-xl text-sm font-bold transition border border-white/10"
            >
              logout
            </button>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar