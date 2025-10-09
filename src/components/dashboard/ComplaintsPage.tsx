import { useState, useRef } from 'react'
import { Camera, MapPin, Home, Droplet } from 'lucide-react'
import './ComplaintsPage.css'

const ComplaintsPage = () => {
  const [activeTab, setActiveTab] = useState<'household' | 'leakage'>('household')
  const [photo, setPhoto] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [assignedStaff, setAssignedStaff] = useState('')
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const staffList = ['Ramesh', 'Shankar', 'Ravi', 'Kumar', 'Suresh', 'Manoj', 'Anil', 'Vijay']

  const complaints = [
    { id: 'C001', type: 'Leakage', location: 'H005', assignedTo: 'Ramesh', status: 'In Progress' },
    { id: 'C002', type: 'Household', location: 'H007', assignedTo: 'Shankar', status: 'Resolved' },
    { id: 'C003', type: 'Leakage', location: 'H012', assignedTo: 'Kumar', status: 'Pending' },
    { id: 'C004', type: 'Household', location: 'H015', assignedTo: 'Ravi', status: 'In Progress' },
    { id: 'C005', type: 'Leakage', location: 'H020', assignedTo: 'Suresh', status: 'Resolved' },
    { id: 'C006', type: 'Household', location: 'H023', assignedTo: 'Manoj', status: 'Pending' }
  ]

  const handlePhotoCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          alert('Unable to retrieve location. Please enable location services.')
          console.error(error)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Query submitted successfully!')
    setPhoto(null)
    setDescription('')
    setAssignedStaff('')
    setLocation(null)
  }

  return (
    <div className="complaints-page">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'household' ? 'active' : ''}`}
          onClick={() => setActiveTab('household')}
        >
          <Home size={20} />
          Household Issues
        </button>
        <button
          className={`tab ${activeTab === 'leakage' ? 'active' : ''}`}
          onClick={() => setActiveTab('leakage')}
        >
          <Droplet size={20} />
          Leakage Issues
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'leakage' && (
          <div className="form-section fade-in">
            <h3>Report Leakage Issue</h3>
            <form onSubmit={handleSubmit} className="complaint-form">
              <div className="form-group">
                <label>Get Current Location</label>
                <button type="button" onClick={handleGetLocation} className="location-button">
                  <MapPin size={20} />
                  Fetch GPS Location
                </button>
                {location && (
                  <div className="location-display">
                    <p><strong>Latitude:</strong> {location.lat.toFixed(6)}</p>
                    <p><strong>Longitude:</strong> {location.lng.toFixed(6)}</p>
                    <p><strong>Address:</strong> Near H003 (Auto-detected)</p>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="leakDescription">Description</label>
                <textarea
                  id="leakDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the leakage issue..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="assignLeakStaff">Assign Staff</label>
                <select
                  id="assignLeakStaff"
                  value={assignedStaff}
                  onChange={(e) => setAssignedStaff(e.target.value)}
                  required
                >
                  <option value="">Select Staff Member</option>
                  {staffList.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-button">
                Submit Leakage Report
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="complaints-table slide-up">
        <h3>All Complaints</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Assigned To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={complaint.id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>{complaint.id}</td>
                  <td>
                    <span className={`type-badge ${complaint.type.toLowerCase()}`}>
                      {complaint.type}
                    </span>
                  </td>
                  <td>{complaint.location}</td>
                  <td>{complaint.assignedTo}</td>
                  <td>
                    <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                      {complaint.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ComplaintsPage
