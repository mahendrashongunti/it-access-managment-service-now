import apiClient from './ApiClient'
import { Approval, AccessRequest } from '../types'

class ApprovalService {
  async getPendingApprovals(): Promise<Array<Approval & { request: AccessRequest }>> {
    // Mock data
    return [
      {
        id: '1',
        requestId: 'req1',
        approverId: 'currentUser',
        approverName: 'Current User',
        approverType: 'manager' as any,
        state: 'pending' as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        request: {
          id: 'req1',
          requestNumber: 'REQ0003',
          requesterId: 'user3',
          requesterName: 'Bob Johnson',
          beneficiaryId: 'user3',
          beneficiaryName: 'Bob Johnson',
          applicationId: 'app3',
          applicationName: 'Jira',
          accessTypeId: 'access3',
          accessTypeName: 'Project Admin',
          businessJustification: 'Need to manage project boards and user permissions',
          state: 'pending_approval' as any,
          priority: 'high' as any,
          urgency: 'high' as any,
          riskLevel: 'high' as any,
          requestedDurationDays: 180,
          submittedAt: new Date(Date.now() - 7200000).toISOString(),
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          updatedAt: new Date(Date.now() - 7200000).toISOString(),
        },
      },
    ]
    // Production code:
    // return apiClient.get<Array<Approval & { request: AccessRequest }>>('/approvals/pending')
  }

  async approveRequest(approvalId: string, comments: string): Promise<void> {
    return apiClient.post<void>(`/approvals/${approvalId}/approve`, { comments })
  }

  async rejectRequest(approvalId: string, comments: string): Promise<void> {
    return apiClient.post<void>(`/approvals/${approvalId}/reject`, { comments })
  }
}

export default new ApprovalService()
