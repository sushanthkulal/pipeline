import { useState } from 'react'
import { Camera, Edit2, Save, X } from 'lucide-react'
import './ManagementPage.css'

interface Staff {
  id: string
  name: string
  dutyStatus: string
  currentTask: string
}

interface RegisteredUser {
  houseNo: string
  name: string
  contact: string
  usage: number
  purity: number
  status: string
}

interface Task {
  taskId: string
  location: string
  issue: string
  assignedTo: string
  status: string
}

interface Timing {
  day: string
  startTime: string
  endTime: string
}

const ManagementPage = () => {
  const [staffs] = useState<Staff[]>([
    { id: 'S01', name: 'Ramesh', dutyStatus: 'On Duty', currentTask: 'Pipe repair - H005' },
    { id: 'S02', name: 'Shankar', dutyStatus: 'Off Duty', currentTask: '' },
    { id: 'S03', name: 'Ravi', dutyStatus: 'On Duty', currentTask: 'Tank inspection' },
    { id: 'S04', name: 'Manoj', dutyStatus: 'Off Duty', currentTask: '' }
  ])

  const [timings, setTimings] = useState<Timing[]>([
    { day: 'Today', startTime: '06:00', endTime: '08:00' },
    { day: 'Tomorrow', startTime: '07:00', endTime: '09:00' }
  ])

  const [editingTiming, setEditingTiming] = useState<string | null>(null)

  const [users] = useState<RegisteredUser[]>([
    { houseNo: 'H001', name: 'Priya', contact: '9876543210', usage: 520, purity: 88, status: 'Active' },
    { houseNo: 'H002', name: 'Rajesh', contact: '9001234567', usage: 470, purity: 91, status: 'Active' },
    { houseNo: 'H003', name: 'Lakshmi', contact: '9123456789', usage: 550, purity: 87, status: 'Active' },
    { houseNo: 'H004', name: 'Kumar', contact: '9234567890', usage: 490, purity: 89, status: 'Active' },
    { houseNo: 'H005', name: 'Anjali', contact: '9345678901', usage: 510, purity: 90, status: 'Active' }
  ])

  const [tasks] = useState<Task[]>([
    { taskId: 'T101', location: 'H008', issue: 'Leakage', assignedTo: 'Ramesh', status: 'In Progress' },
    { taskId: 'T102', location: 'H010', issue: 'Low Pressure', assignedTo: 'Shankar', status: 'Pending' },
    { taskId: 'T103', location: 'H012', issue: 'Pipe Damage', assignedTo: 'Ravi', status: 'Completed' }
  ])

  const handleTimingEdit = (day: string) => {
    setEditingTiming(editingTiming === day ? null : day)
  }

  const handleTimingSave = (day: string) => {
    setEditingTiming(null)
  }

  const handleCameraCapture = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        alert('Photo captured! Date: ' + new Date().toLocaleString())
      }
    }
    input.click()
  }

  const onDutyStaffs = staffs.filter(s => s.dutyStatus === 'On Duty')
  const offDutyStaffs = staffs.filter(s => s.dutyStatus === 'Off Duty')

  return (
    <div className="management-page">
      <section className="management-section fade-in">
        <h2>Staff Overview</h2>
        <div className="staff-summary">
          <div className="summary-badge">Total Staffs: {staffs.length}</div>
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
              {staffs.map((staff, index) => (
                <tr key={staff.id} className="slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>{staff.id}</td>
                  <td>{staff.name}</td>
                  <td>
                    <span className={`status-badge ${staff.dutyStatus === 'On Duty' ? 'on-duty' : 'off-duty'}`}>
                      {staff.dutyStatus}
                    </span>
                  </td>
                  <td>{staff.currentTask || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="management-section fade-in" style={{ animationDelay: '0.1s' }}>
        <h2>Water Supply Timings</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timings.map((timing, index) => (
                <tr key={timing.day} className="slide-up" style={{ animationDelay: `${0.15 + index * 0.05}s` }}>
                  <td>{timing.day}</td>
                  <td>
                    {editingTiming === timing.day ? (
                      <input
                        type="time"
                        value={timing.startTime}
                        onChange={(e) => {
                          const newTimings = [...timings]
                          const idx = newTimings.findIndex(t => t.day === timing.day)
                          newTimings[idx].startTime = e.target.value
                          setTimings(newTimings)
                        }}
                        className="time-input"
                      />
                    ) : (
                      timing.startTime
                    )}
                  </td>
                  <td>
                    {editingTiming === timing.day ? (
                      <input
                        type="time"
                        value={timing.endTime}
                        onChange={(e) => {
                          const newTimings = [...timings]
                          const idx = newTimings.findIndex(t => t.day === timing.day)
                          newTimings[idx].endTime = e.target.value
                          setTimings(newTimings)
                        }}
                        className="time-input"
                      />
                    ) : (
                      timing.endTime
                    )}
                  </td>
                  <td>
                    {editingTiming === timing.day ? (
                      <div className="action-buttons">
                        <button className="action-btn save" onClick={() => handleTimingSave(timing.day)}>
                          <Save size={16} />
                        </button>
                        <button className="action-btn cancel" onClick={() => setEditingTiming(null)}>
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button className="action-btn edit" onClick={() => handleTimingEdit(timing.day)}>
                        <Edit2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="management-section fade-in" style={{ animationDelay: '0.2s' }}>
        <h2>Tank Maintenance</h2>
        <div className="maintenance-card">
          <div className="maintenance-dates">
            <div className="date-item">
              <span className="date-label">Last Cleaned</span>
              <span className="date-value">01 Oct 2025</span>
            </div>
            <div className="date-item">
              <span className="date-label">Next Cleaning</span>
              <span className="date-value">10 Oct 2025</span>
            </div>
          </div>
          <button className="camera-btn" onClick={handleCameraCapture}>
            <Camera size={20} />
            Capture Tank Photo
          </button>
        </div>
      </section>

      <section className="management-section fade-in" style={{ animationDelay: '0.3s' }}>
        <h2>Staff Assignment</h2>
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
              {tasks.map((task, index) => (
                <tr key={task.taskId} className="slide-up" style={{ animationDelay: `${0.35 + index * 0.05}s` }}>
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
      </section>

      <section className="management-section fade-in" style={{ animationDelay: '0.4s' }}>
        <h2>Duty Status</h2>
        <div className="duty-grid">
          <div className="duty-column on-duty">
            <h3>On Duty</h3>
            <div className="duty-list">
              {onDutyStaffs.map(staff => (
                <div key={staff.id} className="duty-item">
                  {staff.name}
                </div>
              ))}
            </div>
          </div>
          <div className="duty-column off-duty">
            <h3>Off Duty</h3>
            <div className="duty-list">
              {offDutyStaffs.map(staff => (
                <div key={staff.id} className="duty-item">
                  {staff.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="management-section fade-in" style={{ animationDelay: '0.5s' }}>
        <h2>Registered Users</h2>
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
              {users.map((user, index) => (
                <tr key={user.houseNo} className="slide-up" style={{ animationDelay: `${0.55 + index * 0.05}s` }}>
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
                    <span className="status-badge active">{user.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default ManagementPage
