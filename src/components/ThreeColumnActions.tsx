import { useNavigate } from 'react-router-dom'
import { User, Users, Info } from 'lucide-react'
import './ThreeColumnActions.css'

interface ActionItem {
  id: string
  icon: string
  title: string
  desc: string
  action: {
    type: string
    to: string
  }
}

interface ThreeColumnActionsProps {
  items: ActionItem[]
}

const iconMap = {
  user: User,
  users: Users,
  info: Info,
}

const ThreeColumnActions = ({ items }: ThreeColumnActionsProps) => {
  const navigate = useNavigate()

  const handleAction = (action: ActionItem['action']) => {
    if (action.type === 'navigate') {
      navigate(`/${action.to}`)
    }
  }

  return (
    <section className="three-column-actions">
      <div className="actions-container">
        {items.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Info
          return (
            <div
              key={item.id}
              className="action-card"
              onClick={() => handleAction(item.action)}
            >
              <div className="action-icon">
                <IconComponent size={40} strokeWidth={1.5} />
              </div>
              <h3 className="action-title">{item.title}</h3>
              <p className="action-desc">{item.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ThreeColumnActions
