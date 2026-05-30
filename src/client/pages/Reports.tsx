function Reports() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Requests by Month</h2>
            <div className="h-48 flex items-center justify-center bg-base-200 rounded-lg">
              <p className="text-base-content/50">Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Approval Time (Avg)</h2>
            <div className="h-48 flex items-center justify-center bg-base-200 rounded-lg">
              <p className="text-base-content/50">Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Access by Risk Level</h2>
            <div className="h-48 flex items-center justify-center bg-base-200 rounded-lg">
              <p className="text-base-content/50">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Available Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <button className="btn btn-outline justify-start">
              📊 Access Distribution Report
            </button>
            <button className="btn btn-outline justify-start">
              ⏱️ Request Processing Time Report
            </button>
            <button className="btn btn-outline justify-start">
              🚨 High-Risk Access Report
            </button>
            <button className="btn btn-outline justify-start">
              📅 Expiring Access Report
            </button>
            <button className="btn btn-outline justify-start">
              ✅ Approval Statistics Report
            </button>
            <button className="btn btn-outline justify-start">
              🔍 Review Completion Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
