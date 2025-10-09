import { useState, useEffect } from 'react'
import { DollarSign, FileText, AlertCircle, TrendingUp } from 'lucide-react'
import './BillingPage.css'

interface Bill {
  houseNo: string
  name: string
  amount: number
  dueDate: string
  status: string
  paymentMode: string
}

const BillingPage = () => {
  const [counts, setCounts] = useState({
    totalRevenue: 0,
    totalBills: 0,
    overdueBills: 0
  })

  const [bills] = useState<Bill[]>([
    { houseNo: 'H001', name: 'Priya', amount: 250, dueDate: '2025-10-03', status: 'Paid', paymentMode: 'UPI' },
    { houseNo: 'H002', name: 'Rajesh', amount: 275, dueDate: '2025-10-05', status: 'Pending', paymentMode: '' },
    { houseNo: 'H003', name: 'Lakshmi', amount: 240, dueDate: '2025-10-04', status: 'Paid', paymentMode: 'Cash' },
    { houseNo: 'H004', name: 'Kumar', amount: 260, dueDate: '2025-10-06', status: 'Pending', paymentMode: '' },
    { houseNo: 'H005', name: 'Anjali', amount: 255, dueDate: '2025-10-03', status: 'Paid', paymentMode: 'UPI' },
    { houseNo: 'H006', name: 'Suresh', amount: 270, dueDate: '2025-10-07', status: 'Pending', paymentMode: '' },
    { houseNo: 'H007', name: 'Meena', amount: 245, dueDate: '2025-10-02', status: 'Paid', paymentMode: 'Bank Transfer' },
    { houseNo: 'H008', name: 'Ravi', amount: 280, dueDate: '2025-10-05', status: 'Pending', paymentMode: '' }
  ])

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

    animateCount(58000, (val) => setCounts(prev => ({ ...prev, totalRevenue: val })), 1500)
    animateCount(132, (val) => setCounts(prev => ({ ...prev, totalBills: val })), 1200)
    animateCount(18, (val) => setCounts(prev => ({ ...prev, overdueBills: val })), 1000)
  }, [])

  const paidBills = bills.filter(b => b.status === 'Paid').length
  const pendingBills = bills.filter(b => b.status === 'Pending').length
  const paidPercentage = (paidBills / bills.length) * 100

  const monthlyData = [
    { month: 'Apr', revenue: 52000 },
    { month: 'May', revenue: 54000 },
    { month: 'Jun', revenue: 53000 },
    { month: 'Jul', revenue: 55000 },
    { month: 'Aug', revenue: 56000 },
    { month: 'Sep', revenue: 57000 },
    { month: 'Oct', revenue: 58000 }
  ]

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

  return (
    <div className="billing-page">
      <div className="overview-cards">
        <div className="stat-card revenue fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="card-icon">
            <DollarSign size={28} />
          </div>
          <div className="card-content">
            <h3>Total Monthly Revenue</h3>
            <p className="amount">₹{counts.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card bills fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="card-icon">
            <FileText size={28} />
          </div>
          <div className="card-content">
            <h3>Total Bills Generated</h3>
            <p className="amount">{counts.totalBills}</p>
          </div>
        </div>

        <div className="stat-card overdue fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="card-icon">
            <AlertCircle size={28} />
          </div>
          <div className="card-content">
            <h3>Overdue Bills</h3>
            <p className="amount">{counts.overdueBills}</p>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card pie-chart-card fade-in" style={{ animationDelay: '0.4s' }}>
          <h3>Payment Status</h3>
          <div className="pie-chart-container">
            <svg viewBox="0 0 100 100" className="pie-chart">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#c6f6d5"
                strokeWidth="20"
                strokeDasharray={`${paidPercentage * 2.51} ${(100 - paidPercentage) * 2.51}`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
                className="pie-slice paid"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#fed7d7"
                strokeWidth="20"
                strokeDasharray={`${(100 - paidPercentage) * 2.51} ${paidPercentage * 2.51}`}
                strokeDashoffset={`-${paidPercentage * 2.51}`}
                transform="rotate(-90 50 50)"
                className="pie-slice pending"
              />
              <text x="50" y="50" textAnchor="middle" dy="0.3em" className="pie-text">
                {paidPercentage.toFixed(0)}%
              </text>
            </svg>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color paid"></span>
                <span>Paid ({paidBills})</span>
              </div>
              <div className="legend-item">
                <span className="legend-color pending"></span>
                <span>Pending ({pendingBills})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-card line-chart-card fade-in" style={{ animationDelay: '0.5s' }}>
          <h3>
            <TrendingUp size={20} />
            Monthly Revenue Growth
          </h3>
          <div className="line-chart">
            <svg viewBox="0 0 400 200" className="line-svg">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#764ba2" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {monthlyData.map((item, index) => {
                const x = 50 + (index * 50)
                const y = 180 - ((item.revenue / maxRevenue) * 140)
                return (
                  <g key={item.month}>
                    <circle cx={x} cy={y} r="5" fill="url(#lineGradient)" className="line-point" />
                    <text x={x} y="195" textAnchor="middle" className="line-label">{item.month}</text>
                  </g>
                )
              })}
              <polyline
                points={monthlyData.map((item, index) => {
                  const x = 50 + (index * 50)
                  const y = 180 - ((item.revenue / maxRevenue) * 140)
                  return `${x},${y}`
                }).join(' ')}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                className="line-path"
              />
              <polygon
                points={`50,180 ${monthlyData.map((item, index) => {
                  const x = 50 + (index * 50)
                  const y = 180 - ((item.revenue / maxRevenue) * 140)
                  return `${x},${y}`
                }).join(' ')} 350,180`}
                fill="url(#areaGradient)"
                className="area-fill"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="billing-table-section fade-in" style={{ animationDelay: '0.6s' }}>
        <h3>Detailed Billing Records</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>House No</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Payment Mode</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, index) => (
                <tr key={bill.houseNo} className="slide-up" style={{ animationDelay: `${0.65 + index * 0.03}s` }}>
                  <td>{bill.houseNo}</td>
                  <td>{bill.name}</td>
                  <td className="amount-cell">₹{bill.amount}</td>
                  <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${bill.status.toLowerCase()}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td>{bill.paymentMode || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BillingPage
