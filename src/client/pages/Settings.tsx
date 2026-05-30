function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Profile Information</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input type="text" className="input input-bordered" placeholder="John Doe" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <input type="text" className="input input-bordered" placeholder="Engineering" />
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Notification Preferences</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Email notifications for new requests</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Email notifications for approvals</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Email notifications for access expiry</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Email notifications for reviews</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Security</h2>
            <button className="btn btn-outline">Change Password</button>
            <button className="btn btn-outline">Enable Two-Factor Authentication</button>
            <button className="btn btn-outline">View Login History</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
