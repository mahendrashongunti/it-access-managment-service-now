import { useState, useEffect } from 'react'
import { AccessReview } from '../types'
import { StatusBadge } from '../components/Card'
import { Loading, ErrorMessage, EmptyState } from '../components/Common'
import ReviewService from '../services/ReviewService'

function AccessReviews() {
  const [reviews, setReviews] = useState<AccessReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ReviewService.getMyReviews()
      setReviews(data)
    } catch (err) {
      setError('Failed to load reviews')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading text="Loading reviews..." />
  if (error) return <ErrorMessage message={error} onRetry={loadReviews} />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Access Reviews</h1>

      {reviews.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No Active Reviews"
          description="You don't have any access reviews assigned at the moment."
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="card-title">{review.reviewNumber}</h3>
                    <p className="text-base-content/70">
                      <StatusBadge status={review.reviewType} /> Review
                    </p>
                  </div>
                  <StatusBadge status={review.state} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-base-content/70">Total Items</p>
                    <p className="font-semibold text-2xl">{review.itemsTotal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Reviewed</p>
                    <p className="font-semibold text-2xl">{review.itemsReviewed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Approved</p>
                    <p className="font-semibold text-2xl text-success">{review.itemsApproved}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Revoked</p>
                    <p className="font-semibold text-2xl text-error">{review.itemsRevoked}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <progress
                    className="progress progress-primary w-full"
                    value={review.itemsReviewed}
                    max={review.itemsTotal}
                  ></progress>
                  <p className="text-sm text-base-content/70 mt-1">
                    {Math.round((review.itemsReviewed / review.itemsTotal) * 100)}% Complete
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <p className="text-sm text-base-content/70">
                    Due: {new Date(review.dueDate).toLocaleDateString()}
                  </p>
                  <button className="btn btn-primary btn-sm">Continue Review</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AccessReviews
