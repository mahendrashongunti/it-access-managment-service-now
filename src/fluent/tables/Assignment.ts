/**
 * ServiceNow Table Definition: Assignment (x_2060089_itacc_assignment)
 * 
 * Represents granted access to users.
 * Extends: None (Base table)
 * 
 * Spring Boot Equivalent: @Entity Assignment
 */

export interface AssignmentTable {
  sys_id: string
  user: string // Reference to sys_user
  application: string // Reference to x_2060089_itacc_application
  access_type: string // Reference to x_2060089_itacc_access_type
  request: string // Reference to x_2060089_itacc_access_request
  state: string // Active, Expired, Revoked
  granted_at: string
  expires_at: string
  revoked_at: string
  revoked_by: string // Reference to sys_user
  revoked_reason: string
  last_used: string
  sys_created_on: string
  sys_created_by: string
  sys_updated_on: string
  sys_updated_by: string
}

// Fluent API Definition
export const AssignmentTableDefinition = {
  name: 'x_2060089_itacc_assignment',
  label: 'Access Assignment',
  fields: [
    { name: 'user', type: 'reference', label: 'User', reference: 'sys_user', mandatory: true },
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
      name: 'request',
      type: 'reference',
      label: 'Request',
      reference: 'x_2060089_itacc_access_request',
      mandatory: true,
    },
    {
      name: 'state',
      type: 'string',
      label: 'State',
      choice: ['active', 'expired', 'revoked'],
      default_value: 'active',
    },
    { name: 'granted_at', type: 'datetime', label: 'Granted At', mandatory: true },
    { name: 'expires_at', type: 'datetime', label: 'Expires At' },
    { name: 'revoked_at', type: 'datetime', label: 'Revoked At' },
    { name: 'revoked_by', type: 'reference', label: 'Revoked By', reference: 'sys_user' },
    { name: 'revoked_reason', type: 'string', label: 'Revoked Reason', max_length: 1000 },
    { name: 'last_used', type: 'datetime', label: 'Last Used' },
  ],
  indexes: [
    { name: 'idx_assignment_user', fields: ['user', 'state'] },
    { name: 'idx_assignment_app', fields: ['application', 'state'] },
    { name: 'idx_assignment_expires', fields: ['expires_at'] },
  ],
  acls: {
    read: ['employee'],
    write: ['admin', 'fulfiller'],
    create: ['admin', 'fulfiller'],
    delete: ['admin'],
  },
}
