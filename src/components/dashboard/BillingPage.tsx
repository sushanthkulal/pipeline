import { DollarSign, FileText, AlertCircle, TrendingUp } from 'lucide-react'
import './BillingPage.css'

const BillingPage = () => {
  const overview = {
    totalRevenue: 58000,
    totalBills: 132,
    overdueBills: 18
  }

  const bills = [
    { houseNo: 'H001', amount: 250, dueDate: 'Oct 3', status: 'Paid', paymentMode: 'UPI' },
    { houseNo: 'H002', amount: 275, dueDate: 'Oct 5', status: 'Pending', paymentMode: '—' },
    { houseNo: 'H003', amount: 240, dueDate: 'Oct 4', status: 'Paid', paymentMode: 'Cash' },
    { houseNo: 'H004', amount: 320, dueDate: 'Oct 2', status: 'Pending', paymentMode: '—' },
    { houseNo: 'H005', amount: 285, dueDate: 'Oct 6', status: 'Paid', paymentMode: 'Bank Transfer' },
    { houseNo: 'H006', amount: 265, dueDate: 'Oct 3', status: 'Paid', paymentMode: 'UPI' },
    { houseNo: 'H007', amount: 295, dueDate: 'Oct 7', status: 'Pending', paymentMode: '—' },
    { houseNo: 'H008', amount: 310, dueDate: 'Oct 5', status: 'Paid', paymentMode: 'Cash' }
  ]

  const monthlyRevenue = [
    { month: 'Apr', revenue: 45000 },
    { month: 'May', revenue: 48000 },
    { month: 'Jun', revenue: 52000 },
    { month: 'Jul', revenue: 50000 },
    { month: 'Aug', revenue: 54000 },
    { month: 'Sep', revenue: 56000 },
    { month: 'Oct', revenue: 58000 }
  ]

  const paidBills = bills.filter(b => b.status === 'Paid').length
  const pendingBills = bills.filter(b => b.status === 'Pending').length
  const paidPercentage = Math.round((paidBills / bills.length) * 100)
  const pendingPercentage = 100 - paidPercentage
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))

  return (
    <div className="billing-page">
      <div className="overview-cards">
        <div className="overview-card revenue fade-in">
          <div className="card-icon">
            <DollarSign size={32} />
          </div>
          <div className="card-content">
            <h3>Total Monthly Revenue</h3>
            <p className="amount">₹{overview.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="overview-card bills fade-in delay-1">
          <div className="card-icon">
            <FileText size={32} />
          </div>
          <div className="card-content">
            <h3>Total Bills Generated</h3>
            <p className="amount">{overview.totalBills}</p>
          </div>
        </div>

        <div className="overview-card overdue fade-in delay-2">
          <div className="card-icon">
            <AlertCircle size={32} />
          </div>
          <div className="card-content">
            <h3>Overdue Bills</h3>
            <p className="amount">{overview.overdueBills}</p>
          </div>
        </div>
      </div>

      <div className="billing-content">
        <div className="billing-table slide-up">
          <h3>Billing Details</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>House No</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Payment Mode</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={bill.houseNo} style={{ animationDelay: `${index * 0.05}s` }}>
                    <td>{bill.houseNo}</td>
                    <td className="amount-cell">₹{bill.amount}</td>
                    <td>{bill.dueDate}</td>
                    <td>
                      <span className={`status-badge ${bill.status.toLowerCase()}`}>
                        {bill.status}
                      </span>
                    </td>
                    <td>
                      {bill.paymentMode !== '—' && (
                        <span className="payment-mode">{bill.paymentMode}</span>
                      )}
                      {bill.paymentMode === '—' && (
                        <span className="no-payment">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-card pie-chart-card slide-up delay-1">
            <h3>Payment Status Distribution</h3>
            <div className="pie-chart-container">
              <svg viewBox="0 0 200 200" className="pie-chart">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="40"
                  strokeDasharray={`${paidPercentage * 5.03} ${500 - paidPercentage * 5.03}`}
                  transform="rotate(-90 100 100)"
                  className="pie-segment paid"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="40"
                  strokeDasharray={`${pendingPercentage * 5.03} ${500 - pendingPercentage * 5.03}`}
                  strokeDashoffset={`-${paidPercentage * 5.03}`}
                  transform="rotate(-90 100 100)"
                  className="pie-segment pending"
                />
              </svg>
              <div className="pie-legend">
                <div className="legend-item">
                  <span className="legend-color paid"></span>
                  <span className="legend-label">Paid ({paidBills})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color pending"></span>
                  <span className="legend-label">Pending ({pendingBills})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card line-chart-card slide-up delay-2">
            <div className="chart-header">
              <TrendingUp size={24} />
              <h3>Monthly Revenue Growth</h3>
            </div>
            <div className="line-chart">
              <div className="chart-grid">
                {monthlyRevenue.map((data, index) => (
                  <div key={index} className="line-bar">
                    <div className="bar-wrapper">
                      <div
                        className="bar"
                        style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                      />
                    </div>
                    <span className="month-label">{data.month}</span>
                    <span className="revenue-value">₹{(data.revenue / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingPage
