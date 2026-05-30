import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AccessRequest, Approval } from '../types'
import { StatusBadge } from '../components/Card'
import { Loading, ErrorMessage } from '../components/Common'
import AccessRequestService from '../services/AccessRequestService'

function RequestDetails() {
  const { id } = useParams<{ id: string }>()
  const [request, setRequest] = useState<AccessRequest | null>(null)
  const [approvals, setApprovals] = useState<Approval[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadRequestDetails(id)
    }
  }, [id])

  const loadRequestDetails = async (requestId: string) => {
    try {
      setLoading(true)
      setError(null)
      const [requestData, approvalsData] = await Promise.all([
        AccessRequestService.getRequestById(requestId),
        AccessRequestService.getRequestApprovals(requestId),
      ])
      setRequest(requestData)
      setApprovals(approvalsData)
    } catch (err) {
      setError('Failed to load request details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading text="Loading request details..." />
  if (error) return <ErrorMessage message={error} onRetry={() => loadRequestDetails(id!)} />
  if (!request) return null

  return (
    <div>
      <div className="mb-6">
        <Link to="/requests" className="btn btn-ghost btn-sm">
          ← Back to Requests
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title text-2xl">Request {request.requestNumber}</h2>
                  <p className="text-base-content/70">
                    Submitted on {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={request.state} className="badge-lg" />
              </div>

              <div className="divider"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Requester</span>
                  </label>
                  <p>{request.requesterName}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Beneficiary</span>
                  </label>
                  <p>{request.beneficiaryName}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Application</span>
                  </label>
                  <p>{request.applicationName}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Access Type</span>
                  </label>
                  <p>{request.accessTypeName}</p>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Priority</span>
                  </label>
                  <StatusBadge status={request.priority} />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Risk Level</span>
                  </label>
                  <StatusBadge status={request.riskLevel} />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Business Justification</span>
                </label>
                <p className="p-4 bg-base-200 rounded-lg">{request.businessJustification}</p>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Approval Timeline</h3>
              {approvals.length === 0 ? (
                <p className="text-base-content/70">No approvals yet</p>
              ) : (
                <ul className="timeline timeline-vertical">
                  {approvals.map((approval, index) => (
                    <li key={approval.id}>
                      {index !== 0 && <hr />}
                      <div className="timeline-start">{approval.approverName}</div>
                      <div className="timeline-middle">
                        <StatusBadge status={approval.state} />
                      </div>
                      <div className="timeline-end timeline-box">
                        <p className="font-semibold">{approval.approverType}</p>
                        {approval.comments && <p className="text-sm mt-1">{approval.comments}</p>}
                        <p className="text-xs text-base-content/70 mt-2">
                          {approval.approvedAt
                            ? new Date(approval.approvedAt).toLocaleString()
                            : 'Pending'}
                        </p>
                      </div>
                      {index !== approvals.length - 1 && <hr />}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-lg">Actions</h3>
              <div className="space-y-2">
                <button className="btn btn-error btn-block">Cancel Request</button>
                <button className="btn btn-outline btn-block">Download PDF</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-lg">Activity Log</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-base-200 rounded">
                  <p className="font-semibold">Request Submitted</p>
                  <p className="text-xs text-base-content/70">
                    {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
                {request.submittedAt && (
                  <div className="p-2 bg-base-200 rounded">
                    <p className="font-semibold">Submitted for Approval</p>
                    <p className="text-xs text-base-content/70">
                      {new Date(request.submittedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestDetails
