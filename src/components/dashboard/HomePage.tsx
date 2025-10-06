import { Droplets, TrendingUp, Clock, Wrench, AlertCircle, Info } from 'lucide-react'
import './HomePage.css'

const HomePage = () => {
  const waterData = {
    today: { available: 25000, used: 12450 },
    weekly: [
      { day: 'Mon', usage: 11200 },
      { day: 'Tue', usage: 12800 },
      { day: 'Wed', usage: 10500 },
      { day: 'Thu', usage: 13200 },
      { day: 'Fri', usage: 11800 },
      { day: 'Sat', usage: 9600 },
      { day: 'Sun', usage: 12450 }
    ]
  }

  const revenue = { expected: 12000, received: 9500 }
  const schedule = { today: '6:00 AM - 8:00 AM', tomorrow: '7:00 AM - 9:00 AM' }
  const tankCleaning = { last: 'Oct 2, 2025', next: 'Oct 10, 2025' }
  const complaints = { total: 25, pending: 5, inProgress: 8, resolved: 12 }

  const usagePercentage = Math.round((waterData.today.used / waterData.today.available) * 100)
  const revenuePercentage = Math.round((revenue.received / revenue.expected) * 100)
  const maxWeeklyUsage = Math.max(...waterData.weekly.map(d => d.usage))

  return (
    <div className="home-page">
      <div className="stats-grid">
        <div className="stat-card water-card fade-in">
          <div className="card-icon">
            <Droplets size={32} />
          </div>
          <h3>Total Water Today</h3>
          <div className="water-usage">
            <div className="usage-bar">
              <div
                className="usage-fill"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
            <div className="usage-text">
              <span className="used">{waterData.today.used.toLocaleString()} L</span>
              <span className="available">/ {waterData.today.available.toLocaleString()} L</span>
            </div>
            <p className="usage-percentage">{usagePercentage}% Used</p>
          </div>
        </div>

        <div className="stat-card revenue-card fade-in delay-1">
          <div className="card-icon">
            <TrendingUp size={32} />
          </div>
          <h3>Revenue Summary</h3>
          <div className="revenue-details">
            <div className="revenue-item">
              <span className="label">Expected</span>
              <span className="amount expected">₹{revenue.expected.toLocaleString()}</span>
            </div>
            <div className="revenue-item">
              <span className="label">Received</span>
              <span className="amount received">₹{revenue.received.toLocaleString()}</span>
            </div>
            <div className="revenue-progress">
              <div
                className="revenue-bar"
                style={{ width: `${revenuePercentage}%` }}
              />
            </div>
            <p className="revenue-percentage">{revenuePercentage}% Collected</p>
          </div>
        </div>

        <div className="stat-card schedule-card fade-in delay-2">
          <div className="card-icon">
            <Clock size={32} />
          </div>
          <h3>Water Supply Schedule</h3>
          <div className="schedule-list">
            <div className="schedule-item">
              <span className="day">Today</span>
              <span className="time">{schedule.today}</span>
            </div>
            <div className="schedule-item">
              <span className="day">Tomorrow</span>
              <span className="time">{schedule.tomorrow}</span>
            </div>
          </div>
        </div>

        <div className="stat-card tank-card fade-in delay-3">
          <div className="card-icon">
            <Wrench size={32} />
          </div>
          <h3>Tank Maintenance</h3>
          <div className="tank-info">
            <div className="tank-item">
              <span className="label">Last Cleaned</span>
              <span className="date">{tankCleaning.last}</span>
            </div>
            <div className="tank-item">
              <span className="label">Next Cleaning</span>
              <span className="date next">{tankCleaning.next}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card weekly-chart fade-in delay-4">
          <h3>Weekly Water Usage</h3>
          <div className="bar-chart">
            {waterData.weekly.map((day, index) => (
              <div key={index} className="bar-item">
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: `${(day.usage / maxWeeklyUsage) * 100}%` }}
                  />
                </div>
                <span className="bar-label">{day.day}</span>
                <span className="bar-value">{(day.usage / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card complaints-card fade-in delay-5">
          <div className="card-icon">
            <AlertCircle size={28} />
          </div>
          <h3>Complaints Overview</h3>
          <div className="complaints-grid">
            <div className="complaint-stat total">
              <span className="number">{complaints.total}</span>
              <span className="label">Total</span>
            </div>
            <div className="complaint-stat pending">
              <span className="number">{complaints.pending}</span>
              <span className="label">Pending</span>
            </div>
            <div className="complaint-stat progress">
              <span className="number">{complaints.inProgress}</span>
              <span className="label">In Progress</span>
            </div>
            <div className="complaint-stat resolved">
              <span className="number">{complaints.resolved}</span>
              <span className="label">Resolved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section fade-in delay-6">
        <div className="about-card">
          <div className="card-icon">
            <Info size={28} />
          </div>
          <h3>About Smart Water System</h3>
          <p>
            The Smart Water Management System is an initiative by the Gram Panchayat
            to ensure efficient water distribution, transparent billing, and quick
            resolution of water-related issues. Our system monitors daily water usage,
            manages staff operations, and provides real-time updates to ensure every
            household receives adequate clean water supply.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
