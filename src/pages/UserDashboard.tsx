import { useNavigate } from 'react-router-dom'
import './UserDashboard.css'

const UserDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>User Dashboard</h1>
          <button onClick={() => navigate('/')} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="welcome-card">
          <h2>Welcome to Jal Jeevan Mission Portal</h2>
          <p>Your dashboard is being prepared. Check back soon for water usage data, billing information, and quality reports.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">💧</div>
            <h3>Water Usage</h3>
            <p className="card-value">Coming Soon</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Quality Reports</h3>
            <p className="card-value">Coming Soon</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">💰</div>
            <h3>Billing</h3>
            <p className="card-value">Coming Soon</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📍</div>
            <h3>Connection Status</h3>
            <p className="card-value">Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
