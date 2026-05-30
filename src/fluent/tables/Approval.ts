/**
 * ServiceNow Table Definition: Approval (sysapproval_approver)
 * 
 * Tracks approval decisions for access requests.
 * Extends: sysapproval_approver (built-in approval table)
 * 
 * Spring Boot Equivalent: @Entity Approval
 */

export interface ApprovalTable {
  sys_id: string
  sysapproval: string // Reference to source document (x_itam_access_request)
  approver: string // Reference to sys_user
  approver_type: string // Manager, Resource Owner, Security, Compliance
  state: string // Pending, Approved, Rejected, Cancelled
  comments: string
  approved_date: string
  rejected_date: string
  order: number
  sys_created_on: string
  sys_created_by: string
  sys_updated_on: string
  sys_updated_by: string
}

// Fluent API Definition
export const ApprovalTableDefinition = {
  name: 'x_itam_approval',
  label: 'Access Request Approval',
  extends: 'sysapproval_approver',
  fields: [
    {
      name: 'approver_type',
      type: 'string',
      label: 'Approver Type',
      choice: ['manager', 'resource_owner', 'security', 'compliance'],
      mandatory: true,
    },
    { name: 'order', type: 'integer', label: 'Approval Order', default_value: 1 },
  ],
  acls: {
    read: ['employee'],
    write: ['approver', 'admin'],
    create: ['system', 'admin'],
    delete: ['admin'],
  },
}
