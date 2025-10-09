import { Droplets, TrendingUp, Clock, Activity, CreditCard, Wrench } from 'lucide-react'
import './HomePage.css'

const HomePage = () => {
  const waterData = {
    limit: 500,
    used: 375,
    currentMonth: 11250,
    lastMonth: 12100,
    average: 380
  }

  const qualityData = {
    ph: 7.2,
    tds: 250,
    turbidity: 4,
    chlorine: 0.6
  }

  const schedule = {
    today: '6:00-8:00 AM, 5:00-7:00 PM',
    tomorrow: '7:00-9:00 AM, 6:00-8:00 PM',
    dayAfterTomorrow: '6:00-8:00 AM, 5:00-7:00 PM'
  }

  const purityData = [
    { time: '00:00', purity: 92 },
    { time: '04:00', purity: 94 },
    { time: '08:00', purity: 91 },
    { time: '12:00', purity: 89 },
    { time: '16:00', purity: 93 },
    { time: '20:00', purity: 95 },
    { time: '24:00', purity: 94 }
  ]

  const recentActivities = [
    { type: 'bill', message: 'Water bill generated for September', time: '2 days ago' },
    { type: 'quality', message: 'Water quality check completed', time: '5 days ago' },
    { type: 'maintenance', message: 'Scheduled maintenance completed', time: '1 week ago' }
  ]

  const usagePercentage = Math.round((waterData.used / waterData.limit) * 100)
  const monthlyChange = Math.round(((waterData.currentMonth - waterData.lastMonth) / waterData.lastMonth) * 100)

  const calculateQualityScore = (param: number, max: number) => {
    return Math.min((param / max) * 100, 100)
  }

  const phScore = 100 - Math.abs(qualityData.ph - 7) * 10
  const tdsScore = calculateQualityScore(qualityData.tds, 500)
  const turbidityScore = calculateQualityScore(qualityData.turbidity, 5)
  const chlorineScore = calculateQualityScore(qualityData.chlorine, 1)

  const maxPurity = Math.max(...purityData.map(d => d.purity))

  return (
    <div className="home-page">
      <div className="top-section">
        <div className="usage-circle-card fade-in">
          <h3>Water Usage Today</h3>
          <div className="circle-container">
            <svg viewBox="0 0 200 200" className="usage-circle">
              <circle cx="100" cy="100" r="80" className="circle-bg" />
              <circle
                cx="100"
                cy="100"
                r="80"
                className="circle-progress"
                style={{
                  strokeDasharray: `${usagePercentage * 5.03} 503`,
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'center'
                }}
              />
            </svg>
            <div className="circle-content">
              <div className="usage-value">{waterData.used}L</div>
              <div className="usage-limit">of {waterData.limit}L</div>
            </div>
          </div>
          <p className="usage-message">
            You've used {usagePercentage}% of your daily limit.
          </p>
        </div>

        <div className="quality-snapshot fade-in delay-1">
          <h3>Quality Snapshot</h3>
          <div className="quality-grid">
            <div className="quality-item">
              <div className="donut-chart">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="donut-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="donut-progress ph"
                    style={{ strokeDasharray: `${phScore * 2.51} 251` }}
                  />
                </svg>
                <div className="donut-label">{Math.round(phScore)}%</div>
              </div>
              <span className="param-name">pH</span>
            </div>
            <div className="quality-item">
              <div className="donut-chart">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="donut-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="donut-progress tds"
                    style={{ strokeDasharray: `${(100 - tdsScore) * 2.51} 251` }}
                  />
                </svg>
                <div className="donut-label">{Math.round(100 - tdsScore)}%</div>
              </div>
              <span className="param-name">TDS</span>
            </div>
            <div className="quality-item">
              <div className="donut-chart">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="donut-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="donut-progress turbidity"
                    style={{ strokeDasharray: `${(100 - turbidityScore) * 2.51} 251` }}
                  />
                </svg>
                <div className="donut-label">{Math.round(100 - turbidityScore)}%</div>
              </div>
              <span className="param-name">Turbidity</span>
            </div>
            <div className="quality-item">
              <div className="donut-chart">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="donut-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="donut-progress chlorine"
                    style={{ strokeDasharray: `${(100 - chlorineScore) * 2.51} 251` }}
                  />
                </svg>
                <div className="donut-label">{Math.round(100 - chlorineScore)}%</div>
              </div>
              <span className="param-name">Chlorine</span>
            </div>
          </div>
        </div>
      </div>

      <div className="middle-section">
        <div className="schedule-card fade-in delay-2">
          <div className="card-icon">
            <Clock size={28} />
          </div>
          <h3>Water Schedule</h3>
          <div className="schedule-list">
            <div className="schedule-item">
              <span className="day">Today</span>
              <span className="time">{schedule.today}</span>
            </div>
            <div className="schedule-item">
              <span className="day">Tomorrow</span>
              <span className="time">{schedule.tomorrow}</span>
            </div>
            <div className="schedule-item">
              <span className="day">Day After</span>
              <span className="time">{schedule.dayAfterTomorrow}</span>
            </div>
          </div>
        </div>

        <div className="purity-graph-card fade-in delay-3">
          <div className="card-icon">
            <Activity size={28} />
          </div>
          <h3>Water Purity (24 Hours)</h3>
          <div className="line-chart">
            <div className="chart-grid">
              {[100, 75, 50, 25, 0].map((val) => (
                <div key={val} className="grid-line">
                  <span className="grid-label">{val}%</span>
                </div>
              ))}
            </div>
            <svg viewBox="0 0 300 150" className="line-svg" preserveAspectRatio="none">
              <polyline
                points={purityData.map((d, i) => `${(i * 50)},${150 - ((d.purity - 85) / 15) * 150}`).join(' ')}
                className="line-path"
              />
            </svg>
            <div className="x-axis">
              {purityData.map((d, i) => (
                <span key={i} className="x-label">{d.time}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="stats-overview fade-in delay-4">
          <h3>Usage Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">This Month</div>
              <div className="stat-value">{waterData.currentMonth}L</div>
              <div className={`stat-change ${monthlyChange < 0 ? 'positive' : 'negative'}`}>
                {monthlyChange > 0 ? '+' : ''}{monthlyChange}% from last month
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Daily Average</div>
              <div className="stat-value">{waterData.average}L</div>
              <div className="stat-change neutral">Based on 30 days</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Last Month</div>
              <div className="stat-value">{waterData.lastMonth}L</div>
              <div className="stat-change neutral">September 2024</div>
            </div>
          </div>
        </div>

        <div className="activity-feed fade-in delay-5">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'bill' && <CreditCard size={18} />}
                  {activity.type === 'quality' && <Droplets size={18} />}
                  {activity.type === 'maintenance' && <Wrench size={18} />}
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
