import apiClient from './ApiClient'
import { Application } from '../types'

class CatalogService {
  async getApplications(): Promise<Application[]> {
    // Mock data
    return [
      {
        id: '1',
        name: 'GitHub Enterprise',
        description: 'Version control and collaboration platform for development teams',
        category: 'Development',
        owner: 'Engineering Manager',
        riskLevel: 'medium' as any,
        autoProvision: false,
        requiresApproval: true,
        documentationUrl: 'https://docs.github.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'AWS Console',
        description: 'Amazon Web Services cloud infrastructure management',
        category: 'Cloud Services',
        owner: 'Cloud Operations',
        riskLevel: 'high' as any,
        autoProvision: false,
        requiresApproval: true,
        documentationUrl: 'https://aws.amazon.com/documentation',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Jira',
        description: 'Project management and issue tracking tool',
        category: 'Project Management',
        owner: 'PMO',
        riskLevel: 'low' as any,
        autoProvision: true,
        requiresApproval: false,
        documentationUrl: 'https://support.atlassian.com/jira',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Salesforce',
        description: 'Customer relationship management (CRM) platform',
        category: 'Sales & Marketing',
        owner: 'Sales Operations',
        riskLevel: 'medium' as any,
        autoProvision: false,
        requiresApproval: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'SAP',
        description: 'Enterprise resource planning (ERP) system',
        category: 'Finance',
        owner: 'Finance Director',
        riskLevel: 'critical' as any,
        autoProvision: false,
        requiresApproval: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'Confluence',
        description: 'Team collaboration and documentation wiki',
        category: 'Documentation',
        owner: 'Knowledge Management',
        riskLevel: 'low' as any,
        autoProvision: true,
        requiresApproval: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
    // Production code:
    // return apiClient.get<Application[]>('/catalog/applications')
  }

  async getApplicationById(id: string): Promise<Application> {
    return apiClient.get<Application>(`/catalog/applications/${id}`)
  }

  async getAccessTypes(applicationId: string): Promise<any[]> {
    return apiClient.get<any[]>(`/catalog/applications/${applicationId}/access-types`)
  }
}

export default new CatalogService()
