import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Users, MessageSquare, DollarSign } from 'lucide-react'
import HomePage from '../components/dashboard/HomePage'
import ManagementPage from '../components/dashboard/ManagementPage'
import ComplaintsPage from '../components/dashboard/ComplaintsPage'
import BillingPage from '../components/dashboard/BillingPage'
import './PanchayatDashboard.css'

const PanchayatDashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')

  const panchayatName = location.state?.panchayatName || 'Gram Panchayat'

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'management', label: 'Management', icon: Users },
    { id: 'complaints', label: 'Queries & Complaints', icon: MessageSquare },
    { id: 'billing', label: 'Billing', icon: DollarSign }
  ]

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />
      case 'management':
        return <ManagementPage />
      case 'complaints':
        return <ComplaintsPage />
      case 'billing':
        return <BillingPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="panchayat-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <button className="logout-button" onClick={() => navigate('/')}>
          Logout
        </button>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{panchayatName}</h1>
        </header>
        <div className="dashboard-content">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

export default PanchayatDashboard
