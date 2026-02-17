import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getMe()
          if (userData) {
            setUser(userData)
          } else {
            // Invalid user data
            localStorage.removeItem('token')
            setToken(null)
          }
        } catch (error) {
          // Token invalid or expired
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [token])

  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('token', authToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  )
}

