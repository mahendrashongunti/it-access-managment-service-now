import apiClient from './ApiClient'
import { AccessReview } from '../types'

class ReviewService {
  async getMyReviews(): Promise<AccessReview[]> {
    // Mock data
    return [
      {
        id: '1',
        reviewNumber: 'REV0001',
        reviewType: 'quarterly' as any,
        ownerId: 'currentUser',
        ownerName: 'Current User',
        applicationId: 'app1',
        state: 'in_progress' as any,
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
        itemsTotal: 25,
        itemsReviewed: 15,
        itemsApproved: 12,
        itemsRevoked: 3,
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
      {
        id: '2',
        reviewNumber: 'REV0002',
        reviewType: 'manager' as any,
        ownerId: 'currentUser',
        ownerName: 'Current User',
        departmentId: 'dept1',
        state: 'draft' as any,
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString(),
        itemsTotal: 50,
        itemsReviewed: 0,
        itemsApproved: 0,
        itemsRevoked: 0,
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ]
    // Production code:
    // return apiClient.get<AccessReview[]>('/reviews/my-reviews')
  }

  async getReviewItems(reviewId: string): Promise<any[]> {
    return apiClient.get<any[]>(`/reviews/${reviewId}/items`)
  }

  async submitReviewDecision(
    reviewId: string,
    itemId: string,
    decision: string,
    comments?: string
  ): Promise<void> {
    return apiClient.post<void>(`/reviews/${reviewId}/items/${itemId}/decision`, {
      decision,
      comments,
    })
  }
}

export default new ReviewService()
