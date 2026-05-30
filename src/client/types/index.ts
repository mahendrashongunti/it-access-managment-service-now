// Core entity types for the IT Access Management System

export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  department: string
  managerId?: string
  roles: string[]
  active: boolean
}

export interface Department {
  id: string
  name: string
  code: string
  managerId: string
  parentDepartmentId?: string
  description?: string
}

export interface Application {
  id: string
  name: string
  description: string
  category: string
  owner: string
  riskLevel: RiskLevel
  autoProvision: boolean
  requiresApproval: boolean
  documentationUrl?: string
  createdAt: string
  updatedAt: string
}

export interface AccessType {
  id: string
  applicationId: string
  name: string
  description: string
  riskLevel: RiskLevel
  requiresManagerApproval: boolean
  requiresOwnerApproval: boolean
  requiresSecurityApproval: boolean
  maxDurationDays?: number
  createdAt: string
}

export interface RoleCatalog {
  id: string
  name: string
  description: string
  department?: string
  accessTypes: string[] // Access Type IDs
  autoAssign: boolean
  requiresApproval: boolean
}

export interface AccessRequest {
  id: string
  requestNumber: string
  requesterId: string
  requesterName: string
  beneficiaryId: string
  beneficiaryName: string
  applicationId: string
  applicationName: string
  accessTypeId: string
  accessTypeName: string
  businessJustification: string
  state: RequestState
  priority: Priority
  urgency: Urgency
  riskLevel: RiskLevel
  requestedDurationDays?: number
  expirationDate?: string
  submittedAt?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Approval {
  id: string
  requestId: string
  approverId: string
  approverName: string
  approverType: ApproverType
  state: ApprovalState
  comments?: string
  approvedAt?: string
  rejectedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Assignment {
  id: string
  userId: string
  userName: string
  applicationId: string
  applicationName: string
  accessTypeId: string
  accessTypeName: string
  requestId: string
  grantedAt: string
  expiresAt?: string
  revokedAt?: string
  state: AssignmentState
  revokedBy?: string
  revokedReason?: string
}

export interface AuditLog {
  id: string
  entityType: string
  entityId: string
  action: string
  userId: string
  userName: string
  changes?: Record<string, unknown>
  timestamp: string
  ipAddress?: string
}

export interface AccessReview {
  id: string
  reviewNumber: string
  reviewType: ReviewType
  ownerId: string
  ownerName: string
  applicationId?: string
  departmentId?: string
  state: ReviewState
  dueDate: string
  completedAt?: string
  itemsTotal: number
  itemsReviewed: number
  itemsApproved: number
  itemsRevoked: number
  createdAt: string
}

export interface ReviewItem {
  id: string
  reviewId: string
  assignmentId: string
  userId: string
  userName: string
  applicationName: string
  accessTypeName: string
  grantedAt: string
  lastUsed?: string
  decision?: ReviewDecision
  reviewedAt?: string
  reviewedBy?: string
  comments?: string
}

export interface NotificationLog {
  id: string
  userId: string
  type: string
  channel: NotificationChannel
  subject: string
  body: string
  sentAt: string
  readAt?: string
  relatedEntityType?: string
  relatedEntityId?: string
}

export interface IntegrationJob {
  id: string
  name: string
  type: string
  state: JobState
  startedAt: string
  completedAt?: string
  recordsProcessed: number
  recordsSucceeded: number
  recordsFailed: number
  errorMessage?: string
}

// Enums
export enum RequestState {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PROVISIONING = 'provisioning',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
  CANCELLED = 'cancelled',
}

export enum ApprovalState {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum AssignmentState {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum Urgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ApproverType {
  MANAGER = 'manager',
  RESOURCE_OWNER = 'resource_owner',
  SECURITY = 'security',
  COMPLIANCE = 'compliance',
}

export enum ReviewType {
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
  AD_HOC = 'ad_hoc',
  MANAGER = 'manager',
  APPLICATION_OWNER = 'application_owner',
}

export enum ReviewState {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
}

export enum ReviewDecision {
  APPROVE = 'approve',
  REVOKE = 'revoke',
  ESCALATE = 'escalate',
  NEED_INFO = 'need_info',
}

export enum NotificationChannel {
  EMAIL = 'email',
  IN_APP = 'in_app',
  SMS = 'sms',
}

export enum JobState {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Dashboard statistics
export interface DashboardStats {
  myRequests: {
    total: number
    pending: number
    approved: number
    rejected: number
  }
  myApprovals: {
    total: number
    pending: number
  }
  myAccess: {
    total: number
    expiringSoon: number
  }
  myReviews: {
    total: number
    pending: number
    overdue: number
  }
}
