function AdminConsole() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Console</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">📚 Applications</h2>
            <p className="text-base-content/70">Manage applications and access types</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">👥 Users & Groups</h2>
            <p className="text-base-content/70">Manage users, groups, and roles</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">🏢 Departments</h2>
            <p className="text-base-content/70">Manage organizational structure</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">🔐 ACLs & Security</h2>
            <p className="text-base-content/70">Manage access control lists</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">🔄 Workflows</h2>
            <p className="text-base-content/70">Manage approval workflows</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">📧 Notifications</h2>
            <p className="text-base-content/70">Manage notification templates</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">⏰ Scheduled Jobs</h2>
            <p className="text-base-content/70">Manage scheduled tasks</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">🔌 Integrations</h2>
            <p className="text-base-content/70">Manage external integrations</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">⚙️ System Settings</h2>
            <p className="text-base-content/70">Configure system parameters</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminConsole
