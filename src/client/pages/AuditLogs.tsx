import { useState, useEffect } from 'react'
import { AuditLog } from '../types'
import { Loading, ErrorMessage } from '../components/Common'
import AuditService from '../services/AuditService'

function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState({
    entityType: '',
    action: '',
    dateFrom: '',
    dateTo: '',
  })

  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AuditService.getAuditLogs(filter)
      setLogs(data)
    } catch (err) {
      setError('Failed to load audit logs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading text="Loading audit logs..." />
  if (error) return <ErrorMessage message={error} onRetry={loadLogs} />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Audit Logs</h1>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Entity Type</span>
              </label>
              <select
                className="select select-bordered"
                value={filter.entityType}
                onChange={(e) => setFilter({ ...filter, entityType: e.target.value })}
              >
                <option value="">All</option>
                <option value="request">Request</option>
                <option value="approval">Approval</option>
                <option value="assignment">Assignment</option>
                <option value="review">Review</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Action</span>
              </label>
              <select
                className="select select-bordered"
                value={filter.action}
                onChange={(e) => setFilter({ ...filter, action: e.target.value })}
              >
                <option value="">All</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date From</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={filter.dateFrom}
                onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date To</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={filter.dateTo}
                onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })}
              />
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary" onClick={loadLogs}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Entity Type</th>
                <th>Action</th>
                <th>Entity ID</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="font-mono text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td>{log.userName}</td>
                  <td>
                    <span className="badge badge-outline">{log.entityType}</span>
                  </td>
                  <td>
                    <span className="badge">{log.action}</span>
                  </td>
                  <td className="font-mono text-sm">{log.entityId}</td>
                  <td className="font-mono text-sm">{log.ipAddress || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AuditLogs
