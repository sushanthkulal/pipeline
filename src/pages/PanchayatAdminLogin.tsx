import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './PanchayatAdminLogin.css'

interface PanchayatData {
  lgd_number: string
  state: string
  district: string
  name: string
  contact: string
}

const PanchayatAdminLogin = () => {
  const [state, setState] = useState('Karnataka')
  const [district, setDistrict] = useState('Dakshina Kannada')
  const [lgdNumber, setLgdNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validateLGD = (lgd: string): boolean => {
    return /^\d{6}$/.test(lgd)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateLGD(lgdNumber)) {
      setError('LGD number must be exactly 6 digits')
      return
    }

    setLoading(true)

    try {
      const { data, error: fetchError } = await supabase
        .from('panchayats')
        .select('*')
        .eq('lgd_number', lgdNumber)
        .eq('state', state)
        .eq('district', district)
        .maybeSingle()

      if (fetchError) {
        throw fetchError
      }

      if (!data) {
        setError('Panchayat not found. Please check your LGD number and try again.')
        setLoading(false)
        return
      }

      setSuccess(true)

      setTimeout(() => {
        const panchayatData: PanchayatData = data
        sessionStorage.setItem('panchayat', JSON.stringify(panchayatData))
        navigate('/panchayat-admin-dashboard')
      }, 800)
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="panchayat-admin-login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Panchayat Admin Portal</h1>
            <p>Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group slide-up">
              <label htmlFor="state">State</label>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>

            <div className="form-group slide-up delay-1">
              <label htmlFor="district">District</label>
              <select
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                <option value="Dakshina Kannada">Dakshina Kannada</option>
                <option value="Udupi">Udupi</option>
                <option value="Mangalore">Mangalore</option>
              </select>
            </div>

            <div className="form-group slide-up delay-2">
              <label htmlFor="lgd">LGD Number (6 digits)</label>
              <input
                type="text"
                id="lgd"
                placeholder="462103"
                value={lgdNumber}
                onChange={(e) => setLgdNumber(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            {error && (
              <div className="error-toast fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`login-button slide-up delay-3 ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
              disabled={loading || success}
            >
              {loading && !success && (
                <>
                  <Loader2 className="spinner" size={20} />
                  Validating...
                </>
              )}
              {success && (
                <>
                  <CheckCircle2 size={20} />
                  Success!
                </>
              )}
              {!loading && !success && 'Login to Dashboard'}
            </button>
          </form>

          <div className="login-footer">
            <p>Dummy example: LGD 462103</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanchayatAdminLogin
