import { useState } from 'react'
import { Camera, MapPin, Plus, X } from 'lucide-react'
import './ComplaintsPage.css'

interface Complaint {
  id: string
  type: string
  location: string
  description: string
  assignedTo: string
  status: string
  createdAt: string
}

const ComplaintsPage = () => {
  const [activeTab, setActiveTab] = useState<'household' | 'leakage'>('household')
  const [showAddForm, setShowAddForm] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedStaff, setSelectedStaff] = useState('')
  const [location, setLocation] = useState('')

  const staffList = ['Ramesh', 'Shankar', 'Ravi', 'Manoj']

  const [complaints] = useState<Complaint[]>([
    { id: 'C001', type: 'Leakage', location: 'H005', description: 'Pipe leak in main supply', assignedTo: 'Ramesh', status: 'In Progress', createdAt: '2025-10-05' },
    { id: 'C002', type: 'Household', location: 'H007', description: 'Water pressure low', assignedTo: 'Shankar', status: 'Resolved', createdAt: '2025-10-04' },
    { id: 'C003', type: 'Leakage', location: 'H010', description: 'Tank overflow issue', assignedTo: 'Ravi', status: 'Pending', createdAt: '2025-10-06' },
    { id: 'C004', type: 'Household', location: 'H012', description: 'No water supply', assignedTo: 'Manoj', status: 'In Progress', createdAt: '2025-10-05' },
    { id: 'C005', type: 'Leakage', location: 'H015', description: 'Underground pipe damage', assignedTo: 'Ramesh', status: 'Resolved', createdAt: '2025-10-03' }
  ])

  const handleCameraCapture = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        alert('Photo captured successfully!')
      }
    }
    input.click()
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`)
          alert('Location captured!')
        },
        (error) => {
          alert('Could not get location. Using mock location.')
          setLocation('Lat: 12.9716, Long: 77.5946 (Demo)')
        }
      )
    } else {
      alert('Geolocation not supported. Using mock location.')
      setLocation('Lat: 12.9716, Long: 77.5946 (Demo)')
    }
  }

  const handleSubmit = () => {
    if (!description || !selectedStaff) {
      alert('Please fill all fields')
      return
    }
    alert('Query submitted successfully!')
    setShowAddForm(false)
    setDescription('')
    setSelectedStaff('')
    setLocation('')
  }

  const filteredComplaints = complaints.filter(c =>
    activeTab === 'household' ? c.type === 'Household' : c.type === 'Leakage'
  )

  return (
    <div className="complaints-page">
      <div className="page-header">
        <h2>Queries & Complaints</h2>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          <Plus size={20} />
          Add Query
        </button>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'household' ? 'active' : ''}`}
          onClick={() => setActiveTab('household')}
        >
          Household Issues
        </button>
        <button
          className={`tab-btn ${activeTab === 'leakage' ? 'active' : ''}`}
          onClick={() => setActiveTab('leakage')}
        >
          Leakage Issues
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New {activeTab === 'household' ? 'Household' : 'Leakage'} Issue</h3>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Capture Photo</label>
                <button className="capture-btn" onClick={handleCameraCapture}>
                  <Camera size={20} />
                  Open Camera
                </button>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the issue..."
                  rows={3}
                />
              </div>

              {activeTab === 'leakage' && (
                <div className="form-group">
                  <label>Location</label>
                  <div className="location-group">
                    <input
                      type="text"
                      value={location}
                      readOnly
                      placeholder="Click button to get location"
                    />
                    <button className="location-btn" onClick={handleGetLocation}>
                      <MapPin size={18} />
                      Get GPS
                    </button>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Assign Staff</label>
                <select
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                >
                  <option value="">Select Staff Member</option>
                  {staffList.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit Query
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="complaints-table-section fade-in">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Description</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr key={complaint.id} className="slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>{complaint.id}</td>
                  <td>{complaint.type}</td>
                  <td>{complaint.location}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.assignedTo}</td>
                  <td>
                    <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
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
