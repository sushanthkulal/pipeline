import { useState, useEffect } from 'react'
import { CheckCircle2, Users, Clock } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import './AdminManagement.css'

interface AdminManagementProps {
  lgdNumber: string
}

interface Staff {
  id: string
  name: string
  role: string
  duty_status: string
}

interface Task {
  task_id: string
  house_no: string
  issue: string
  assigned_to: string | null
  status: string
  staff_name?: string
}

const AdminManagement = ({ lgdNumber }: AdminManagementProps) => {
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [showConfirm, setShowConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [lgdNumber])

  const fetchData = async () => {
    const { data: staffs } = await supabase
      .from('staffs')
      .select('*')
      .eq('panchayat_lgd', lgdNumber)

    if (staffs) {
      setStaffList(staffs)
    }

    const { data: taskData } = await supabase
      .from('tasks')
      .select('*')
      .eq('panchayat_lgd', lgdNumber)
      .order('created_at', { ascending: false })

    if (taskData && staffs) {
      const enriched = taskData.map(task => ({
        ...task,
        staff_name: staffs.find(s => s.id === task.assigned_to)?.name || 'Unassigned'
      }))
      setTasks(enriched)
    }
  }

  const handleMarkComplete = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({
        status: 'Completed',
        completed_at: new Date().toISOString(),
        completed_by: tasks.find(t => t.task_id === taskId)?.assigned_to
      })
      .eq('task_id', taskId)

    if (!error) {
      setShowConfirm(null)
      fetchData()
    }
  }

  const onDutyCount = staffList.filter(s => s.duty_status === 'On Duty').length
  const offDutyCount = staffList.filter(s => s.duty_status === 'Off Duty').length
  const completedCount = tasks.filter(t => t.status === 'Completed').length

  return (
    <div className="admin-management">
      <div className="management-header">
        <h2>Staff & Task Management</h2>
        <div className="header-actions">
          <button className="action-btn">Edit Today Timings</button>
          <button className="action-btn">Add Maintenance</button>
        </div>
      </div>

      <div className="overview-row">
        <div className="overview-card fade-in">
          <Users size={32} />
          <div>
            <h3>{staffList.length}</h3>
            <p>Total Staff</p>
          </div>
        </div>
        <div className="overview-card fade-in delay-1">
          <CheckCircle2 size={32} />
          <div>
            <h3>{onDutyCount}</h3>
            <p>On Duty</p>
          </div>
        </div>
        <div className="overview-card fade-in delay-2">
          <Clock size={32} />
          <div>
            <h3>{offDutyCount}</h3>
            <p>Off Duty</p>
          </div>
        </div>
        <div className="overview-card fade-in delay-3">
          <CheckCircle2 size={32} />
          <div>
            <h3>{completedCount}</h3>
            <p>Tasks Completed</p>
          </div>
        </div>
      </div>

      <div className="management-content">
        <div className="section slide-up">
          <h3>Staff Overview</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Current Task</th>
                  <th>Task Completed</th>
                  <th>Duty Status</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, index) => {
                  const currentTask = tasks.find(
                    t => t.assigned_to === staff.id && t.status !== 'Completed'
                  )
                  return (
                    <tr key={staff.id} style={{ animationDelay: `${index * 0.05}s` }}>
                      <td>{staff.id}</td>
                      <td className="name-cell">{staff.name}</td>
                      <td>{staff.role}</td>
                      <td>{currentTask ? `${currentTask.task_id} - ${currentTask.issue}` : '—'}</td>
                      <td>
                        {currentTask && (
                          <button
                            className="check-btn"
                            onClick={() => setShowConfirm(currentTask.task_id)}
                          >
                            <CheckCircle2 size={20} />
                          </button>
                        )}
                      </td>
                      <td>
                        <span className={`status-badge ${staff.duty_status === 'On Duty' ? 'on-duty' : 'off-duty'}`}>
                          {staff.duty_status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section slide-up delay-1">
          <h3>Task Assignment</h3>
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
                  <tr key={task.task_id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <td>{task.task_id}</td>
                    <td>{task.house_no}</td>
                    <td>{task.issue}</td>
                    <td>{task.staff_name}</td>
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
      </div>

      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-content">
            <h3>Confirm Task Completion</h3>
            <p>Mark task {showConfirm} as completed?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowConfirm(null)}>
                Cancel
              </button>
              <button
                className="btn-confirm"
                onClick={() => handleMarkComplete(showConfirm)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminManagement
