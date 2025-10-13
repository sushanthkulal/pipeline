import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Users, MessageSquare, DollarSign, LogOut, Menu, X, Bell } from 'lucide-react'
import AdminHome from '../components/admin/AdminHome'
import AdminManagement from '../components/admin/AdminManagement'
import AdminComplaints from '../components/admin/AdminComplaints'
import AdminBilling from '../components/admin/AdminBilling'
import './PanchayatAdminDashboard.css'

interface PanchayatData {
  lgd_number: string
  state: string
  district: string
  name: string
  contact: string
}

const PanchayatAdminDashboard = () => {
  const [activePage, setActivePage] = useState('home')
  const [panchayat, setPanchayat] = useState<PanchayatData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notificationCount] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const storedPanchayat = sessionStorage.getItem('panchayat')
    if (!storedPanchayat) {
      navigate('/panchayat-admin-login')
      return
    }
    setPanchayat(JSON.parse(storedPanchayat))
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('panchayat')
    navigate('/panchayat-admin-login')
  }

  if (!panchayat) {
    return null
  }

  return (
    <div className="panchayat-admin-dashboard">
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="gp-badge">GP</div>
          <h2 className={sidebarOpen ? 'visible' : 'hidden'}>Dashboard</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            <Home size={22} />
            <span className={sidebarOpen ? 'visible' : 'hidden'}>Home</span>
          </button>

          <button
            className={`nav-item ${activePage === 'management' ? 'active' : ''}`}
            onClick={() => setActivePage('management')}
          >
            <Users size={22} />
            <span className={sidebarOpen ? 'visible' : 'hidden'}>Management</span>
          </button>

          <button
            className={`nav-item ${activePage === 'complaints' ? 'active' : ''}`}
            onClick={() => setActivePage('complaints')}
          >
            <MessageSquare size={22} />
            <span className={sidebarOpen ? 'visible' : 'hidden'}>Queries & Complaints</span>
          </button>

          <button
            className={`nav-item ${activePage === 'billing' ? 'active' : ''}`}
            onClick={() => setActivePage('billing')}
          >
            <DollarSign size={22} />
            <span className={sidebarOpen ? 'visible' : 'hidden'}>Billing</span>
          </button>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={22} />
          <span className={sidebarOpen ? 'visible' : 'hidden'}>Logout</span>
        </button>
      </aside>

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="panchayat-info">
              <h1>{panchayat.name}</h1>
              <p>LGD: {panchayat.lgd_number} | {panchayat.district}</p>
            </div>
          </div>

          <div className="header-right">
            <button className="notification-button">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </button>
            <div className="profile-dropdown">
              <div className="profile-avatar">
                {panchayat.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-main">
          {activePage === 'home' && <AdminHome lgdNumber={panchayat.lgd_number} />}
          {activePage === 'management' && <AdminManagement lgdNumber={panchayat.lgd_number} />}
          {activePage === 'complaints' && <AdminComplaints lgdNumber={panchayat.lgd_number} />}
          {activePage === 'billing' && <AdminBilling lgdNumber={panchayat.lgd_number} />}
        </main>
      </div>
    </div>
  )
}

export default PanchayatAdminDashboard
