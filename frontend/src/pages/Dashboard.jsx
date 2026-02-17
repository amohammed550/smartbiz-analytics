import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { feedbackService } from '../services/feedbackService'

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState([])
  const [analytics, setAnalytics] = useState({
    totalCount: 0,
    positiveCount: 0,
    negativeCount: 0,
    neutralCount: 0,
    recommendations: [],
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    content: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [feedbackRes, analyticsRes] = await Promise.all([
        feedbackService.getFeedback(),
        feedbackService.getAnalytics(),
      ])
      setFeedback(feedbackRes.data || [])
      setAnalytics(analyticsRes.data || analytics)
    } catch (error) {
      toast.error('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

      const handleChange = (e) => {
        const value = e.target.value;
        // Limit content length to 5000 characters
        if (e.target.name === 'content' && value.length > 5000) {
          toast.error('Feedback content cannot exceed 5000 characters')
          return;
        }
        setFormData({
          ...formData,
          [e.target.name]: value,
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
          const trimmedContent = formData.content.trim();
          
          if (!trimmedContent) {
            toast.error('Please enter feedback content')
            setSubmitting(false)
            return
          }

          if (trimmedContent.length < 10) {
            toast.error('Feedback must be at least 10 characters')
            setSubmitting(false)
            return
          }

          if (trimmedContent.length > 5000) {
            toast.error('Feedback content cannot exceed 5000 characters')
            setSubmitting(false)
            return
          }

          await feedbackService.createFeedback(trimmedContent)
          toast.success('Feedback analyzed successfully!')
          setFormData({ content: '' })
          loadData()
        } catch (error) {
          const errorMessage = error.response?.data?.message || 
                              error.message || 
                              'Failed to submit feedback. Please try again.';
          toast.error(errorMessage)
        } finally {
          setSubmitting(false)
        }
      }

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast.info('Logged out successfully')
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800'
      case 'negative':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '👍'
      case 'negative':
        return '👎'
      default:
        return '😐'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                SmartBiz Analytics
              </h1>
              <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              aria-label="Logout from your account"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? '...' : analytics.totalCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <span className="text-2xl">👍</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Positive</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? '...' : analytics.positiveCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <span className="text-2xl">👎</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Negative</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? '...' : analytics.negativeCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gray-100 rounded-md p-3">
                <span className="text-2xl">😐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Neutral</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {loading ? '...' : analytics.neutralCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Submit Customer Feedback
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Feedback Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows="6"
                  required
                  minLength={10}
                  maxLength={5000}
                  aria-label="Customer feedback content"
                  aria-required="true"
                  aria-describedby="content-help content-count"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter customer feedback here (minimum 10 characters)..."
                  value={formData.content}
                  onChange={handleChange}
                />
                <div className="mt-1 flex justify-between">
                  <p id="content-help" className="text-xs text-gray-500">
                    Minimum 10 characters required
                  </p>
                  <p id="content-count" className="text-xs text-gray-500" aria-live="polite">
                    {formData.content.length}/5000 characters
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting || formData.content.trim().length < 10}
                aria-label={submitting ? 'Analyzing feedback, please wait' : 'Submit feedback for analysis'}
                aria-busy={submitting}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Feedback'
                )}
              </button>
            </form>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              AI Recommendations
            </h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : analytics.recommendations && analytics.recommendations.length > 0 ? (
              <ul className="space-y-3">
                {analytics.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="flex items-start p-3 bg-blue-50 rounded-lg"
                  >
                    <span className="flex-shrink-0 text-blue-600 mr-3">
                      💡
                    </span>
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                Submit feedback to get AI-powered recommendations
              </p>
            )}
          </div>
        </div>

        {/* Feedback List */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Feedback
            </h2>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : feedback.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {feedback.map((item) => (
                <div key={item._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getSentimentColor(
                          item.sentiment
                        )}`}
                      >
                        {getSentimentIcon(item.sentiment)} {item.sentiment}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{item.content}</p>
                  {item.summary && (
                    <div className="bg-gray-50 rounded-md p-3 mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Summary:
                      </p>
                      <p className="text-sm text-gray-600">{item.summary}</p>
                    </div>
                  )}
                  {item.recommendations && item.recommendations.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Recommendations:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {item.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">No feedback submitted yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Start by submitting your first customer feedback above
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

