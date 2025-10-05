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
            The Jal Jeevan Mission (JJM) is a flagship programme of the Government of India,
            launched to ensure safe and adequate drinking water through individual household
            tap connections by 2024 to all households in rural India. The programme aims to
            create local water supply infrastructure and provide functional household tap
            connections to every rural household.
          </p>
          <p className="about-preview-text">
            Our platform supports this mission by providing digital tools for Gram Panchayats
            to monitor, maintain, and report on water quality and infrastructure in real-time.
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
