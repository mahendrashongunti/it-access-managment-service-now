import { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: string
  color?: string
}

export function StatCard({ title, value, icon, color = 'primary' }: StatCardProps) {
  return (
    <div className={`stat bg-base-100 shadow-xl rounded-lg border-l-4 border-${color}`}>
      <div className="stat-figure text-4xl">{icon}</div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

interface BadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className = '' }: BadgeProps) {
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: 'badge-ghost',
      submitted: 'badge-info',
      pending_approval: 'badge-warning',
      approved: 'badge-success',
      rejected: 'badge-error',
      provisioning: 'badge-info',
      completed: 'badge-success',
      expired: 'badge-error',
      revoked: 'badge-error',
      cancelled: 'badge-ghost',
      active: 'badge-success',
      pending: 'badge-warning',
      low: 'badge-info',
      medium: 'badge-warning',
      high: 'badge-error',
      critical: 'badge-error',
    }
    return statusMap[status.toLowerCase()] || 'badge-ghost'
  }

  return (
    <span className={`badge ${getStatusColor(status)} ${className}`}>
      {status.replace(/_/g, ' ').toUpperCase()}
    </span>
  )
}
