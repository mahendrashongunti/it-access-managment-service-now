/**
 * ServiceNow Table Definition: Access Type (x_itam_access_type)
 * 
 * Represents specific types of access within an application.
 * Extends: None (Base table)
 * 
 * Spring Boot Equivalent: @Entity AccessType
 */

export interface AccessTypeTable {
  sys_id: string
  application: string // Reference to x_itam_application
  name: string
  description: string
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  requires_manager_approval: boolean
  requires_owner_approval: boolean
  requires_security_approval: boolean
  max_duration_days: number
  active: boolean
  sys_created_on: string
  sys_created_by: string
  sys_updated_on: string
  sys_updated_by: string
}

// Fluent API Definition
export const AccessTypeTableDefinition = {
  name: 'x_itam_access_type',
  label: 'Access Type',
  fields: [
    {
      name: 'application',
      type: 'reference',
      label: 'Application',
      reference: 'x_itam_application',
      mandatory: true,
    },
    { name: 'name', type: 'string', label: 'Name', mandatory: true, max_length: 100 },
    { name: 'description', type: 'string', label: 'Description', max_length: 1000 },
    {
      name: 'risk_level',
      type: 'string',
      label: 'Risk Level',
      choice: ['low', 'medium', 'high', 'critical'],
      mandatory: true,
    },
    {
      name: 'requires_manager_approval',
      type: 'boolean',
      label: 'Requires Manager Approval',
      default_value: true,
    },
    {
      name: 'requires_owner_approval',
      type: 'boolean',
      label: 'Requires Owner Approval',
      default_value: true,
    },
    {
      name: 'requires_security_approval',
      type: 'boolean',
      label: 'Requires Security Approval',
      default_value: false,
    },
    { name: 'max_duration_days', type: 'integer', label: 'Max Duration (Days)' },
    { name: 'active', type: 'boolean', label: 'Active', default_value: true },
  ],
  indexes: [{ name: 'idx_access_type', fields: ['application', 'name'], unique: true }],
  acls: {
    read: ['employee'],
    write: ['admin', 'resource_owner'],
    create: ['admin', 'resource_owner'],
    delete: ['admin'],
  },
}
