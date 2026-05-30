import { useState, useEffect } from 'react'
import { Application, AccessType } from '../types'
import { StatusBadge } from '../components/Card'
import { Loading, ErrorMessage } from '../components/Common'
import CatalogService from '../services/CatalogService'

function AccessCatalog() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadCatalog()
  }, [])

  const loadCatalog = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await CatalogService.getApplications()
      setApplications(data)
    } catch (err) {
      setError('Failed to load catalog')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loading text="Loading catalog..." />
  if (error) return <ErrorMessage message={error} onRetry={loadCatalog} />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Access Catalog</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search applications..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApplications.map((app) => (
          <div key={app.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{app.name}</h2>
              <p className="text-base-content/70 text-sm">{app.description}</p>
              <div className="flex gap-2 mt-2">
                <StatusBadge status={app.riskLevel} />
                <span className="badge badge-outline">{app.category}</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-sm">Request Access</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccessCatalog
