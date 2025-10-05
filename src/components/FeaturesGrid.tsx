import { Droplet, Search, Clock, FileText, RefreshCw } from 'lucide-react'
import './FeaturesGrid.css'

interface FeatureItem {
  icon: string
  title: string
  desc: string
}

interface FeaturesGridProps {
  title: string
  items: FeatureItem[]
}

const iconMap = {
  droplet: Droplet,
  search: Search,
  clock: Clock,
  'file-text': FileText,
  sync: RefreshCw,
}

const FeaturesGrid = ({ title, items }: FeaturesGridProps) => {
  return (
    <section className="features-grid">
      <div className="features-container">
        <h2 className="features-title">{title}</h2>
        <div className="features-items">
          {items.map((item, idx) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Droplet
            return (
              <div key={idx} className="feature-item">
                <div className="feature-icon">
                  <IconComponent size={32} strokeWidth={2} />
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid
