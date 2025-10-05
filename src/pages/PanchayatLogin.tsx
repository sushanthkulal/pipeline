import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

const PanchayatLogin = () => {
  const navigate = useNavigate()

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Panchayat Staff Login</h1>
          <p>Access the management dashboard for village water operations</p>
        </div>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              id="employeeId"
              placeholder="Enter your employee ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-footer">
          <button onClick={() => navigate('/')} className="back-link">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default PanchayatLogin
