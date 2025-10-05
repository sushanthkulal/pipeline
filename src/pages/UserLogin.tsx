import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

const UserLogin = () => {
  const navigate = useNavigate()

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>User Login</h1>
          <p>Access your household water usage, quality reports, and billing information</p>
        </div>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your registered phone number"
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

export default UserLogin
