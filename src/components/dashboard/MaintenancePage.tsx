import { Droplet, MapPin, Calendar, AlertCircle, Clock } from 'lucide-react'
import './MaintenancePage.css'

const MaintenancePage = () => {
  const waterSource = 'Borewell'
  const tankLocation = 'Behind Community Hall, Near Main Road'
  const lastCleaning = '18 Sep 2025'
  const nextCleaning = '8 Oct 2025'
  const daysSinceCleaning = 22

  return (
    <div className="maintenance-page">
      <div className="page-header">
        <h2>Tank Maintenance</h2>
        <p>Track and document water tank cleaning activities</p>
      </div>

      <div className="maintenance-info fade-in">
        <div className="info-card">
          <div className="info-icon">
            <Droplet size={32} />
          </div>
          <div className="info-content">
            <h3>Water Source</h3>
            <p className="date">{waterSource}</p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <MapPin size={32} />
          </div>
          <div className="info-content">
            <h3>Tank Location</h3>
            <p className="location-text">{tankLocation}</p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <Calendar size={32} />
          </div>
          <div className="info-content">
            <h3>Last Cleaned</h3>
            <p className="date">{lastCleaning}</p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <Clock size={32} />
          </div>
          <div className="info-content">
            <h3>Next Cleaning Due</h3>
            <p className="date">{nextCleaning}</p>
          </div>
        </div>

        <div className="info-card warning">
          <div className="info-icon warning">
            <AlertCircle size={32} />
          </div>
          <div className="info-content">
            <h3>Cleaning Status</h3>
            <p className="warning-text">Tank not cleaned for {daysSinceCleaning} days</p>
          </div>
        </div>
      </div>

      <div className="maintenance-tips fade-in delay-1">
        <h3>Maintenance Guidelines</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Regular Cleaning</h4>
            <p>Water tanks should be cleaned every 15-20 days to maintain water quality and prevent contamination.</p>
          </div>
          <div className="tip-card">
            <h4>Documentation</h4>
            <p>Always document cleaning activities with photos and timestamps for transparency and record-keeping.</p>
          </div>
          <div className="tip-card">
            <h4>Quality Check</h4>
            <p>After cleaning, verify water quality parameters to ensure the water is safe for consumption.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenancePage
