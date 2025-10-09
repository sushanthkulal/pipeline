import { useState, useEffect } from 'react'
import { Droplets, TrendingUp, Clock, Wrench, AlertCircle, Info } from 'lucide-react'
import './HomePage.css'

const HomePage = () => {
  const [waterData, setWaterData] = useState({
    available: 0,
    used: 0
  })

  const [counts, setCounts] = useState({
    expected: 0,
    received: 0,
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  })

  useEffect(() => {
    const animateCount = (target: number, setter: (val: number) => void, duration: number) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
      }, 16)
    }

    animateCount(25000, (val) => setWaterData(prev => ({ ...prev, available: val })), 1500)
    animateCount(12450, (val) => setWaterData(prev => ({ ...prev, used: val })), 1500)
    animateCount(12000, (val) => setCounts(prev => ({ ...prev, expected: val })), 1200)
    animateCount(9500, (val) => setCounts(prev => ({ ...prev, received: val })), 1200)
    animateCount(25, (val) => setCounts(prev => ({ ...prev, total: val })), 1000)
    animateCount(5, (val) => setCounts(prev => ({ ...prev, pending: val })), 1000)
    animateCount(8, (val) => setCounts(prev => ({ ...prev, inProgress: val })), 1000)
    animateCount(12, (val) => setCounts(prev => ({ ...prev, resolved: val })), 1000)
  }, [])

  const weeklyData = [
    { day: 'Mon', usage: 4000 },
    { day: 'Tue', usage: 3800 },
    { day: 'Wed', usage: 4200 },
    { day: 'Thu', usage: 3600 },
    { day: 'Fri', usage: 4100 },
    { day: 'Sat', usage: 3900 },
    { day: 'Sun', usage: 3200 }
  ]

  const maxUsage = Math.max(...weeklyData.map(d => d.usage))
  const usagePercentage = (waterData.used / waterData.available) * 100

  return (
    <div className="home-page">
      <div className="cards-grid">
        <div className="stat-card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="card-icon water">
            <Droplets size={28} />
          </div>
          <div className="card-content">
            <h3>Total Water (Today)</h3>
            <div className="water-stats">
              <div className="stat-item">
                <span className="stat-label">Available</span>
                <span className="stat-value">{waterData.available.toLocaleString()} L</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Used</span>
                <span className="stat-value">{waterData.used.toLocaleString()} L</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${usagePercentage}%` }}></div>
            </div>
            <p className="usage-text">{usagePercentage.toFixed(1)}% utilized</p>
          </div>
        </div>

        <div className="stat-card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="card-icon revenue">
            <TrendingUp size={28} />
          </div>
          <div className="card-content">
            <h3>Revenue Summary</h3>
            <div className="revenue-stats">
              <div className="revenue-item">
                <span className="label">Expected</span>
                <span className="amount expected">₹{counts.expected.toLocaleString()}</span>
              </div>
              <div className="revenue-item">
                <span className="label">Received</span>
                <span className="amount received">₹{counts.received.toLocaleString()}</span>
              </div>
            </div>
            <div className="revenue-progress">
              <div className="revenue-bar" style={{ width: `${(counts.received / counts.expected) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="stat-card fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="card-icon schedule">
            <Clock size={28} />
          </div>
          <div className="card-content">
            <h3>Water Supply Schedule</h3>
            <div className="schedule-list">
              <div className="schedule-item">
                <span className="day">Today</span>
                <span className="time">6:00 AM - 8:00 AM</span>
              </div>
              <div className="schedule-item">
                <span className="day">Tomorrow</span>
                <span className="time">7:00 AM - 9:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="card-icon maintenance">
            <Wrench size={28} />
          </div>
          <div className="card-content">
            <h3>Tank Maintenance</h3>
            <div className="maintenance-info">
              <div className="maintenance-item">
                <span className="label">Last Cleaned</span>
                <span className="date">Oct 2, 2025</span>
              </div>
              <div className="maintenance-item">
                <span className="label">Next Cleaning</span>
                <span className="date">Oct 10, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card fade-in" style={{ animationDelay: '0.5s' }}>
          <h3>Weekly Water Usage</h3>
          <div className="bar-chart">
            {weeklyData.map((item, index) => (
              <div key={item.day} className="bar-container">
                <div
                  className="bar"
                  style={{
                    height: `${(item.usage / maxUsage) * 100}%`,
                    animationDelay: `${0.6 + index * 0.1}s`
                  }}
                >
                  <span className="bar-value">{(item.usage / 1000).toFixed(1)}k</span>
                </div>
                <span className="bar-label">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card fade-in" style={{ animationDelay: '0.6s' }}>
          <h3>
            <AlertCircle size={20} />
            Complaints Overview
          </h3>
          <div className="complaints-grid">
            <div className="complaint-stat total">
              <span className="count">{counts.total}</span>
              <span className="label">Total</span>
            </div>
            <div className="complaint-stat pending">
              <span className="count">{counts.pending}</span>
              <span className="label">Pending</span>
            </div>
            <div className="complaint-stat progress">
              <span className="count">{counts.inProgress}</span>
              <span className="label">In Progress</span>
            </div>
            <div className="complaint-stat resolved">
              <span className="count">{counts.resolved}</span>
              <span className="label">Resolved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section fade-in" style={{ animationDelay: '0.7s' }}>
        <div className="about-icon">
          <Info size={32} />
        </div>
        <div className="about-content">
          <h3>About Smart Water System</h3>
          <p>
            Our Smart Water Management System empowers Gram Panchayats with real-time monitoring,
            efficient resource allocation, and transparent operations. Track water distribution,
            manage staff duties, resolve complaints promptly, and ensure every household receives
            clean water consistently. Together, we're building a sustainable future for rural India.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
