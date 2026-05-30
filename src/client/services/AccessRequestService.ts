import apiClient from './ApiClient'
import { AccessRequest, Approval, RequestState, Priority, RiskLevel } from '../types'

class AccessRequestService {
  async getMyRequests(filter: string = 'all'): Promise<AccessRequest[]> {
    // Mock data for development
    const mockRequests: AccessRequest[] = [
      {
        id: '1',
        requestNumber: 'REQ0001',
        requesterId: 'user1',
        requesterName: 'John Doe',
        beneficiaryId: 'user1',
        beneficiaryName: 'John Doe',
        applicationId: 'app1',
        applicationName: 'GitHub Enterprise',
        accessTypeId: 'access1',
        accessTypeName: 'Developer Access',
        businessJustification: 'Need access to work on project repositories',
        state: RequestState.PENDING_APPROVAL,
        priority: Priority.HIGH,
        urgency: 'high' as any,
        riskLevel: RiskLevel.MEDIUM,
        requestedDurationDays: 365,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        requestNumber: 'REQ0002',
        requesterId: 'user1',
        requesterName: 'John Doe',
        beneficiaryId: 'user2',
        beneficiaryName: 'Jane Smith',
        applicationId: 'app2',
        applicationName: 'AWS Console',
        accessTypeId: 'access2',
        accessTypeName: 'Read-Only Access',
        businessJustification: 'Need to view production resources for troubleshooting',
        state: RequestState.APPROVED,
        priority: Priority.MEDIUM,
        urgency: 'medium' as any,
        riskLevel: RiskLevel.LOW,
        requestedDurationDays: 90,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ]

    if (filter === 'all') return mockRequests
    return mockRequests.filter((req) => req.state.toLowerCase().includes(filter.toLowerCase()))

    // Production code:
    // return apiClient.get<AccessRequest[]>('/requests', { filter })
  }

  async getRequestById(id: string): Promise<AccessRequest> {
    // Mock data
    return {
      id,
      requestNumber: 'REQ0001',
      requesterId: 'user1',
      requesterName: 'John Doe',
      beneficiaryId: 'user1',
      beneficiaryName: 'John Doe',
      applicationId: 'app1',
      applicationName: 'GitHub Enterprise',
      accessTypeId: 'access1',
      accessTypeName: 'Developer Access',
      businessJustification: 'Need access to work on project repositories',
      state: RequestState.PENDING_APPROVAL,
      priority: Priority.HIGH,
      urgency: 'high' as any,
      riskLevel: RiskLevel.MEDIUM,
      requestedDurationDays: 365,
      submittedAt: new Date(Date.now() - 3600000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    // Production code:
    // return apiClient.get<AccessRequest>(`/requests/${id}`)
  }

  async getRequestApprovals(requestId: string): Promise<Approval[]> {
    // Mock data
    return [
      {
        id: '1',
        requestId,
        approverId: 'mgr1',
        approverName: 'Manager One',
        approverType: 'manager' as any,
        state: 'approved' as any,
        comments: 'Approved for business needs',
        approvedAt: new Date(Date.now() - 1800000).toISOString(),
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: '2',
        requestId,
        approverId: 'owner1',
        approverName: 'Resource Owner',
        approverType: 'resource_owner' as any,
        state: 'pending' as any,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ]
    // Production code:
    // return apiClient.get<Approval[]>(`/requests/${requestId}/approvals`)
  }

  async createRequest(request: Partial<AccessRequest>): Promise<AccessRequest> {
    return apiClient.post<AccessRequest>('/requests', request)
  }

  async updateRequest(id: string, updates: Partial<AccessRequest>): Promise<AccessRequest> {
    return apiClient.patch<AccessRequest>(`/requests/${id}`, updates)
  }

  async cancelRequest(id: string): Promise<void> {
    return apiClient.post<void>(`/requests/${id}/cancel`, {})
  }
}

export default new AccessRequestService()
