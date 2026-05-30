import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AccessRequest } from '../types'
import { StatusBadge } from '../components/Card'
import { Loading, ErrorMessage, EmptyState } from '../components/Common'
import AccessRequestService from '../services/AccessRequestService'

function MyRequests() {
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    loadRequests()
  }, [filter])

  const loadRequests = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AccessRequestService.getMyRequests(filter)
      setRequests(data)
    } catch (err) {
      setError('Failed to load requests')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading text="Loading requests..." />
  if (error) return <ErrorMessage message={error} onRetry={loadRequests} />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Requests</h1>
        <button className="btn btn-primary">
          <span className="text-xl mr-2">+</span>
          New Request
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`btn btn-sm ${filter === 'approved' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button
          className={`btn btn-sm ${filter === 'rejected' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
      </div>

      {requests.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No Requests Found"
          description="You haven't submitted any access requests yet. Start by requesting access to applications you need."
          action={{
            label: 'Create New Request',
            onClick: () => console.log('Create request'),
          }}
        />
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Request #</th>
                  <th>Application</th>
                  <th>Access Type</th>
                  <th>Beneficiary</th>
                  <th>Status</th>
                  <th>Risk</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <Link
                        to={`/requests/${request.id}`}
                        className="link link-primary font-mono"
                      >
                        {request.requestNumber}
                      </Link>
                    </td>
                    <td>{request.applicationName}</td>
                    <td>{request.accessTypeName}</td>
                    <td>{request.beneficiaryName}</td>
                    <td>
                      <StatusBadge status={request.state} />
                    </td>
                    <td>
                      <StatusBadge status={request.riskLevel} />
                    </td>
                    <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/requests/${request.id}`} className="btn btn-sm btn-ghost">
                        View
                      </Link>
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

export default MyRequests
