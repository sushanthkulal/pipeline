import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import locationData from '../data/locationData.json'

interface LocationData {
  [state: string]: {
    [district: string]: {
      [taluk: string]: string[]
    }
  }
}

const UserLogin = () => {
  const navigate = useNavigate()
  const locations = locationData as LocationData

  const [formData, setFormData] = useState({
    state: '',
    district: '',
    block: '',
    grama: '',
    houseNumber: '',
    aadharNumber: '',
    otp: '',
    rationCard: ''
  })

  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)

  const states = Object.keys(locations)
  const districts = formData.state ? Object.keys(locations[formData.state]) : []
  const taluks = formData.state && formData.district
    ? Object.keys(locations[formData.state][formData.district])
    : []
  const villages = formData.state && formData.district && formData.block
    ? locations[formData.state][formData.district][formData.block]
    : []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'aadharNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 12)
      setFormData(prev => ({ ...prev, [name]: numericValue }))
    } else if (name === 'otp') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6)
      setFormData(prev => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (name === 'state') {
      setFormData(prev => ({ ...prev, district: '', block: '', grama: '' }))
    } else if (name === 'district') {
      setFormData(prev => ({ ...prev, block: '', grama: '' }))
    } else if (name === 'block') {
      setFormData(prev => ({ ...prev, grama: '' }))
    }

    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateAadhar = (aadhar: string): boolean => {
    return /^[0-9]{12}$/.test(aadhar)
  }

  const handleGetOtp = () => {
    if (!validateAadhar(formData.aadharNumber)) {
      setErrors(prev => ({ ...prev, aadharNumber: 'Please enter a valid 12-digit Aadhar number' }))
      return
    }

    setLoading(true)
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(otp)
      setOtpSent(true)
      setLoading(false)
      alert(`OTP sent successfully! Your OTP is: ${otp}`)
    }, 1000)
  }

  const handleVerifyOtp = () => {
    if (formData.otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }))
      return
    }

    setOtpVerified(true)
    setErrors(prev => ({ ...prev, otp: '' }))
    alert('OTP verified successfully!')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}

    if (!formData.state) newErrors.state = 'Please select a state'
    if (!formData.district) newErrors.district = 'Please select a district'
    if (!formData.block) newErrors.block = 'Please select a taluk'
    if (!formData.grama) newErrors.grama = 'Please select a village'
    if (!formData.houseNumber) newErrors.houseNumber = 'Please enter your house number'
    if (!validateAadhar(formData.aadharNumber)) newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhar number'
    if (!otpVerified) newErrors.otp = 'Please verify your OTP'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      navigate('/user-dashboard')
    }, 1000)
  }

  return (
    <div className="login-page">
      <div className="login-container user-login-container">
        <div className="login-header">
          <div className="government-emblem">
            <div className="emblem-circle">
              <span className="emblem-text">जल</span>
            </div>
          </div>
          <h1 className="page-title">User Login</h1>
          <h2 className="portal-name">SmartGram Portal</h2>
          <p className="portal-subtitle">Connecting Every Household with Safe Drinking Water</p>
        </div>

        <form className="login-form user-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-title">Location Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State <span className="required">*</span></label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? 'error' : ''}
                  required
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="district">District <span className="required">*</span></label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className={errors.district ? 'error' : ''}
                  disabled={!formData.state}
                  required
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                {errors.district && <span className="error-message">{errors.district}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="block">Taluk/Block <span className="required">*</span></label>
                <select
                  id="block"
                  name="block"
                  value={formData.block}
                  onChange={handleInputChange}
                  className={errors.block ? 'error' : ''}
                  disabled={!formData.district}
                  required
                >
                  <option value="">Select Taluk</option>
                  {taluks.map(taluk => (
                    <option key={taluk} value={taluk}>{taluk}</option>
                  ))}
                </select>
                {errors.block && <span className="error-message">{errors.block}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="grama">Grama Panchayat/Village <span className="required">*</span></label>
                <select
                  id="grama"
                  name="grama"
                  value={formData.grama}
                  onChange={handleInputChange}
                  className={errors.grama ? 'error' : ''}
                  disabled={!formData.block}
                  required
                >
                  <option value="">Select Village</option>
                  {villages.map(village => (
                    <option key={village} value={village}>{village}</option>
                  ))}
                </select>
                {errors.grama && <span className="error-message">{errors.grama}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="houseNumber">House Number <span className="required">*</span></label>
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleInputChange}
                className={errors.houseNumber ? 'error' : ''}
                placeholder="Enter your house number (e.g., H-123, Plot 45)"
                required
              />
              {errors.houseNumber && <span className="error-message">{errors.houseNumber}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Verification Information</h3>

            <div className="form-group">
              <label htmlFor="aadharNumber">Aadhar Number <span className="required">*</span></label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  className={errors.aadharNumber ? 'error' : ''}
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength={12}
                  required
                />
                <button
                  type="button"
                  className="otp-button"
                  onClick={handleGetOtp}
                  disabled={loading || otpSent}
                >
                  {loading ? 'Sending...' : otpSent ? 'OTP Sent' : 'Get OTP'}
                </button>
              </div>
              {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
            </div>

            {otpSent && (
              <div className="form-group otp-group slide-in">
                <label htmlFor="otp">Enter OTP <span className="required">*</span></label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className={errors.otp ? 'error' : otpVerified ? 'verified' : ''}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    disabled={otpVerified}
                    required
                  />
                  {!otpVerified && (
                    <button
                      type="button"
                      className="verify-button"
                      onClick={handleVerifyOtp}
                    >
                      Verify
                    </button>
                  )}
                  {otpVerified && (
                    <span className="verified-badge">✓ Verified</span>
                  )}
                </div>
                {errors.otp && <span className="error-message">{errors.otp}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="rationCard">Ration Card Number</label>
              <input
                type="text"
                id="rationCard"
                name="rationCard"
                value={formData.rationCard}
                onChange={handleInputChange}
                placeholder="Enter your ration card number (optional)"
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-button primary-button"
            disabled={loading || !otpVerified}
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <div className="login-footer">
          <button onClick={() => navigate('/')} className="back-link">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
