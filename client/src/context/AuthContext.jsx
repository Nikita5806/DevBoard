import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// What this does:

// AuthContext → global state for auth
//              available to ALL components

// user       → currently logged in user
//              null if not logged in

// login()    → saves token + user to localStorage
//              updates user state

// logout()   → removes token + user
//              sets user to null

// useAuth()  → custom hook
//              any component can call useAuth()
//              to get user, login, logout