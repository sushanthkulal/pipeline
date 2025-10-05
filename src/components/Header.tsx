import { useNavigate } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  brand: {
    title: string
    subtitle: string
  }
  navButtons: Array<{
    id: string
    label: string
  }>
  show_emblem?: boolean
}

const Header = ({ brand, navButtons, show_emblem }: HeaderProps) => {
  const navigate = useNavigate()

  const handleNavClick = (buttonId: string) => {
    if (buttonId === 'btn_user_login') {
      navigate('/user_login')
    } else if (buttonId === 'btn_panchayat_login') {
      navigate('/panchayat_login')
    } else if (buttonId === 'btn_about') {
      navigate('/about_us')
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          {show_emblem && (
            <div className="emblem">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" fill="#FF9933" />
                <circle cx="24" cy="24" r="13" fill="#FFFFFF" />
                <circle cx="24" cy="24" r="6" fill="#138808" />
                <path d="M24 4 L24 44 M4 24 L44 24" stroke="#000080" strokeWidth="1" />
              </svg>
            </div>
          )}
          <div className="brand-text">
            <h1 className="brand-title">{brand.title}</h1>
            <p className="brand-subtitle">{brand.subtitle}</p>
          </div>
        </div>
        <nav className="header-nav">
          {navButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleNavClick(btn.id)}
              className="nav-button"
            >
              {btn.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
