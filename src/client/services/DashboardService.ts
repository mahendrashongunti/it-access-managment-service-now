import apiClient from './ApiClient'
import { DashboardStats } from '../types'

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    // Mock data for development
    return {
      myRequests: {
        total: 15,
        pending: 3,
        approved: 10,
        rejected: 2,
      },
      myApprovals: {
        total: 8,
        pending: 5,
      },
      myAccess: {
        total: 12,
        expiringSoon: 2,
      },
      myReviews: {
        total: 4,
        pending: 2,
        overdue: 1,
      },
    }
    // Production code:
    // return apiClient.get<DashboardStats>('/dashboard/stats')
  }
}

export default new DashboardService()
