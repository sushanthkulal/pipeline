import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import './AdminComplaints.css'

interface AdminComplaintsProps {
  lgdNumber: string
}

interface Complaint {
  id: string
  house_no: string
  type: string
  description: string
  gps_lat: number | null
  gps_lon: number | null
  status: string
  assigned_to: string | null
  submitted_at: string
  staff_name?: string
}

const AdminComplaints = ({ lgdNumber }: AdminComplaintsProps) => {
  const [complaints, setComplaints] = useState<Complaint[]>([])

  useEffect(() => {
    fetchComplaints()
  }, [lgdNumber])

  const fetchComplaints = async () => {
    const { data: complaintsData } = await supabase
      .from('admin_complaints')
      .select('*')
      .eq('panchayat_lgd', lgdNumber)
      .order('submitted_at', { ascending: false })

    const { data: staffs } = await supabase
      .from('staffs')
      .select('*')
      .eq('panchayat_lgd', lgdNumber)

    if (complaintsData && staffs) {
      const enriched = complaintsData.map(c => ({
        ...c,
        staff_name: c.assigned_to ? staffs.find(s => s.id === c.assigned_to)?.name : 'Unassigned'
      }))
      setComplaints(enriched)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'resolved'
      case 'In Progress':
        return 'in-progress'
      default:
        return 'pending'
    }
  }

  return (
    <div className="admin-complaints">
      <div className="complaints-header">
        <h2>Queries & Complaints</h2>
        <div className="filters">
          <input type="search" placeholder="Search by ID or House No..." className="search-input" />
        </div>
      </div>

      <div className="complaints-content">
        <div className="complaints-list slide-up">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Type</th>
                  <th>House No</th>
                  <th>Description</th>
                  <th>GPS Location</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, index) => (
                  <tr key={complaint.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className="id-cell">{complaint.id}</td>
                    <td>{complaint.type}</td>
                    <td>{complaint.house_no}</td>
                    <td className="desc-cell">{complaint.description}</td>
                    <td>
                      {complaint.gps_lat && complaint.gps_lon ? (
                        <div className="gps-cell">
                          <MapPin size={14} />
                          {complaint.gps_lat.toFixed(4)}N, {complaint.gps_lon.toFixed(4)}E
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>{complaint.staff_name}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td>{new Date(complaint.submitted_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminComplaints
