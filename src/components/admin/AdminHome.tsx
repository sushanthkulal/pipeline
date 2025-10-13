import { useEffect, useState } from 'react'
import { Droplets, TrendingUp, IndianRupee, Clock, AlertTriangle, MessageSquare } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import './AdminHome.css'

interface AdminHomeProps {
  lgdNumber: string
}

interface WaterMetric {
  total_available: number
  total_used: number
  updated_at: string
}

interface WeeklyUsage {
  day: string
  usage: number
}

const AdminHome = ({ lgdNumber }: AdminHomeProps) => {
  const [waterMetric, setWaterMetric] = useState<WaterMetric | null>(null)
  const [weeklyUsage, setWeeklyUsage] = useState<WeeklyUsage[]>([])
  const [revenue, setRevenue] = useState({ expected: 12000, received: 9500 })
  const [complaints, setComplaints] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 })
  const [tankInfo, setTankInfo] = useState({ lastCleaned: '01 Oct 2025', nextCleaning: '10 Oct 2025', overdue: false })

  useEffect(() => {
    fetchData()
  }, [lgdNumber])

  const fetchData = async () => {
    const today = new Date().toISOString().split('T')[0]

    const { data: metrics } = await supabase
      .from('water_metrics')
      .select('*')
      .eq('panchayat_lgd', lgdNumber)
      .eq('date', today)
      .maybeSingle()

    if (metrics) {
      setWaterMetric(metrics)
    }

    const { data: weeklyData } = await supabase
      .from('water_metrics')
      .select('*')
      .eq('panchayat_lgd', lgdNumber)
      .order('date', { ascending: false })
      .limit(7)

    if (weeklyData) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const formatted = weeklyData.reverse().map(d => ({
        day: days[new Date(d.date).getDay()],
        usage: d.total_used
      }))
      setWeeklyUsage(formatted)
    }

    const { data: complaintsData } = await supabase
      .from('admin_complaints')
      .select('status')
      .eq('panchayat_lgd', lgdNumber)

    if (complaintsData) {
      const stats = {
        total: complaintsData.length,
        pending: complaintsData.filter(c => c.status === 'Pending').length,
        inProgress: complaintsData.filter(c => c.status === 'In Progress').length,
        resolved: complaintsData.filter(c => c.status === 'Resolved').length
      }
      setComplaints(stats)
    }
  }

  const usagePercent = waterMetric
    ? Math.round((waterMetric.total_used / waterMetric.total_available) * 100)
    : 0

  const revenuePercent = Math.round((revenue.received / revenue.expected) * 100)
  const maxWeeklyUsage = Math.max(...weeklyUsage.map(w => w.usage), 1)

  return (
    <div className="admin-home">
      <div className="home-grid">
        <div className="card water-available fade-in">
          <div className="card-header">
            <Droplets size={28} />
            <h3>Total Water Available (Today)</h3>
          </div>
          <div className="progress-ring-container">
            <svg className="progress-ring" width="180" height="180">
              <circle
                cx="90"
                cy="90"
                r="70"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              <circle
                cx="90"
                cy="90"
                r="70"
                fill="none"
                stroke="#007bff"
                strokeWidth="12"
                strokeDasharray={`${usagePercent * 4.4} 440`}
                strokeLinecap="round"
                transform="rotate(-90 90 90)"
                className="progress-circle"
              />
            </svg>
            <div className="progress-content">
              <div className="usage-text">
                <p className="used">{waterMetric?.total_used.toLocaleString() || 0}L</p>
                <p className="total">of {waterMetric?.total_available.toLocaleString() || 0}L</p>
              </div>
            </div>
          </div>
          <p className="usage-percent">{usagePercent}% Used Today</p>
        </div>

        <div className="card current-usage fade-in delay-1">
          <div className="card-header">
            <TrendingUp size={28} />
            <h3>Current Water Usage (Daily)</h3>
          </div>
          <div className="metric-value">
            <span className="count-up">{waterMetric?.total_used.toLocaleString() || 0}</span>
            <span className="unit">Litres</span>
          </div>
          <div className="sparkline">
            {weeklyUsage.slice(-5).map((d, i) => (
              <div
                key={i}
                className="spark-bar"
                style={{ height: `${(d.usage / maxWeeklyUsage) * 100}%` }}
              />
            ))}
          </div>
          <p className="update-time">Updated: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        <div className="card weekly-usage fade-in delay-2">
          <div className="card-header">
            <Droplets size={28} />
            <h3>Weekly Usage</h3>
          </div>
          <div className="bar-chart">
            {weeklyUsage.map((data, index) => (
              <div key={index} className="bar-item">
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: `${(data.usage / maxWeeklyUsage) * 100}%` }}
                  />
                </div>
                <span className="bar-label">{data.day}</span>
                <span className="bar-value">{(data.usage / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card revenue-summary fade-in delay-3">
          <div className="card-header">
            <IndianRupee size={28} />
            <h3>Revenue Summary</h3>
          </div>
          <div className="revenue-stats">
            <div className="stat-row">
              <span>Expected this month:</span>
              <strong>₹{revenue.expected.toLocaleString()}</strong>
            </div>
            <div className="stat-row">
              <span>Received:</span>
              <strong className="success">₹{revenue.received.toLocaleString()}</strong>
            </div>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${revenuePercent}%` }}
            />
          </div>
          <p className="progress-text">{revenuePercent}% collected</p>
        </div>

        <div className="card water-schedule fade-in delay-4">
          <div className="card-header">
            <Clock size={28} />
            <h3>Water Schedule</h3>
          </div>
          <div className="schedule-list">
            <div className="schedule-item today">
              <span className="schedule-label">Today</span>
              <span className="schedule-time">6:00-8:00 AM, 5:00-7:00 PM</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-label">Tomorrow</span>
              <span className="schedule-time">7:00-9:00 AM, 6:00-8:00 PM</span>
            </div>
          </div>
          <button className="edit-schedule-btn">Edit Schedule</button>
        </div>

        <div className={`card tank-cleaning fade-in delay-5 ${tankInfo.overdue ? 'alert' : ''}`}>
          <div className="card-header">
            <AlertTriangle size={28} />
            <h3>Tank Cleaning Summary</h3>
          </div>
          <div className="cleaning-info">
            <div className="info-row">
              <span>Last cleaned:</span>
              <strong>{tankInfo.lastCleaned}</strong>
            </div>
            <div className="info-row">
              <span>Next cleaning:</span>
              <strong>{tankInfo.nextCleaning}</strong>
            </div>
          </div>
          {tankInfo.overdue && (
            <div className="alert-badge">
              Tank not cleaned for 22 days
            </div>
          )}
        </div>

        <div className="card complaints-summary fade-in delay-6">
          <div className="card-header">
            <MessageSquare size={28} />
            <h3>Complaints Summary</h3>
          </div>
          <div className="donut-chart">
            <svg viewBox="0 0 200 200" className="donut">
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#22c55e"
                strokeWidth="30"
                strokeDasharray={`${(complaints.resolved / complaints.total || 0) * 440} 440`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="30"
                strokeDasharray={`${(complaints.inProgress / complaints.total || 0) * 440} 440`}
                strokeDashoffset={`-${(complaints.resolved / complaints.total || 0) * 440}`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#ef4444"
                strokeWidth="30"
                strokeDasharray={`${(complaints.pending / complaints.total || 0) * 440} 440`}
                strokeDashoffset={`-${((complaints.resolved + complaints.inProgress) / complaints.total || 0) * 440}`}
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="donut-center">
              <span className="total-count">{complaints.total}</span>
              <span className="total-label">Total</span>
            </div>
          </div>
          <div className="complaints-legend">
            <div className="legend-item">
              <span className="dot resolved"></span>
              <span>Resolved ({complaints.resolved})</span>
            </div>
            <div className="legend-item">
              <span className="dot progress"></span>
              <span>In Progress ({complaints.inProgress})</span>
            </div>
            <div className="legend-item">
              <span className="dot pending"></span>
              <span>Pending ({complaints.pending})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
