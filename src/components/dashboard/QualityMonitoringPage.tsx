import { CheckCircle, AlertTriangle } from 'lucide-react'
import './QualityMonitoringPage.css'

const QualityMonitoringPage = () => {
  const parameters = [
    {
      name: 'pH',
      value: 7.2,
      unit: '',
      safeRange: '6.5-8.5',
      status: 'good',
      percentage: 96
    },
    {
      name: 'TDS',
      value: 250,
      unit: 'ppm',
      safeRange: '<500 ppm',
      status: 'good',
      percentage: 50
    },
    {
      name: 'Turbidity',
      value: 4,
      unit: 'NTU',
      safeRange: '<5 NTU',
      status: 'slight',
      percentage: 80
    },
    {
      name: 'Chlorine',
      value: 0.6,
      unit: 'mg/L',
      safeRange: '<1 mg/L',
      status: 'safe',
      percentage: 60
    }
  ]

  const calculatePurity = () => {
    const tdsComponent = 250 / 500
    const turbidityComponent = 4 / 5
    const phComponent = Math.abs(7.2 - 7) / 1.5
    const chlorineComponent = 0.6 / 1

    const total = (tdsComponent + turbidityComponent + phComponent + chlorineComponent) * 25
    return Math.round(100 - total / 4)
  }

  const purity = calculatePurity()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'safe':
        return 'green'
      case 'slight':
        return 'yellow'
      default:
        return 'red'
    }
  }

  return (
    <div className="quality-monitoring-page">
      <div className="page-header">
        <h2>Water Quality Monitoring</h2>
        <p>Real-time water quality parameters and safety status</p>
      </div>

      <div className="purity-summary fade-in">
        <div className="purity-card">
          <h3>Average Water Purity</h3>
          <div className="purity-circle">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="85" className="purity-bg" />
              <circle
                cx="100"
                cy="100"
                r="85"
                className="purity-progress"
                style={{
                  strokeDasharray: `${purity * 5.34} 534`,
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'center'
                }}
              />
            </svg>
            <div className="purity-value">
              <span className="value">{purity}%</span>
              <span className="label">Purity</span>
            </div>
          </div>
          <p className="purity-note">Based on pH, TDS, Turbidity, and Chlorine levels</p>
        </div>
      </div>

      <div className="parameters-table fade-in delay-1">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
              <th>Safe Range</th>
              <th>Status</th>
              <th>Indicator</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param, index) => (
              <tr key={index} className="fade-in-row" style={{ animationDelay: `${0.1 * index}s` }}>
                <td className="param-name">{param.name}</td>
                <td className="param-value">
                  {param.value} {param.unit}
                </td>
                <td className="param-range">{param.safeRange}</td>
                <td className="param-status">
                  <span className={`status-badge ${getStatusColor(param.status)}`}>
                    {param.status === 'good' || param.status === 'safe' ? (
                      <CheckCircle size={16} />
                    ) : (
                      <AlertTriangle size={16} />
                    )}
                    {param.status === 'good' ? 'Good' : param.status === 'safe' ? 'Safe' : 'Slight'}
                  </span>
                </td>
                <td className="param-indicator">
                  <div className="indicator-bar">
                    <div
                      className={`indicator-fill ${getStatusColor(param.status)}`}
                      style={{ width: `${param.percentage}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="quality-info fade-in delay-2">
        <div className="info-card green">
          <div className="info-icon green">
            <CheckCircle size={24} />
          </div>
          <div className="info-content">
            <h4>Safe</h4>
            <p>Water quality is within safe limits for consumption</p>
          </div>
        </div>
        <div className="info-card yellow">
          <div className="info-icon yellow">
            <AlertTriangle size={24} />
          </div>
          <div className="info-content">
            <h4>Moderate</h4>
            <p>Water quality is acceptable but approaching limits</p>
          </div>
        </div>
        <div className="info-card red">
          <div className="info-icon red">
            <AlertTriangle size={24} />
          </div>
          <div className="info-content">
            <h4>Poor</h4>
            <p>Water quality needs immediate attention</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QualityMonitoringPage
