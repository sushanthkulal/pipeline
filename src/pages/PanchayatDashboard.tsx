import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Users, MessageSquare, CreditCard, LogOut } from 'lucide-react'
import HomePage from '../components/panchayat/HomePage'
import ManagementPage from '../components/panchayat/ManagementPage'
import ComplaintsPage from '../components/panchayat/ComplaintsPage'
import BillingPage from '../components/panchayat/BillingPage'
import './PanchayatDashboard.css'

const PanchayatDashboard = () => {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('home')
  const [panchayatName, setPanchayatName] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('panchayatLoggedIn')
    const name = localStorage.getItem('panchayatName')

    if (!isLoggedIn) {
      navigate('/panchayat_login')
    } else if (name) {
      setPanchayatName(name)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('panchayatLoggedIn')
    localStorage.removeItem('panchayatName')
    localStorage.removeItem('panchayatId')
    navigate('/panchayat_login')
  }

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'management', label: 'Management', icon: Users },
    { id: 'complaints', label: 'Queries & Complaints', icon: MessageSquare },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ]

  return (
    <div className="panchayat-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>GP Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{panchayatName}</h1>
        </header>
        <div className="dashboard-content">
          {activePage === 'home' && <HomePage />}
          {activePage === 'management' && <ManagementPage />}
          {activePage === 'complaints' && <ComplaintsPage />}
          {activePage === 'billing' && <BillingPage />}
        </div>
      </main>
    </div>
  )
}

export default PanchayatDashboard
