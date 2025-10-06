import { useState, useRef } from 'react'
import { Camera, Users, Clock, Wrench } from 'lucide-react'
import './ManagementPage.css'

const ManagementPage = () => {
  const [timings, setTimings] = useState([
    { day: 'Today', startTime: '6:00 AM', endTime: '8:00 AM' },
    { day: 'Tomorrow', startTime: '7:00 AM', endTime: '9:00 AM' }
  ])

  const [tankPhoto, setTankPhoto] = useState<string | null>(null)
  const [photoMetadata, setPhotoMetadata] = useState<{date: string, time: string, location: string} | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const staffData = [
    { id: 'S01', name: 'Ramesh', dutyStatus: 'On Duty', currentTask: 'Pipe repair - H005' },
    { id: 'S02', name: 'Shankar', dutyStatus: 'Off Duty', currentTask: '—' },
    { id: 'S03', name: 'Ravi', dutyStatus: 'On Duty', currentTask: 'Tank inspection' },
    { id: 'S04', name: 'Manoj', dutyStatus: 'Off Duty', currentTask: '—' },
    { id: 'S05', name: 'Kumar', dutyStatus: 'On Duty', currentTask: 'Valve maintenance' },
    { id: 'S06', name: 'Suresh', dutyStatus: 'On Duty', currentTask: 'Meter reading' },
    { id: 'S07', name: 'Anil', dutyStatus: 'Off Duty', currentTask: '—' },
    { id: 'S08', name: 'Vijay', dutyStatus: 'On Duty', currentTask: 'Quality check' }
  ]

  const taskAssignments = [
    { taskId: 'T101', location: 'H008', issue: 'Leakage', assignedTo: 'Ramesh', status: 'In Progress' },
    { taskId: 'T102', location: 'H010', issue: 'Low Pressure', assignedTo: 'Shankar', status: 'Pending' },
    { taskId: 'T103', location: 'H015', issue: 'Pipe Burst', assignedTo: 'Kumar', status: 'In Progress' },
    { taskId: 'T104', location: 'H022', issue: 'No Supply', assignedTo: 'Suresh', status: 'Completed' }
  ]

  const registeredUsers = [
    { houseNo: 'H001', name: 'Priya', contact: '9876543210', usage: 520, purity: 88, status: 'Active' },
    { houseNo: 'H002', name: 'Rajesh', contact: '9001234567', usage: 470, purity: 91, status: 'Active' },
    { houseNo: 'H003', name: 'Lakshmi', contact: '9123456789', usage: 550, purity: 85, status: 'Active' },
    { houseNo: 'H004', name: 'Kiran', contact: '9234567890', usage: 380, purity: 92, status: 'Active' },
    { houseNo: 'H005', name: 'Anita', contact: '9345678901', usage: 620, purity: 87, status: 'Active' },
    { houseNo: 'H006', name: 'Mohan', contact: '9456789012', usage: 450, purity: 90, status: 'Inactive' }
  ]

  const tankCleaning = {
    lastCleaned: 'Oct 1, 2025',
    nextCleaning: 'Oct 10, 2025'
  }

  const onDutyStaff = staffData.filter(s => s.dutyStatus === 'On Duty')
  const offDutyStaff = staffData.filter(s => s.dutyStatus === 'Off Duty')

  const handleTimingChange = (index: number, field: string, value: string) => {
    const newTimings = [...timings]
    newTimings[index] = { ...newTimings[index], [field]: value }
    setTimings(newTimings)
  }

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
        setTankPhoto(reader.result as string)

        const now = new Date()
        const date = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              setPhotoMetadata({
                date,
                time,
                location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
              })
            },
            () => {
              setPhotoMetadata({ date, time, location: 'Location unavailable' })
            }
          )
        } else {
          setPhotoMetadata({ date, time, location: 'Location unavailable' })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="management-page">
      <div className="management-section slide-up">
        <div className="section-header">
          <Users size={24} />
          <h2>Staff Overview</h2>
        </div>
        <div className="total-staff">
          <span className="count">{staffData.length}</span>
          <span className="label">Total Staff Members</span>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Duty Status</th>
                <th>Current Task</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff, index) => (
                <tr key={staff.id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>{staff.id}</td>
                  <td>{staff.name}</td>
                  <td>
                    <span className={`status-badge ${staff.dutyStatus === 'On Duty' ? 'on-duty' : 'off-duty'}`}>
                      {staff.dutyStatus}
                    </span>
                  </td>
                  <td>{staff.currentTask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="management-section slide-up delay-1">
        <div className="section-header">
          <Clock size={24} />
          <h2>Water Supply Timings</h2>
        </div>
        <div className="timing-editor">
          {timings.map((timing, index) => (
            <div key={index} className="timing-row">
              <span className="timing-day">{timing.day}</span>
              <input
                type="time"
                value={timing.startTime}
                onChange={(e) => handleTimingChange(index, 'startTime', e.target.value)}
                className="time-input"
              />
              <span className="to">to</span>
              <input
                type="time"
                value={timing.endTime}
                onChange={(e) => handleTimingChange(index, 'endTime', e.target.value)}
                className="time-input"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="management-section slide-up delay-2">
        <div className="section-header">
          <Wrench size={24} />
          <h2>Tank Maintenance</h2>
        </div>
        <div className="tank-maintenance">
          <div className="cleaning-info">
            <div className="info-item">
              <span className="label">Last Cleaned:</span>
              <span className="value">{tankCleaning.lastCleaned}</span>
            </div>
            <div className="info-item">
              <span className="label">Next Cleaning:</span>
              <span className="value next">{tankCleaning.nextCleaning}</span>
            </div>
          </div>
          <div className="photo-capture">
            <button onClick={handlePhotoCapture} className="capture-button">
              <Camera size={20} />
              Capture Tank Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {tankPhoto && (
              <div className="photo-preview">
                <img src={tankPhoto} alt="Tank" />
                {photoMetadata && (
                  <div className="photo-metadata">
                    <p><strong>Date:</strong> {photoMetadata.date}</p>
                    <p><strong>Time:</strong> {photoMetadata.time}</p>
                    <p><strong>Location:</strong> {photoMetadata.location}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="management-section slide-up delay-3">
        <div className="section-header">
          <h2>Staff Assignment</h2>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Location</th>
                <th>Issue</th>
                <th>Assigned To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {taskAssignments.map((task, index) => (
                <tr key={task.taskId} style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>{task.taskId}</td>
                  <td>{task.location}</td>
                  <td>{task.issue}</td>
                  <td>{task.assignedTo}</td>
                  <td>
                    <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="management-section slide-up delay-4">
        <div className="section-header">
          <h2>Duty Status</h2>
        </div>
        <div className="duty-status-grid">
          <div className="duty-column">
            <h3 className="duty-header on-duty">On Duty ({onDutyStaff.length})</h3>
            <div className="staff-list">
              {onDutyStaff.map(staff => (
                <div key={staff.id} className="staff-item">
                  {staff.name}
                </div>
              ))}
            </div>
          </div>
          <div className="duty-column">
            <h3 className="duty-header off-duty">Off Duty ({offDutyStaff.length})</h3>
            <div className="staff-list">
              {offDutyStaff.map(staff => (
                <div key={staff.id} className="staff-item">
                  {staff.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="management-section slide-up delay-5">
        <div className="section-header">
          <h2>Registered Users</h2>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>House No</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Usage (L)</th>
                <th>Purity (%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map((user, index) => (
                <tr key={user.houseNo} style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>{user.houseNo}</td>
                  <td>{user.name}</td>
                  <td>{user.contact}</td>
                  <td>{user.usage}</td>
                  <td>
                    <span className={`purity-badge ${user.purity >= 90 ? 'excellent' : user.purity >= 85 ? 'good' : 'fair'}`}>
                      {user.purity}%
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
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

export default ManagementPage
