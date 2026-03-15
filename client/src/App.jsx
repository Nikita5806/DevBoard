import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Board from './pages/Board'
import Dashboard from './pages/Dashboard'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to='/login' />
}

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/board' element={
        <ProtectedRoute>
          <Board />
        </ProtectedRoute>
      } />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/' element={<Navigate to='/login' />} />
    </Routes>
  )
}

export default App