import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Droplet, Wrench, MessageSquare, CreditCard, Info, Phone, LogOut } from 'lucide-react'
import HomePage from '../components/dashboard/HomePage'
import QualityMonitoringPage from '../components/dashboard/QualityMonitoringPage'
import MaintenancePage from '../components/dashboard/MaintenancePage'
import ComplaintsPage from '../components/dashboard/ComplaintsPage'
import BillingPage from '../components/dashboard/BillingPage'
import AboutUsPage from '../components/dashboard/AboutUsPage'
import ContactUsPage from '../components/dashboard/ContactUsPage'
import './UserDashboard.css'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState('home')

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'quality', label: 'Quality Monitoring', icon: Droplet },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'bills', label: 'Bills', icon: CreditCard },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact Us', icon: Phone }
  ]

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return <HomePage />
      case 'quality':
        return <QualityMonitoringPage />
      case 'maintenance':
        return <MaintenancePage />
      case 'complaints':
        return <ComplaintsPage />
      case 'bills':
        return <BillingPage />
      case 'about':
        return <AboutUsPage />
      case 'contact':
        return <ContactUsPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>SmartGram Portal</h1>
          <button onClick={() => navigate('/')} className="logout-button">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="user-info">
            <div className="user-avatar">RK</div>
            <div className="user-details">
              <h3>Rajesh Kumar</h3>
              <p>H-456, Ward 3</p>
              <p className="village-name">Dharampur Village</p>
            </div>
          </div>

          <nav className="dashboard-menu">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                  onClick={() => setActiveMenu(item.id)}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
