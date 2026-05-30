import { useState, useEffect } from 'react'
import { Approval, AccessRequest } from '../types'
import { StatusBadge } from '../components/Card'
import { Loading, ErrorMessage, EmptyState } from '../components/Common'
import ApprovalService from '../services/ApprovalService'

function PendingApprovals() {
  const [approvals, setApprovals] = useState<
    Array<Approval & { request: AccessRequest }>
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadApprovals()
  }, [])

  const loadApprovals = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ApprovalService.getPendingApprovals()
      setApprovals(data)
    } catch (err) {
      setError('Failed to load pending approvals')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (approvalId: string) => {
    try {
      await ApprovalService.approveRequest(approvalId, 'Approved')
      loadApprovals()
    } catch (err) {
      console.error('Failed to approve request', err)
    }
  }

  const handleReject = async (approvalId: string) => {
    try {
      await ApprovalService.rejectRequest(approvalId, 'Rejected')
      loadApprovals()
    } catch (err) {
      console.error('Failed to reject request', err)
    }
  }

  if (loading) return <Loading text="Loading approvals..." />
  if (error) return <ErrorMessage message={error} onRetry={loadApprovals} />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>

      {approvals.length === 0 ? (
        <EmptyState
          icon="✅"
          title="No Pending Approvals"
          description="You don't have any pending approvals at the moment. New requests requiring your approval will appear here."
        />
      ) : (
        <div className="space-y-4">
          {approvals.map((approval) => (
            <div key={approval.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="card-title">
                      {approval.request.applicationName} - {approval.request.accessTypeName}
                    </h3>
                    <p className="text-base-content/70">
                      Request #{approval.request.requestNumber}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <StatusBadge status={approval.request.riskLevel} />
                    <StatusBadge status={approval.approverType} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-base-content/70">Requester</p>
                    <p className="font-semibold">{approval.request.requesterName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Beneficiary</p>
                    <p className="font-semibold">{approval.request.beneficiaryName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Priority</p>
                    <StatusBadge status={approval.request.priority} />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Submitted</p>
                    <p className="font-semibold">
                      {new Date(approval.request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-base-content/70 mb-2">Business Justification</p>
                  <p className="p-3 bg-base-200 rounded-lg">
                    {approval.request.businessJustification}
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleReject(approval.id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(approval.id)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PendingApprovals
