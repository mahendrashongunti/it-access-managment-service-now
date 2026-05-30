/**
 * ServiceNow Table Definition: Application (x_2060089_itacc_application)
 * 
 * Represents business applications that users can request access to.
 * Extends: None (Base table)
 * 
 * Spring Boot Equivalent: @Entity Application
 */

export interface ApplicationTable {
  sys_id: string
  name: string
  description: string
  category: string
  owner: string // Reference to sys_user
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  auto_provision: boolean
  requires_approval: boolean
  documentation_url: string
  active: boolean
  sys_created_on: string
  sys_created_by: string
  sys_updated_on: string
  sys_updated_by: string
}

// Fluent API Definition
export const ApplicationTableDefinition = {
  name: 'x_2060089_itacc_application',
  label: 'Application',
  fields: [
    { name: 'name', type: 'string', label: 'Name', mandatory: true, max_length: 100 },
    { name: 'description', type: 'string', label: 'Description', max_length: 1000 },
    {
      name: 'category',
      type: 'string',
      label: 'Category',
      max_length: 50,
      choice: [
        'Development',
        'Cloud Services',
        'Project Management',
        'Sales & Marketing',
        'Finance',
        'HR',
        'Documentation',
        'Communication',
        'Other',
      ],
    },
    { name: 'owner', type: 'reference', label: 'Application Owner', reference: 'sys_user' },
    {
      name: 'risk_level',
      type: 'string',
      label: 'Risk Level',
      choice: ['low', 'medium', 'high', 'critical'],
      mandatory: true,
    },
    { name: 'auto_provision', type: 'boolean', label: 'Auto Provision', default_value: false },
    {
      name: 'requires_approval',
      type: 'boolean',
      label: 'Requires Approval',
      default_value: true,
    },
    { name: 'documentation_url', type: 'url', label: 'Documentation URL', max_length: 255 },
    { name: 'active', type: 'boolean', label: 'Active', default_value: true },
  ],
  indexes: [{ name: 'idx_app_name', fields: ['name'], unique: true }],
  acls: {
    read: ['employee'],
    write: ['admin', 'resource_owner'],
    create: ['admin', 'resource_owner'],
    delete: ['admin'],
  },
}
