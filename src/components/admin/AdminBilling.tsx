import { useEffect, useState } from 'react'
import { DollarSign, FileText, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import './AdminBilling.css'

interface AdminBillingProps {
  lgdNumber: string
}

interface Bill {
  id: string
  house_no: string
  month: string
  usage_litre: number
  amount: number
  due_date: string
  status: string
  payment_mode: string | null
  paid_at: string | null
}

const AdminBilling = ({ lgdNumber }: AdminBillingProps) => {
  const [bills, setBills] = useState<Bill[]>([])
  const [stats, setStats] = useState({ total: 0, revenue: 0, overdue: 0 })

  useEffect(() => {
    fetchBills()
  }, [lgdNumber])

  const fetchBills = async () => {
    const { data } = await supabase
      .from('admin_bills')
      .select('*')
      .eq('panchayat_lgd', lgdNumber)
      .order('created_at', { ascending: false })

    if (data) {
      setBills(data)

      const totalRevenue = data
        .filter(b => b.status === 'Paid')
        .reduce((sum, b) => sum + Number(b.amount), 0)

      const overdueCount = data.filter(b => b.status === 'Overdue').length

      setStats({
        total: data.length,
        revenue: totalRevenue,
        overdue: overdueCount
      })
    }
  }

  return (
    <div className="admin-billing">
      <div className="billing-header">
        <h2>Billing Management</h2>
      </div>

      <div className="overview-cards">
        <div className="overview-card fade-in">
          <div className="card-icon revenue">
            <DollarSign size={32} />
          </div>
          <div className="card-content">
            <h3>Total Revenue</h3>
            <p className="amount">₹{stats.revenue.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="overview-card fade-in delay-1">
          <div className="card-icon bills">
            <FileText size={32} />
          </div>
          <div className="card-content">
            <h3>Total Bills</h3>
            <p className="amount">{stats.total}</p>
          </div>
        </div>

        <div className="overview-card fade-in delay-2">
          <div className="card-icon overdue">
            <AlertCircle size={32} />
          </div>
          <div className="card-content">
            <h3>Overdue Bills</h3>
            <p className="amount">{stats.overdue}</p>
          </div>
        </div>
      </div>

      <div className="billing-content">
        <div className="billing-table slide-up">
          <h3>Bills Overview</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>House No</th>
                  <th>Month</th>
                  <th>Usage (L)</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Payment Mode</th>
                  <th>Paid Date</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={bill.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <td className="id-cell">{bill.id}</td>
                    <td>{bill.house_no}</td>
                    <td>{bill.month}</td>
                    <td>{bill.usage_litre.toLocaleString('en-IN')}</td>
                    <td className="amount-cell">₹{bill.amount.toLocaleString('en-IN')}</td>
                    <td>{new Date(bill.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td>
                      <span className={`status-badge ${bill.status.toLowerCase()}`}>
                        {bill.status}
                      </span>
                    </td>
                    <td>{bill.payment_mode || '—'}</td>
                    <td>
                      {bill.paid_at
                        ? new Date(bill.paid_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
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

export default AdminBilling
