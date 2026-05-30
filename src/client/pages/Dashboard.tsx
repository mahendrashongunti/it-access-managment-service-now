import { useState, useEffect } from 'react'
import { StatCard } from '../components/Card'
import { Loading, ErrorMessage } from '../components/Common'
import { DashboardStats } from '../types'
import DashboardService from '../services/DashboardService'

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await DashboardService.getStats()
      setStats(data)
    } catch (err) {
      setError('Failed to load dashboard statistics')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading text="Loading dashboard..." />
  if (error) return <ErrorMessage message={error} onRetry={loadStats} />
  if (!stats) return null

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Requests"
          value={stats.myRequests.total}
          icon="📝"
          color="primary"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.myApprovals.pending}
          icon="⏳"
          color="warning"
        />
        <StatCard
          title="Active Access"
          value={stats.myAccess.total}
          icon="🔑"
          color="success"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.myReviews.pending}
          icon="🔍"
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                <span>Access request submitted</span>
                <span className="text-sm text-base-content/70">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                <span>Access approved</span>
                <span className="text-sm text-base-content/70">5 hours ago</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                <span>Review completed</span>
                <span className="text-sm text-base-content/70">1 day ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quick Actions</h2>
            <div className="space-y-2">
              <button className="btn btn-primary w-full justify-start">
                🆕 New Access Request
              </button>
              <button className="btn btn-outline w-full justify-start">
                📋 View My Requests
              </button>
              <button className="btn btn-outline w-full justify-start">
                ✅ Review Pending Approvals
              </button>
              <button className="btn btn-outline w-full justify-start">
                🔍 Start Access Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
