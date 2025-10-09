import { useState, useRef } from 'react'
import { Camera, MapPin, Calendar, AlertCircle } from 'lucide-react'
import './MaintenancePage.css'

const MaintenancePage = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [imageDetails, setImageDetails] = useState<{
    date: string
    time: string
    location: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const lastCleaning = '18 Sep 2025'
  const daysSinceCleaning = 22

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCapturedImage(reader.result as string)

        const now = new Date()
        const date = now.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
        const time = now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const location = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
              setImageDetails({ date, time, location })
            },
            () => {
              setImageDetails({ date, time, location: 'Location unavailable' })
            }
          )
        } else {
          setImageDetails({ date, time, location: 'Location unavailable' })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (capturedImage && imageDetails) {
      alert('Maintenance proof submitted successfully!')
      setCapturedImage(null)
      setImageDetails(null)
    }
  }

  return (
    <div className="maintenance-page">
      <div className="page-header">
        <h2>Tank Maintenance</h2>
        <p>Track and document water tank cleaning activities</p>
      </div>

      <div className="maintenance-info fade-in">
        <div className="info-card">
          <div className="info-icon">
            <Calendar size={32} />
          </div>
          <div className="info-content">
            <h3>Last Cleaning Date</h3>
            <p className="date">{lastCleaning}</p>
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

      <div className="upload-section fade-in delay-1">
        <div className="upload-card">
          <h3>Upload Cleaning Proof</h3>
          <p className="upload-description">
            Capture a photo of the cleaned tank. The system will automatically record the date, time, and GPS location.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
          />

          <button className="camera-button" onClick={handleCameraClick}>
            <Camera size={24} />
            <span>Capture Photo</span>
          </button>

          {capturedImage && imageDetails && (
            <div className="preview-section slide-in">
              <h4>Captured Image</h4>
              <div className="image-preview">
                <img src={capturedImage} alt="Cleaning proof" />
              </div>

              <div className="image-details">
                <div className="detail-item">
                  <Calendar size={18} />
                  <span>Date: {imageDetails.date}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={18} />
                  <span>Time: {imageDetails.time}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={18} />
                  <span>Location: {imageDetails.location}</span>
                </div>
              </div>

              <button className="submit-button" onClick={handleSubmit}>
                Submit Cleaning Proof
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="maintenance-tips fade-in delay-2">
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
