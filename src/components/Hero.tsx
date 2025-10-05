import { useNavigate } from 'react-router-dom'
import './Hero.css'

interface HeroProps {
  background_image: string
  title: string
  subtitle: string
  cta: {
    id: string
    label: string
    navigate: string
  }
  small_links?: Array<{
    label: string
    href: string
    target?: string
  }>
}

const Hero = ({ title, subtitle, cta, small_links }: HeroProps) => {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <button
          className="hero-cta"
          onClick={() => navigate(`/${cta.navigate}`)}
        >
          {cta.label}
        </button>
        {small_links && small_links.length > 0 && (
          <div className="hero-links">
            {small_links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target={link.target || '_self'}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="hero-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
