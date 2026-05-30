/**
 * ServiceNow Table Definition: Access Request (x_2060089_itacc_access_request)
 * 
 * Main table for access requests.
 * Extends: task (inherits workflow capabilities)
 * 
 * Spring Boot Equivalent: @Entity AccessRequest extends BaseEntity
 */

export interface AccessRequestTable {
  sys_id: string
  number: string // Auto-generated request number
  requester: string // Reference to sys_user
  beneficiary: string // Reference to sys_user
  application: string // Reference to x_2060089_itacc_application
  access_type: string // Reference to x_2060089_itacc_access_type
  business_justification: string
  state: string // Draft, Submitted, Pending Approval, Approved, Rejected, Provisioning, Completed, Expired, Revoked, Cancelled
  priority: string // Low, Medium, High, Critical
  urgency: string // Low, Medium, High
  risk_level: string // Low, Medium, High, Critical
  requested_duration_days: number
  expiration_date: string
  submitted_at: string
  completed_at: string
  approval_set: string
  work_notes: string
  sys_created_on: string
  sys_created_by: string
  sys_updated_on: string
  sys_updated_by: string
}

// Fluent API Definition
export const AccessRequestTableDefinition = {
  name: 'x_2060089_itacc_access_request',
  label: 'Access Request',
  extends: 'task',
  number_prefix: 'REQ',
  fields: [
    {
      name: 'requester',
      type: 'reference',
      label: 'Requester',
      reference: 'sys_user',
      mandatory: true,
    },
    {
      name: 'beneficiary',
      type: 'reference',
      label: 'Beneficiary',
      reference: 'sys_user',
      mandatory: true,
    },
    {
      name: 'application',
      type: 'reference',
      label: 'Application',
      reference: 'x_2060089_itacc_application',
      mandatory: true,
    },
    {
      name: 'access_type',
      type: 'reference',
      label: 'Access Type',
      reference: 'x_2060089_itacc_access_type',
      mandatory: true,
    },
    {
      name: 'business_justification',
      type: 'string',
      label: 'Business Justification',
      mandatory: true,
      max_length: 4000,
    },
    {
      name: 'state',
      type: 'string',
      label: 'State',
      choice: [
        'draft',
        'submitted',
        'pending_approval',
        'approved',
        'rejected',
        'provisioning',
        'completed',
        'expired',
        'revoked',
        'cancelled',
      ],
      default_value: 'draft',
    },
    {
      name: 'priority',
      type: 'string',
      label: 'Priority',
      choice: ['low', 'medium', 'high', 'critical'],
      default_value: 'medium',
    },
    {
      name: 'urgency',
      type: 'string',
      label: 'Urgency',
      choice: ['low', 'medium', 'high'],
      default_value: 'medium',
    },
    {
      name: 'risk_level',
      type: 'string',
      label: 'Risk Level',
      choice: ['low', 'medium', 'high', 'critical'],
    },
    { name: 'requested_duration_days', type: 'integer', label: 'Requested Duration (Days)' },
    { name: 'expiration_date', type: 'date', label: 'Expiration Date' },
    { name: 'submitted_at', type: 'datetime', label: 'Submitted At' },
    { name: 'completed_at', type: 'datetime', label: 'Completed At' },
    { name: 'work_notes', type: 'journal_input', label: 'Work Notes' },
  ],
  indexes: [
    { name: 'idx_request_beneficiary', fields: ['beneficiary'] },
    { name: 'idx_request_state', fields: ['state'] },
    { name: 'idx_request_app', fields: ['application'] },
  ],
  acls: {
    read: ['employee'],
    write: ['requester', 'admin', 'fulfiller'],
    create: ['employee'],
    delete: ['admin'],
  },
}
