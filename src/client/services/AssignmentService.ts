import apiClient from './ApiClient'
import { Assignment } from '../types'

class AssignmentService {
  async getMyAccess(): Promise<Assignment[]> {
    // Mock data
    return [
      {
        id: '1',
        userId: 'currentUser',
        userName: 'Current User',
        applicationId: 'app1',
        applicationName: 'GitHub Enterprise',
        accessTypeId: 'access1',
        accessTypeName: 'Developer Access',
        requestId: 'req1',
        grantedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        expiresAt: new Date(Date.now() + 335 * 86400000).toISOString(),
        state: 'active' as any,
      },
      {
        id: '2',
        userId: 'currentUser',
        userName: 'Current User',
        applicationId: 'app2',
        applicationName: 'AWS Console',
        accessTypeId: 'access2',
        accessTypeName: 'Read-Only Access',
        requestId: 'req2',
        grantedAt: new Date(Date.now() - 60 * 86400000).toISOString(),
        expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
        state: 'active' as any,
      },
      {
        id: '3',
        userId: 'currentUser',
        userName: 'Current User',
        applicationId: 'app3',
        applicationName: 'Salesforce',
        accessTypeId: 'access3',
        accessTypeName: 'Standard User',
        requestId: 'req3',
        grantedAt: new Date(Date.now() - 90 * 86400000).toISOString(),
        state: 'active' as any,
      },
    ]
    // Production code:
    // return apiClient.get<Assignment[]>('/assignments/my-access')
  }

  async extendAccess(assignmentId: string, days: number): Promise<void> {
    return apiClient.post<void>(`/assignments/${assignmentId}/extend`, { days })
  }

  async revokeAccess(assignmentId: string, reason: string): Promise<void> {
    return apiClient.post<void>(`/assignments/${assignmentId}/revoke`, { reason })
  }
}

export default new AssignmentService()
