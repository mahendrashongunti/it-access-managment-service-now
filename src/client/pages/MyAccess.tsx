import { useState, useEffect } from 'react'
import { Assignment } from '../types'
import { StatusBadge } from '../components/Card'
import { Loading, ErrorMessage, EmptyState } from '../components/Common'
import AssignmentService from '../services/AssignmentService'

function MyAccess() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAssignments()
  }, [])

  const loadAssignments = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AssignmentService.getMyAccess()
      setAssignments(data)
    } catch (err) {
      setError('Failed to load access assignments')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading text="Loading your access..." />
  if (error) return <ErrorMessage message={error} onRetry={loadAssignments} />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Access</h1>

      {assignments.length === 0 ? (
        <EmptyState
          icon="🔑"
          title="No Active Access"
          description="You don't have any active access assignments. Request access to applications you need from the Access Catalog."
          action={{
            label: 'Browse Catalog',
            onClick: () => console.log('Navigate to catalog'),
          }}
        />
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Access Type</th>
                  <th>Status</th>
                  <th>Granted</th>
                  <th>Expires</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="font-semibold">{assignment.applicationName}</td>
                    <td>{assignment.accessTypeName}</td>
                    <td>
                      <StatusBadge status={assignment.state} />
                    </td>
                    <td>{new Date(assignment.grantedAt).toLocaleDateString()}</td>
                    <td>
                      {assignment.expiresAt ? (
                        <span
                          className={
                            new Date(assignment.expiresAt) < new Date()
                              ? 'text-error'
                              : new Date(assignment.expiresAt).getTime() -
                                    new Date().getTime() <
                                  30 * 24 * 60 * 60 * 1000
                                ? 'text-warning'
                                : ''
                          }
                        >
                          {new Date(assignment.expiresAt).toLocaleDateString()}
                        </span>
                      ) : (
                        'Never'
                      )}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-ghost">Extend</button>
                      <button className="btn btn-sm btn-ghost text-error">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyAccess
