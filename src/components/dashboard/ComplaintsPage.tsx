import { useState, useRef, useEffect } from 'react'
import { Camera, MapPin, CheckCircle, Loader } from 'lucide-react'
import './ComplaintsPage.css'

interface Complaint {
  id: string
  problemType: string
  description: string
  photoUrl: string | null
  gpsLatitude: number
  gpsLongitude: number
  status: string
  createdAt: string
}

const ComplaintsPage = () => {
  const [problemType, setProblemType] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const problemTypes = [
    'Water quality not good',
    'Leakage',
    'Low water pressure',
    'No water supply',
    'Cleaning of water tank'
  ]

  const dummyComplaints: Complaint[] = [
    {
      id: 'C001',
      problemType: 'Leakage',
      description: 'Water leaking from main pipe near the entrance',
      photoUrl: 'https://images.pexels.com/photos/7031706/pexels-photo-7031706.jpeg?auto=compress&cs=tinysrgb&w=200',
      gpsLatitude: 28.6139,
      gpsLongitude: 77.2090,
      status: 'Submitted',
      createdAt: '2025-10-08'
    },
    {
      id: 'C002',
      problemType: 'Low water pressure',
      description: 'Very low water flow during morning hours',
      photoUrl: null,
      gpsLatitude: 28.6142,
      gpsLongitude: 77.2095,
      status: 'Pending',
      createdAt: '2025-10-07'
    },
    {
      id: 'C003',
      problemType: 'Water quality not good',
      description: 'Cloudy water with bad smell',
      photoUrl: 'https://images.pexels.com/photos/7031597/pexels-photo-7031597.jpeg?auto=compress&cs=tinysrgb&w=200',
      gpsLatitude: 28.6145,
      gpsLongitude: 77.2088,
      status: 'Resolved',
      createdAt: '2025-10-05'
    }
  ]

  useEffect(() => {
    fetchLocation()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const fetchLocation = () => {
    setIsLoadingLocation(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error('Error fetching location:', error)
          setLocation({
            lat: 28.6139,
            lng: 77.2090
          })
          setIsLoadingLocation(false)
        }
      )
    } else {
      setLocation({
        lat: 28.6139,
        lng: 77.2090
      })
      setIsLoadingLocation(false)
    }
  }

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      setStream(mediaStream)
      setIsCameraOpen(true)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please check permissions.')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg')
        setPhoto(imageData)

        setShowFlash(true)
        setTimeout(() => setShowFlash(false), 300)

        closeCamera()
      }
    }
  }

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsCameraOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!problemType || !description) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        setProblemType('')
        setDescription('')
        setPhoto(null)
        fetchLocation()
      }, 2500)
    }, 1000)
  }

  return (
    <div className="complaints-page-user">
      <div className="page-header">
        <h2>Report Water Supply Issue</h2>
        <p>Submit complaints about your household water supply</p>
      </div>

      <div className="complaint-form-card">
        <form onSubmit={handleSubmit} className="complaint-form-user">
          <div className="form-group-user">
            <label htmlFor="problemType">Problem Type *</label>
            <select
              id="problemType"
              value={problemType}
              onChange={(e) => setProblemType(e.target.value)}
              required
            >
              <option value="">Select a problem type</option>
              {problemTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group-user">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the issue you're experiencing..."
              rows={4}
              required
            />
          </div>

          <div className="form-group-user">
            <label>Capture Photo</label>
            <div className="photo-capture-section">
              {!isCameraOpen && !photo && (
                <button
                  type="button"
                  className="camera-button"
                  onClick={openCamera}
                >
                  <Camera size={24} />
                  <span>Open Camera</span>
                </button>
              )}

              {isCameraOpen && (
                <div className="camera-container">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="camera-video"
                  />
                  <div className="camera-controls">
                    <button
                      type="button"
                      className="capture-button"
                      onClick={capturePhoto}
                    >
                      <Camera size={20} />
                      Capture
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={closeCamera}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {photo && (
                <div className="photo-preview-user">
                  <img src={photo} alt="Captured" />
                  <button
                    type="button"
                    className="retake-button"
                    onClick={() => {
                      setPhoto(null)
                      openCamera()
                    }}
                  >
                    Retake Photo
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-group-user">
            <label>GPS Location</label>
            {isLoadingLocation ? (
              <div className="location-loading">
                <Loader className="spinner" size={20} />
                <span>Fetching your location...</span>
              </div>
            ) : location ? (
              <div className="location-display-user">
                <MapPin size={18} className="location-icon" />
                <div className="location-coords">
                  <p><strong>Latitude:</strong> {location.lat.toFixed(6)}</p>
                  <p><strong>Longitude:</strong> {location.lng.toFixed(6)}</p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="refresh-location-button"
                onClick={fetchLocation}
              >
                <MapPin size={18} />
                Retry Location
              </button>
            )}
          </div>

          <button
            type="submit"
            className="submit-complaint-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="spinner" size={20} />
                Submitting...
              </>
            ) : (
              'Submit Complaint'
            )}
          </button>
        </form>
      </div>

      <div className="complaints-history">
        <h3>Your Recent Complaints</h3>
        <div className="complaints-grid">
          {dummyComplaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <div className="complaint-card-header">
                <span className={`status-badge-user ${complaint.status.toLowerCase()}`}>
                  {complaint.status}
                </span>
                <span className="complaint-id">{complaint.id}</span>
              </div>

              <div className="complaint-card-body">
                <h4>{complaint.problemType}</h4>
                <p>{complaint.description}</p>

                {complaint.photoUrl && (
                  <div className="complaint-photo-thumbnail">
                    <img src={complaint.photoUrl} alt="Issue" />
                  </div>
                )}

                <div className="complaint-location">
                  <MapPin size={14} />
                  <span>{complaint.gpsLatitude.toFixed(4)}, {complaint.gpsLongitude.toFixed(4)}</span>
                </div>

                <div className="complaint-date">
                  Submitted: {complaint.createdAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showFlash && <div className="camera-flash" />}

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-animation">
            <CheckCircle size={64} className="success-icon" />
            <h3>Complaint Submitted Successfully!</h3>
            <p>We'll address your issue as soon as possible</p>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default ComplaintsPage
