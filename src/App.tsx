import { Routes, Route } from 'react-router-dom'
import MainLayout from './client/layouts/MainLayout'
import Dashboard from './client/pages/Dashboard'
import MyRequests from './client/pages/MyRequests'
import RequestDetails from './client/pages/RequestDetails'
import PendingApprovals from './client/pages/PendingApprovals'
import MyAccess from './client/pages/MyAccess'
import AccessCatalog from './client/pages/AccessCatalog'
import AccessReviews from './client/pages/AccessReviews'
import Reports from './client/pages/Reports'
import AuditLogs from './client/pages/AuditLogs'
import AdminConsole from './client/pages/AdminConsole'
import Settings from './client/pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="requests" element={<MyRequests />} />
        <Route path="requests/:id" element={<RequestDetails />} />
        <Route path="approvals" element={<PendingApprovals />} />
        <Route path="my-access" element={<MyAccess />} />
        <Route path="catalog" element={<AccessCatalog />} />
        <Route path="reviews" element={<AccessReviews />} />
        <Route path="reports" element={<Reports />} />
        <Route path="audit" element={<AuditLogs />} />
        <Route path="admin" element={<AdminConsole />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
