import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import locationData from '../data/locationData.json'

const PanchayatLogin = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [lgdNumber, setLgdNumber] = useState('')

  const states = Object.keys(locationData)
  const districts = state ? Object.keys(locationData[state as keyof typeof locationData]) : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (state && district && lgdNumber.length === 6) {
      navigate('/panchayat-dashboard', {
        state: { panchayatName: `${district} Gram Panchayat`, lgdNumber, state, district }
      })
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Panchayat Staff Login</h1>
          <p>Access the management dashboard for village water operations</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <select
              id="state"
              value={state}
              onChange={(e) => {
                setState(e.target.value)
                setDistrict('')
              }}
              required
            >
              <option value="">Select State</option>
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!state}
              required
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lgdNumber">LGD Number</label>
            <input
              type="text"
              id="lgdNumber"
              placeholder="Enter 6-digit LGD number"
              value={lgdNumber}
              onChange={(e) => setLgdNumber(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
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
