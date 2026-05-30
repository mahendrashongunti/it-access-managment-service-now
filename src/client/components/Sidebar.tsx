import { Link, useLocation } from 'react-router-dom'

interface MenuItem {
  path: string
  label: string
  icon: string
}

const menuItems: MenuItem[] = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/requests', label: 'My Requests', icon: '📝' },
  { path: '/approvals', label: 'Pending Approvals', icon: '✅' },
  { path: '/my-access', label: 'My Access', icon: '🔑' },
  { path: '/catalog', label: 'Access Catalog', icon: '📚' },
  { path: '/reviews', label: 'Access Reviews', icon: '🔍' },
  { path: '/reports', label: 'Reports', icon: '📈' },
  { path: '/audit', label: 'Audit Logs', icon: '📋' },
  { path: '/admin', label: 'Admin Console', icon: '⚙️' },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-base-100 min-h-screen shadow-lg">
      <ul className="menu p-4 w-full">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
