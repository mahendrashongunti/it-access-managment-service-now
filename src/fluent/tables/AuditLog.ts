/**
 * ServiceNow Table Definition: Audit Log (x_2060089_itacc_audit_log)
 * 
 * Tracks all changes and actions for compliance.
 * Extends: None (Base table)
 * 
 * Spring Boot Equivalent: @Entity AuditLog
 */

export interface AuditLogTable {
  sys_id: string
  entity_type: string
  entity_id: string
  action: string
  user: string // Reference to sys_user
  changes: string // JSON of changes
  ip_address: string
  timestamp: string
  sys_created_on: string
}

// Fluent API Definition
export const AuditLogTableDefinition = {
  name: 'x_2060089_itacc_audit_log',
  label: 'Audit Log',
  fields: [
    { name: 'entity_type', type: 'string', label: 'Entity Type', mandatory: true, max_length: 50 },
    { name: 'entity_id', type: 'string', label: 'Entity ID', mandatory: true, max_length: 32 },
    {
      name: 'action',
      type: 'string',
      label: 'Action',
      mandatory: true,
      choice: ['create', 'update', 'delete', 'approve', 'reject', 'revoke', 'extend'],
    },
    { name: 'user', type: 'reference', label: 'User', reference: 'sys_user', mandatory: true },
    { name: 'changes', type: 'string', label: 'Changes (JSON)', max_length: 4000 },
    { name: 'ip_address', type: 'string', label: 'IP Address', max_length: 45 },
    { name: 'timestamp', type: 'datetime', label: 'Timestamp', mandatory: true },
  ],
  indexes: [
    { name: 'idx_audit_entity', fields: ['entity_type', 'entity_id'] },
    { name: 'idx_audit_user', fields: ['user', 'timestamp'] },
    { name: 'idx_audit_timestamp', fields: ['timestamp'] },
  ],
  acls: {
    read: ['auditor', 'admin'],
    write: ['system'],
    create: ['system'],
    delete: ['admin'],
  },
}
