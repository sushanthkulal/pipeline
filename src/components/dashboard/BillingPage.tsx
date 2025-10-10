import { useEffect, useState } from 'react'
import { DollarSign, Droplets, AlertCircle, Calendar, CreditCard } from 'lucide-react'
import { supabase, UsageWithPayment } from '../../lib/supabase'
import './BillingPage.css'

const BillingPage = () => {
  const [usageData, setUsageData] = useState<UsageWithPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId] = useState('demo-user-id')

  useEffect(() => {
    fetchUsageAndPayments()
  }, [])

  const fetchUsageAndPayments = async () => {
    try {
      const { data: usageRecords, error: usageError } = await supabase
        .from('water_usage')
        .select('*')
        .eq('user_id', currentUserId)
        .order('year', { ascending: false })
        .order('month_number', { ascending: false })

      if (usageError) {
        console.error('Error fetching usage:', usageError)
        setUsageData(getMockData())
        setLoading(false)
        return
      }

      if (!usageRecords || usageRecords.length === 0) {
        setUsageData(getMockData())
        setLoading(false)
        return
      }

      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', currentUserId)

      if (paymentsError) {
        console.error('Error fetching payments:', paymentsError)
      }

      const enrichedData: UsageWithPayment[] = usageRecords.map((usage) => {
        const payment = payments?.find((p) => p.usage_id === usage.id)
        const dueDate = new Date(usage.due_date)
        const today = new Date()
        const isOverdue = !payment && dueDate < today

        return {
          ...usage,
          payment,
          isOverdue
        }
      })

      setUsageData(enrichedData)
    } catch (error) {
      console.error('Error:', error)
      setUsageData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = (): UsageWithPayment[] => {
    const months = ['October', 'September', 'August', 'July', 'June', 'May', 'April']
    const mockData: UsageWithPayment[] = months.map((month, index) => {
      const isPaid = index > 1
      const isOverdue = index === 1

      return {
        id: `mock-${index}`,
        user_id: currentUserId,
        month: `${month} 2025`,
        year: 2025,
        month_number: 10 - index,
        usage_liters: 12000 + Math.random() * 4000,
        amount: 250 + Math.random() * 100,
        due_date: new Date(2025, 9 - index, 15).toISOString(),
        created_at: new Date().toISOString(),
        isOverdue,
        payment: isPaid ? {
          id: `payment-${index}`,
          user_id: currentUserId,
          usage_id: `mock-${index}`,
          amount: 250 + Math.random() * 100,
          payment_date: new Date(2025, 9 - index, 10 + index).toISOString(),
          payment_method: ['UPI', 'Cash', 'Bank Transfer'][index % 3],
          status: 'Completed' as const,
          created_at: new Date().toISOString()
        } : undefined
      }
    })

    return mockData
  }

  const handlePayment = async (usageId: string) => {
    alert('Payment processing would be implemented here')
  }

  const paidCount = usageData.filter(d => d.payment?.status === 'Completed').length
  const pendingCount = usageData.filter(d => !d.payment).length
  const overdueCount = usageData.filter(d => d.isOverdue).length
  const totalAmount = usageData.reduce((sum, d) => sum + (d.payment?.amount || 0), 0)

  const paidPercentage = usageData.length > 0 ? Math.round((paidCount / usageData.length) * 100) : 0
  const pendingPercentage = 100 - paidPercentage

  const maxUsage = Math.max(...usageData.map(d => d.usage_liters), 1)

  return (
    <div className="billing-page">
      <div className="overview-cards">
        <div className="overview-card revenue fade-in">
          <div className="card-icon">
            <DollarSign size={32} />
          </div>
          <div className="card-content">
            <h3>Total Payments Made</h3>
            <p className="amount">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </div>
        </div>

        <div className="overview-card bills fade-in delay-1">
          <div className="card-icon">
            <Droplets size={32} />
          </div>
          <div className="card-content">
            <h3>Pending Payments</h3>
            <p className="amount">{pendingCount}</p>
          </div>
        </div>

        <div className="overview-card overdue fade-in delay-2">
          <div className="card-icon">
            <AlertCircle size={32} />
          </div>
          <div className="card-content">
            <h3>Overdue Bills</h3>
            <p className="amount">{overdueCount}</p>
          </div>
        </div>
      </div>

      {overdueCount > 0 && (
        <div className="overdue-alert slide-up">
          <AlertCircle size={24} />
          <div className="alert-content">
            <h4>Overdue Payment Alert</h4>
            <p>You have {overdueCount} overdue payment{overdueCount !== 1 ? 's' : ''} from previous months. Please pay immediately to avoid service disruption.</p>
          </div>
        </div>
      )}

      <div className="billing-content">
        <div className="billing-table slide-up">
          <h3>Monthly Water Usage & Billing</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Water Used (L)</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Payment Date</th>
                  <th>Payment Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                      Loading...
                    </td>
                  </tr>
                ) : usageData.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                      No billing records found
                    </td>
                  </tr>
                ) : (
                  usageData.map((record, index) => (
                    <tr
                      key={record.id}
                      className={record.isOverdue ? 'overdue-row' : ''}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="month-cell">
                        {record.month}
                        {record.isOverdue && <span className="overdue-badge">Overdue</span>}
                      </td>
                      <td className="usage-cell">
                        {record.usage_liters.toLocaleString('en-IN')} L
                      </td>
                      <td className="amount-cell">₹{record.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                      <td>
                        <div className="date-cell">
                          <Calendar size={14} />
                          {new Date(record.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${record.payment ? 'paid' : 'pending'}`}>
                          {record.payment ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        {record.payment ? (
                          <div className="date-cell">
                            <Calendar size={14} />
                            {new Date(record.payment.payment_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        ) : (
                          <span className="no-payment">—</span>
                        )}
                      </td>
                      <td>
                        {record.payment ? (
                          <span className="payment-mode">{record.payment.payment_method}</span>
                        ) : (
                          <span className="no-payment">—</span>
                        )}
                      </td>
                      <td>
                        {!record.payment && (
                          <button
                            className="pay-button"
                            onClick={() => handlePayment(record.id)}
                          >
                            <CreditCard size={16} />
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
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
                  <span className="legend-label">Paid ({paidCount})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color pending"></span>
                  <span className="legend-label">Pending ({pendingCount})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card line-chart-card slide-up delay-2">
            <div className="chart-header">
              <Droplets size={24} />
              <h3>Monthly Water Usage</h3>
            </div>
            <div className="line-chart">
              <div className="chart-grid">
                {usageData.slice().reverse().map((data, index) => (
                  <div key={index} className="line-bar">
                    <div className="bar-wrapper">
                      <div
                        className="bar usage-bar"
                        style={{ height: `${(data.usage_liters / maxUsage) * 100}%` }}
                      />
                    </div>
                    <span className="month-label">{data.month.split(' ')[0].substring(0, 3)}</span>
                    <span className="usage-value">{(data.usage_liters / 1000).toFixed(1)}k L</span>
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
