/**
 * ServiceNow Table Definition: Department (x_dept_department)
 * 
 * Represents organizational units within the enterprise.
 * Extends: None (Base table)
 * 
 * Spring Boot Equivalent: @Entity Department
 */

export interface DepartmentTable {
  sys_id: string
  name: string
  code: string
  manager: string // Reference to sys_user
  parent_department: string // Reference to x_dept_department
  description: string
  active: boolean
  sys_created_on: string
  sys_created_by: string
  sys_updated_on: string
  sys_updated_by: string
}

// Fluent API Definition (for ServiceNow SDK)
export const DepartmentTableDefinition = {
  name: 'x_2060089_itacc_department',
  label: 'Department',
  fields: [
    { name: 'name', type: 'string', label: 'Name', mandatory: true, max_length: 100 },
    { name: 'code', type: 'string', label: 'Code', mandatory: true, max_length: 20 },
    { name: 'manager', type: 'reference', label: 'Manager', reference: 'sys_user' },
    {
      name: 'parent_department',
      type: 'reference',
      label: 'Parent Department',
      reference: 'x_2060089_itacc_department',
    },
    { name: 'description', type: 'string', label: 'Description', max_length: 1000 },
    { name: 'active', type: 'boolean', label: 'Active', default_value: true },
  ],
  indexes: [{ name: 'idx_dept_code', fields: ['code'], unique: true }],
  acls: {
    read: ['employee'],
    write: ['admin', 'hr_admin'],
    create: ['admin', 'hr_admin'],
    delete: ['admin'],
  },
}
