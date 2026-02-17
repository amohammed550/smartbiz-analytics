import api from './authService'

export const feedbackService = {
  createFeedback: async (content) => {
    const response = await api.post('/feedback', { content })
    return response.data
  },

  getFeedback: async () => {
    const response = await api.get('/feedback')
    return response.data
  },

  getAnalytics: async () => {
    const response = await api.get('/feedback/analytics')
    return response.data
  },
}

