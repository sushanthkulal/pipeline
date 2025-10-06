import { useNavigate } from 'react-router-dom'
import './AboutPreview.css'

interface AboutPreviewProps {
  title: string
  source: string
  cta: {
    label: string
    navigate: string
  }
}

const AboutPreview = ({ title, cta }: AboutPreviewProps) => {
  const navigate = useNavigate()

  return (
    <section className="about-preview">
      <div className="about-preview-container">
        <h2 className="about-preview-title">{title}</h2>
        <div className="about-preview-content">
          <p className="about-preview-text">
            SmartGram is an initiative by the Department of Rural Water Supply & Sanitation,
            empowering Gram Panchayats through Digital Water Management. Every village and
            household should have access to safe, adequate, and affordable drinking water
            through a digitally managed water distribution system.
          </p>
          <p className="about-preview-text">
            Our platform provides digital tools for implementing smart water monitoring,
            real-time data access, predictive maintenance, and transparent complaint and
            billing systems for citizens.
          </p>
        </div>
        <button
          className="about-preview-cta"
          onClick={() => navigate(`/${cta.navigate}`)}
        >
          {cta.label}
        </button>
      </div>
    </section>
  )
}

export default AboutPreview
