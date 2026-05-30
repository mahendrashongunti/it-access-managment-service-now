import apiClient from './ApiClient'
import { AuditLog } from '../types'

class AuditService {
  async getAuditLogs(filter: {
    entityType?: string
    action?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<AuditLog[]> {
    // Mock data
    return [
      {
        id: '1',
        entityType: 'request',
        entityId: 'req1',
        action: 'create',
        userId: 'user1',
        userName: 'John Doe',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        ipAddress: '192.168.1.100',
      },
      {
        id: '2',
        entityType: 'approval',
        entityId: 'appr1',
        action: 'approve',
        userId: 'mgr1',
        userName: 'Manager One',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        ipAddress: '192.168.1.101',
      },
      {
        id: '3',
        entityType: 'assignment',
        entityId: 'assign1',
        action: 'create',
        userId: 'system',
        userName: 'System',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
      },
      {
        id: '4',
        entityType: 'request',
        entityId: 'req2',
        action: 'update',
        userId: 'user2',
        userName: 'Jane Smith',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        ipAddress: '192.168.1.102',
      },
      {
        id: '5',
        entityType: 'review',
        entityId: 'rev1',
        action: 'create',
        userId: 'admin',
        userName: 'Administrator',
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        ipAddress: '192.168.1.103',
      },
    ]
    // Production code:
    // return apiClient.get<AuditLog[]>('/audit/logs', filter)
  }

  async exportAuditLogs(filter: any): Promise<Blob> {
    return apiClient.get<Blob>('/audit/export', filter)
  }
}

export default new AuditService()
