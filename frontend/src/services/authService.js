import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 unauthorized - clear token and redirect
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // Don't redirect here - let components handle it
    }
    return Promise.reject(error)
  }
)

export const authService = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password })
    return response.data
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data.user
  },
}

export default api

